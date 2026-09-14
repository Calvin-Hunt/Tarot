# Tarot Celestial Studio — 技术概览

> 一个塔罗 + 星座的沉浸式 Web 应用：数据驱动的牌阵系统、可追溯的抽牌逻辑、中英双语内容层、
> 带账号同步的前后端一体化架构，前后端共享同一套类型与校验边界。

本文档面向工程师与招聘方，描述**实际代码如何实现**（文件路径与函数名均可对应到仓库源码），
而非产品宣传文案。文末附简历可直接使用的描述段落与已知限制。

---

## 1. 项目概览

| 维度 | 说明 |
| --- | --- |
| 定位 | 塔罗牌抽牌 / 解读 / 归档 / 分享一体化 Web 应用 |
| 前端 | React 18 + TypeScript 5 + Vite 5 + Tailwind CSS 3 + Framer Motion 11 |
| 后端 | Node.js（Express 本地运行时）+ Vercel Functions（生产运行时），共享同一数据访问层 |
| 数据 | PostgreSQL（生产）/ JSON 文件（本地零依赖兜底），启动时自动切换 |
| 内容规模 | 78 张牌（22 大阿尔卡纳 + 56 小阿尔卡纳）× 中英双语；12 星座；6 类问题；6 种牌阵；3 套主题 |
| 代码规模 | 前端 TS/TSX 约 2.9k 行（43 个文件）；后端 JS/MJS 约 0.8k 行（11 个文件）；脚本生成的 SVG 约 3.0k 行（统计口径：非空行） |
| 特色 | 零音频素材的音效合成、Canvas 星空渲染、结果卡 PNG 导出、登录后云端同步与收藏 |

### 技术亮点速览

- **分层单体 + 双运行时后端**：`src/`（前端）与 `api/`+`server/`（后端入口）分离，但共用 `backend/db.mjs` 与 `api/_lib/validators.js`，本地与生产行为一致。
- **抽牌可追溯**：Fisher-Yates 洗牌 → 取前 N 张，结构上保证单次牌阵不重复，正逆位独立随机。
- **解读分层叠加**：基础牌义（正/逆位）× 位置语义 × 星座偏置，星座只增强不替代塔罗含义。
- **双语是第一等公民**：内容字段以 `LocalizedTextValue` 联合类型存储，UI 文案键为编译期联合类型。
- **零素材音效**：Web Audio 振荡器 + 增益包络实时合成，无需任何音频文件。

---

## 2. 架构总览

```
TarotCards/
├─ src/                       前端（React + TS）
│  ├─ types/                  纯类型定义，全链路唯一事实来源
│  │  ├─ tarot.ts             TarotCard / 正逆位 / 元素 / 花色
│  │  ├─ reading.ts           SpreadDefinition / DrawnCard / InterpretedCard / ReadingSession
│  │  ├─ zodiac.ts            星座档案与 reading_bias（解读偏置）
│  │  ├─ i18n.ts              LocalizedTextValue / LocalizedListValue
│  │  └─ user.ts              AppUser / UserFavorite
│  ├─ data/                   纯数据层（不含任何 JSX）
│  │  ├─ tarot.ts             78 张牌种子与牌组构建
│  │  ├─ zodiac.ts            12 星座档案
│  │  ├─ questionGuides.ts    6 类问题引导
│  │  └─ themes.ts            3 套视觉主题
│  ├─ lib/                    纯函数与基础设施（无 React 依赖）
│  │  ├─ shuffle.ts           洗牌与抽牌算法
│  │  ├─ spreads.ts           6 种牌阵定义（数据驱动，无分支）
│  │  ├─ interpretation.ts    解读管线
│  │  ├─ content.ts           内容访问器（双语取值、枚举标签）
│  │  ├─ i18n.ts              UI 文案表与翻译函数
│  │  ├─ api.ts               带超时与错误分类的 HTTP 客户端
│  │  ├─ storage.ts           localStorage 读写（含 SSR 守卫与容错）
│  │  └─ audio.ts             Web Audio 音效合成
│  ├─ context/                状态层（拆分为偏好 / 业务两个 Provider）
│  ├─ components/             展示层组件（19 个，含动画与交互）
│  └─ pages/                  HomePage（英雄区）/ ReadingStudioPage（工作台）
│
├─ api/                       Vercel Functions 入口（每个文件一个 handler）
│  ├─ _lib/                   json 响应封装、请求校验器（前后端共享）
│  ├─ auth/{register,login,me}.js
│  ├─ readings.js  favorites.js  health.js
├─ server/index.mjs           Express 本地运行时（端口 8787）
├─ backend/db.mjs             唯一数据访问层（Postgres / JSON 文件双模式）
├─ scripts/                   SVG 牌面资产生成脚本
└─ public/cards/              78 个 720×1200 本地 SVG 牌面（兜底资源）
```

**依赖方向单向向下**：`types ← data ← lib ← context ← components ← pages`。
`lib/` 与 `data/` 不导入 React，因此抽牌、解读、文案逻辑可脱离 UI 单独测试或复用。

---

## 3. 核心实现

### 3.1 抽牌逻辑：结构性去重（`src/lib/shuffle.ts`）

```ts
export function drawCards(deck: TarotCard[], spreadId: SpreadId): DrawnCard[] {
  const spread = getSpreadById(spreadId);
  const shuffled = fisherYatesShuffle(deck);          // 无偏洗牌
  return spread.positions.map((position, index) => ({
    card: shuffled[index],                            // 按下标顺序取牌 → 天然不重复
    orientation: randomOrientation(),                 // 每张独立正/逆位
    position,
  }));
}
```

- **Fisher-Yates 原地交换**，时间复杂度 O(n)，对任意 n 无偏。
- **去重由算法保证而非事后检查**：从已洗好的牌堆按位置下标取前 N 张，同一牌阵内不可能出现同两张牌。
- **正逆位独立采样**，与牌面无关，避免「抽到某张牌必定逆位」的伪相关。
- 牌阵切换只影响 `positions` 数量与语义，抽牌算法本身不做特例分支。

### 3.2 牌阵系统：数据驱动，不写死分支（`src/lib/spreads.ts`）

牌阵是纯数据声明，包含 `id / name / description / cardCount / ritualPrompt / positions[]`，
每个位置定义 `key / label / intention`：

| 牌阵 | 张数 | 位置语义 |
| --- | --- | --- |
| Single Card | 1 | Guidance |
| Past / Present / Future | 3 | Past · Present · Future |
| Celtic Cross Lite | 6 | Core · Challenge · Foundation · Crown · Near Future · Guidance |
| Relationship Mirror | 5 | You · Other · Bridge · Friction · Potential |
| Decision Path | 4 | Current Path · Option A · Option B · Wisdom |
| Lunar Cycle | 4 | New Moon · Waxing · Full Moon · Waning |

新增牌阵只需追加一条数据：组件、翻译、抽牌、解读、后端校验全部按 `positions` 自动适配。
`getSpreadById()` 对未知 id 回落到默认牌阵（三牌阵），因此无参数解析、无异常路径。

### 3.3 解读管线：三层叠加（`src/lib/interpretation.ts`）

```
DrawnCard(card + orientation + position)
        │
        ├─ baseMeaning   ← 按正/逆位选取 meaning_upright / meaning_reversed
        ├─ baseKeywords  ← 对应关键词列表
        ├─ positionMeaning ← 位置意图 × 该牌短描述（模板合成，非硬编码句子）
        └─ zodiacOverlay   ← 星座 reading_bias：语气 + 关注点 + 建议
        ▼
InterpretedCard  →  ReadingSession（含 id / createdAt / spreadId / zodiacId / questionCategoryId）
```

- 解读结果仍是**纯数据**，不依赖渲染时机，因此历史记录、导出、云端同步可以复用同一份对象。
- 星座的作用被限定为 `zodiacOverlay` 字段，**只叠加语气与关注重点，不覆写牌义**——与项目规则「星座只增强解读」在数据结构层面保持一致，而不是靠约定。

### 3.4 双语内容层（`src/types/i18n.ts` + `src/lib/content.ts`）

```ts
type LocalizedTextValue = string | { en: string; zh: string };
type LocalizedListValue = string[] | { en: string[]; zh: string[] };
```

- 内容字段一律使用该联合类型，取值统一走 `getLocalizedText(language, value)` / `getLocalizedList(...)`，
  **缺失语言自动回落英文**，杜绝 `undefined` 渲染。
- UI 文案集中在 `src/lib/i18n.ts`（453 行），`TranslationKey` 是字符串字面量联合类型：
  文案键写错会在 `tsc -b` 阶段编译失败，而不是运行时显示 `undefined`。
- 牌名、花色、元素、宫位、牌阵名、位置名、星座名各自有独立翻译函数，切换语言时无需重载数据。

### 3.5 状态管理：按变更频率拆分（`src/context/`）

| Provider | 职责 | 持久化 |
| --- | --- | --- |
| `PreferencesContext` | 主题模式、主题 id、语言、音效开关 | localStorage（4 个键） |
| `ReadingContext` | 牌阵、星座、问题类别、洗牌状态、当前解读、历史、账号、收藏 | localStorage + 远端 API |

- **拆分动机**：把「UI 外观偏好」与「业务会话」解耦，避免任意一次主题切换引起业务子树重渲。
- Provider 内部统一 `useCallback` 包装操作、`useMemo` 稳定 value，消费端通过 `usePreferences()` / `useReading()` 获取，未包裹 Provider 时抛出明确错误。
- **登录态收敛**：`authToken` 变化触发一次 `Promise.all([fetchProfile, fetchRemoteReadings, fetchFavorites])` 并发拉取；任一失败即清除 token 并回到访客态，避免半登录状态。
- **乐观更新**：收藏切换先发请求，再按响应 `removed` / `favorite` 局部改写列表，不做全量重拉。
- 历史记录本地最多保留 12 条（`slice(0, 12)`），远端按用户维度倒序取最近 20 条。
- 洗牌流程通过 `isShuffling` 互斥锁防止重复触发，远端同步失败不影响本地阅读体验（try/catch 让本地状态优先）。

### 3.6 视觉与动画

**Canvas 星空（`src/components/StarfieldCanvas.tsx`）**

- 单画布 + `requestAnimationFrame` 渲染循环；星数按视口宽度自适应 `min(180, floor(width / 10))`。
- 每帧重绘径向渐变光晕、连接线（每 12 颗星抽样连线）与脉冲星点；星星以各自 `speed` 下落，越界后回收复用，**星体对象复用、无逐帧分配**。
- 主题色变化时重建循环；卸载时 `cancelAnimationFrame` + `removeEventListener`，无泄漏。

**牌面揭示调度（`src/components/ReadingPanel.tsx`）**

- 揭示节奏由定时器阶梯控制：`520 + index * 620` ms，逐张递增 `revealedCount`。
- 依赖数组为 `currentReading`，解读变化或卸载时**批量清理全部定时器**，避免旧牌局回调污染新状态。
- 解读区在全部揭示完成前保持 `opacity: 0.45`，用视觉权重引导阅读顺序。

**洗牌动效（`src/components/ShuffleDeck.tsx`）**

- 三层牌背叠加，使用 Framer Motion 关键帧数组描述位移/旋转路径，`repeat: Infinity` 循环；
- `isShuffling` 结束时动画自然收敛到静态堆叠姿态，并向抽牌逻辑的 1450ms 节奏对齐。

### 3.7 音效合成（`src/lib/audio.ts`）

```ts
oscillator.type = 'triangle';
oscillator.frequency.setValueAtTime(392, ctx.currentTime);          // G4
oscillator.frequency.exponentialRampToValueAtTime(523.25, now + .3); // → C5
gainNode.gain.exponentialRampToValueAtTime(0.05, now + 0.05);        // 起音
gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);       // 衰减
```

- 用振荡器 + 增益包络实时合成「翻牌铃声」，**零音频文件、零网络请求**。
- `AudioContext` 惰性创建并缓存，兼容 `webkitAudioContext`；非浏览器环境返回 `null` 安全退出。

### 3.8 结果导出与分享（`src/components/SharePanel.tsx`）

- `html-to-image` 的 `toPng(node, { cacheBust: true, pixelRatio: 2 })` 将结果卡 DOM 渲染为 2 倍图，再以 `<a download>` 触发下载。
- 分享优先 `navigator.share`，不支持时回落 `navigator.clipboard.writeText`，两条路径都给出 UI 状态反馈。

### 3.9 牌面资源生成（`scripts/generate-card-assets.mjs`）

- 以数据表驱动生成 78 个 720×1200 SVG（金属描边、双层金框、花色强调色、罗马数字与符号标记）。
- 内置 `escapeText()` 处理 `& < >`，文本与图形均可安全注入模板。
- 资产随仓库提交，构建期无额外步骤，也不依赖任何外部图片版权素材。

---

## 4. 后端设计

### 4.1 单一数据访问层，双运行时复用（`backend/db.mjs`）

- 启动探测 `POSTGRES_URL || POSTGRES_PRISMA_URL || DATABASE_URL`：
  - **有连接串** → Postgres 模式，`ensureDb()` 幂等 `create table if not exists` 建表；
  - **无连接串** → JSON 文件模式（`server/data/db.json`），首次访问自动落盘初始化。
- 同一份导出函数（`findUserByEmail` / `createUser` / `createSession` / `resolveSession` / `insertReading` / `toggleFavorite` …）在两个模式下**行为一致**，切换存储不需要改动任何调用方。
- 表结构要点：
  - `sessions.token` 主键，`user_id` 外键 `on delete cascade`；
  - `favorites` 带 `unique(user_id, card_id)` 约束，把「一人一卡一收藏」下沉到数据库层；
  - `readings.payload jsonb` 存解读快照，读取时展开回完整 `ReadingSession`。
- 所有 SQL 使用 postgres.js 的**参数化模板**，不存在字符串拼接注入面。
- 查询按用户维度过滤（`where user_id = ...`），并在 Postgres 侧 `order by ... limit 20` 收敛数据量。

### 4.2 双入口、同一套契约

| 运行时 | 入口 | 用途 |
| --- | --- | --- |
| 本地 | `server/index.mjs`（Express，端口 8787） | `npm run dev:all` 时供 Vite 代理 `/api` |
| 生产 | `api/**/*.js`（Vercel Functions） | 每个文件导出默认 handler，按路径路由 |

两个入口都只做三件事：**鉴权 → 校验 → 调用 DB 层**，并通过 `api/_lib/json.js` 的 `sendJson` 统一响应格式；非法方法返回 405，未授权返回 401，校验失败返回 400，冲突返回 409。

### 4.3 API 一览

- `POST /api/auth/register` — 注册并签发会话 token（邮箱重复返回 409）
- `POST /api/auth/login` — 校验凭据并签发会话 token
- `GET /api/auth/me` — 按 `Authorization: Bearer <token>` 解析当前用户
- `GET /api/readings` — 拉取当前用户最近 20 条解读
- `POST /api/readings` — 校验后写入一条解读快照
- `GET /api/favorites` — 拉取收藏牌
- `POST /api/favorites` — 幂等切换收藏（返回 `removed` 或 `favorite`）
- `GET /api/health` — 健康检查

### 4.4 输入校验与前端错误分类

- `api/_lib/validators.js` 是**前后端共用的校验层**：
  - `validateCredentials`：邮箱归一化（trim + 小写）+ 正则、密码长度 ≥ 6、显示名长度 ≥ 2；
  - `validateReadingPayload`：牌阵 id 与问题类别走**白名单集合**，逐张校验 `orientation`、双语字段形状、牌对象与位置对象结构，并拒绝空牌组；
  - `validateCardId`：收藏入参必填校验。
- 前端 `src/lib/api.ts` 用 `AbortController` 施加 12s 请求超时，并把失败归类为
  `unauthorized | conflict | timeout | network | unknown` 五类 `ApiError`，让 UI 能区分「登录过期」「邮箱已占用」「网络不通」而不是笼统报错；`finally` 中清理超时定时器。

---

## 5. 数据模型要点

```ts
TarotCard        { id, name, arcana, suit, number, image, keywords_upright/reversed,
                   meaning_upright/reversed, element_association, zodiac_association, description_short }
SpreadDefinition { id, name, description, cardCount, ritualPrompt, positions[] }
DrawnCard        { card, orientation, position }               // 抽到但未解读
InterpretedCard  { ...DrawnCard, baseKeywords, baseMeaning, positionMeaning, zodiacOverlay }
ReadingSession   { id, createdAt, spreadId, zodiacId, questionCategoryId?, cards: InterpretedCard[] }
ZodiacProfile    { id, name, symbol, element, modality, date_range, keywords, reading_bias, ui_theme_hint }
```

`DrawnCard → InterpretedCard → ReadingSession` 是**单向不可逆的加工链**：每一步只做字段扩展，不修改上游对象，因此历史快照始终可完整还原当时读到的内容。

---

## 6. 本地运行

```bash
npm install
npm run generate:cards   # 可选：重新生成 78 个牌面 SVG
npm run dev              # 仅前端，http://localhost:5173
npm run dev:all          # 前端 + 本地 API（Express @8787，Vite 已配置 /api 代理）
npm run build            # tsc -b && vite build（类型错误即中断构建）
npm run preview          # 预览生产构建
```

- 环境变量：`VITE_API_BASE_URL`（前端 API 前缀，默认 `/api`）；`POSTGRES_URL` / `DATABASE_URL`（存在即启用 Postgres）。
- 路径别名 `@/* → src/*` 在 `vite.config.ts` 与 `tsconfig` 中保持一致。

---

## 7. 工程实践与设计取舍

- **数据与 UI 分离**：`src/data` 与 `src/lib` 不导入 React，业务规则可在无 DOM 环境下推演。
- **类型作为契约**：`tsc -b` 是构建第一步；文案键、牌阵 id、语言码、主题 id 均为字面量联合类型，拼写错误无法通过构建。
- **可复用优先**：牌阵/星座/主题全部数据驱动，组件按 `positions` 与本地化字段泛化，没有为某个牌阵开分支。
- **失败可降级**：远端同步失败保留本地解读；图片失效回落本地 SVG；分享 API 缺失回落剪贴板；语言缺字段回落英文。
- **资源最小化**：音效用代码合成，牌面用脚本生成，无外部素材依赖、无运行时图片 CDN 契约。

---

## 8. 已知限制与后续计划

诚实记录当前边界（阅读代码可直接验证）：

1. **密码哈希强度不足**：`hashPassword()` 为单次 `sha256`，无盐、无慢哈希。生产环境应替换为 bcrypt / argon2 并引入迁移策略，同时做恒定时间比较。
2. **会话无过期**：token 为 `crypto.randomBytes(24).toString('hex')`，虽有足够熵，但缺少 TTL 与刷新机制。
3. **前端 token 存于 localStorage**：无 HttpOnly Cookie 与 CSRF 防护，XSS 后果被放大；生产建议迁移到 Cookie + SameSite。
4. **随机源非密码学安全**：洗牌使用 `Math.random()`。用于占卜娱乐足够，若要「可验证公平」需换成 `crypto.getRandomValues`。
5. **牌面当前远程优先**：`src/data/tarot.ts` 中 `localCardImage()` 优先返回 Wikimedia Commons URL，本地 `public/cards/*.svg` 仅在映射缺失时兜底——而映射覆盖全部 78 张，因此本地资源实际不会被引用。离线或受限网络下会破图，建议调整为本地优先 + 远程回退（README 中「已替换为本地静态资源」的描述与当前代码不符，需一并修正）。
6. **缺少自动化测试与静态检查配置**：仓库没有测试框架、ESLint / Prettier 配置，`lib/` 中的纯函数（洗牌、解读、双语文案）是单元测试收益最高的切入点。
7. **文件模式数据库不适合并发**：JSON 模式为整文件读写，仅适用于单机开发场景，多实例部署必须启用 Postgres。

---

## 9. 简历用描述（可直接复制）

**中文（项目经历）**

> **Tarot Celestial Studio｜个人全栈项目（React + TypeScript + Node.js）**
> - 独立设计并实现塔罗抽牌 Web 应用：数据驱动的牌阵系统支持 6 种牌阵、78 张牌、12 星座与中英双语内容，新增牌阵只需追加一条数据声明。
> - 抽牌逻辑采用 Fisher-Yates 洗牌 + 位置下标取牌，从算法层面保证单次牌阵不重复、正逆位独立随机；解读按「基础牌义 × 位置语义 × 星座偏置」三层叠加，星座仅增强不覆写牌义。
> - 后端以单一数据访问层同时支撑 Express 本地运行时与 Vercel Functions 生产运行时，存储层可在 PostgreSQL 与 JSON 文件间自动切换且调用方无感；所有写接口经白名单校验与参数化 SQL 防护。
> - 前端以 Canvas + requestAnimationFrame 实现自适应星空渲染，用 Web Audio 振荡器合成音效（零音频素材），并通过 html-to-image 实现结果卡 2 倍图导出与 Web Share 分享。

**English (Project Experience)**

> **Tarot Celestial Studio — Full-stack personal project (React, TypeScript, Node.js)**
> - Built a tarot reading platform with a data-driven spread system covering 6 spreads, 78 cards, 12 zodiac profiles and full EN/ZH bilingual content; new spreads require only a data declaration.
> - Implemented draw logic with Fisher-Yates shuffle plus index-based selection, guaranteeing no duplicate cards per spread and independent upright/reversed orientation; interpretation composes base meaning × positional meaning × zodiac bias, where astrology augments but never overrides tarot meaning.
> - Designed a single data-access layer shared by an Express local runtime and Vercel Functions in production, with automatic PostgreSQL / JSON-file storage switching and whitelist validation plus parameterized SQL on every write path.
> - Delivered visual polish with a requestAnimationFrame canvas starfield, Web Audio oscillator-synthesized sound effects (no audio assets), and 2× result-card PNG export via html-to-image with Web Share fallback.
