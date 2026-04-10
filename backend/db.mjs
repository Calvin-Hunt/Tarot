import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import postgres from 'postgres';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbDir = path.join(__dirname, '..', 'server', 'data');
const dbPath = path.join(dbDir, 'db.json');

const connectionString =
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.DATABASE_URL ||
  '';

const sql = connectionString ? postgres(connectionString, { ssl: 'require' }) : null;
let databaseReady = false;

function isPostgresMode() {
  return Boolean(sql);
}

async function ensureFileDb() {
  await fs.mkdir(dbDir, { recursive: true });
  try {
    await fs.access(dbPath);
  } catch {
    await fs.writeFile(
      dbPath,
      JSON.stringify(
        {
          users: [],
          readings: [],
          favorites: [],
          sessions: [],
        },
        null,
        2,
      ),
      'utf8',
    );
  }
}

async function readFileDb() {
  await ensureFileDb();
  const raw = await fs.readFile(dbPath, 'utf8');
  return JSON.parse(raw);
}

async function writeFileDb(db) {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8');
}

export async function ensureDb() {
  if (!isPostgresMode()) {
    await ensureFileDb();
    return;
  }

  if (!databaseReady && sql) {
    await sql`
      create table if not exists users (
        id text primary key,
        email text unique not null,
        display_name text not null,
        password_hash text not null,
        created_at text not null
      )
    `;
    await sql`
      create table if not exists sessions (
        token text primary key,
        user_id text not null references users(id) on delete cascade,
        created_at text not null
      )
    `;
    await sql`
      create table if not exists readings (
        id text primary key,
        user_id text not null references users(id) on delete cascade,
        payload jsonb not null,
        persisted_at text not null
      )
    `;
    await sql`
      create table if not exists favorites (
        id text primary key,
        user_id text not null references users(id) on delete cascade,
        card_id text not null,
        created_at text not null,
        unique(user_id, card_id)
      )
    `;
    databaseReady = true;
  }
}

export function sanitizeUser(user) {
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    createdAt: user.createdAt,
  };
}

export function createToken() {
  return crypto.randomBytes(24).toString('hex');
}

export function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function getStorageMode() {
  return isPostgresMode() ? 'postgres' : 'file';
}

export async function findUserByEmail(email) {
  await ensureDb();

  if (!isPostgresMode()) {
    const db = await readFileDb();
    return db.users.find((user) => user.email === email) ?? null;
  }

  if (!sql) {
    return null;
  }

  const [user] = await sql`
    select id, email, display_name, password_hash, created_at
    from users
    where email = ${email}
    limit 1
  `;

  return user
    ? {
        id: user.id,
        email: user.email,
        displayName: user.display_name,
        passwordHash: user.password_hash,
        createdAt: user.created_at,
      }
    : null;
}

export async function createUser({ email, displayName, passwordHash }) {
  await ensureDb();
  const user = {
    id: crypto.randomUUID(),
    email,
    displayName,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  if (!isPostgresMode()) {
    const db = await readFileDb();
    db.users.push(user);
    await writeFileDb(db);
    return user;
  }

  if (!sql) {
    throw new Error('Postgres client unavailable');
  }

  await sql`
    insert into users (id, email, display_name, password_hash, created_at)
    values (${user.id}, ${user.email}, ${user.displayName}, ${user.passwordHash}, ${user.createdAt})
  `;
  return user;
}

export async function createSession(userId) {
  await ensureDb();
  const session = {
    token: createToken(),
    userId,
    createdAt: new Date().toISOString(),
  };

  if (!isPostgresMode()) {
    const db = await readFileDb();
    db.sessions.push(session);
    await writeFileDb(db);
    return session;
  }

  if (!sql) {
    throw new Error('Postgres client unavailable');
  }

  await sql`
    insert into sessions (token, user_id, created_at)
    values (${session.token}, ${session.userId}, ${session.createdAt})
  `;
  return session;
}

export async function resolveSession(authorizationHeader) {
  await ensureDb();
  const token = authorizationHeader?.replace('Bearer ', '');
  if (!token) {
    return null;
  }

  if (!isPostgresMode()) {
    const db = await readFileDb();
    const session = db.sessions.find((entry) => entry.token === token);
    if (!session) {
      return null;
    }
    const user = db.users.find((entry) => entry.id === session.userId);
    return user ? { user, token } : null;
  }

  if (!sql) {
    return null;
  }

  const [row] = await sql`
    select
      users.id,
      users.email,
      users.display_name,
      users.password_hash,
      users.created_at
    from sessions
    inner join users on users.id = sessions.user_id
    where sessions.token = ${token}
    limit 1
  `;

  return row
    ? {
        token,
        user: {
          id: row.id,
          email: row.email,
          displayName: row.display_name,
          passwordHash: row.password_hash,
          createdAt: row.created_at,
        },
      }
    : null;
}

export async function listReadingsByUser(userId) {
  await ensureDb();

  if (!isPostgresMode()) {
    const db = await readFileDb();
    return db.readings.filter((reading) => reading.userId === userId).slice(-20).reverse();
  }

  if (!sql) {
    return [];
  }

  const rows = await sql`
    select id, user_id, payload, persisted_at
    from readings
    where user_id = ${userId}
    order by persisted_at desc
    limit 20
  `;

  return rows.map((row) => ({
    ...row.payload,
    id: row.id,
    userId: row.user_id,
    persistedAt: row.persisted_at,
  }));
}

export async function insertReading(userId, reading) {
  await ensureDb();
  const persistedReading = {
    id: crypto.randomUUID(),
    userId,
    ...reading,
    persistedAt: new Date().toISOString(),
  };

  if (!isPostgresMode()) {
    const db = await readFileDb();
    db.readings.push(persistedReading);
    await writeFileDb(db);
    return persistedReading;
  }

  if (!sql) {
    throw new Error('Postgres client unavailable');
  }

  const { id, persistedAt, userId: readingUserId, ...payload } = persistedReading;
  await sql`
    insert into readings (id, user_id, payload, persisted_at)
    values (${id}, ${readingUserId}, ${sql.json(payload)}, ${persistedAt})
  `;
  return persistedReading;
}

export async function listFavoritesByUser(userId) {
  await ensureDb();

  if (!isPostgresMode()) {
    const db = await readFileDb();
    return db.favorites.filter((favorite) => favorite.userId === userId);
  }

  if (!sql) {
    return [];
  }

  const rows = await sql`
    select id, user_id, card_id, created_at
    from favorites
    where user_id = ${userId}
    order by created_at desc
  `;

  return rows.map((row) => ({
    id: row.id,
    userId: row.user_id,
    cardId: row.card_id,
    createdAt: row.created_at,
  }));
}

export async function toggleFavorite(userId, cardId) {
  await ensureDb();

  if (!isPostgresMode()) {
    const db = await readFileDb();
    const existing = db.favorites.find((favorite) => favorite.userId === userId && favorite.cardId === cardId);
    if (existing) {
      db.favorites = db.favorites.filter((favorite) => favorite.id !== existing.id);
      await writeFileDb(db);
      return { removed: true };
    }

    const favorite = {
      id: crypto.randomUUID(),
      userId,
      cardId,
      createdAt: new Date().toISOString(),
    };
    db.favorites.push(favorite);
    await writeFileDb(db);
    return { favorite };
  }

  if (!sql) {
    throw new Error('Postgres client unavailable');
  }

  const [existing] = await sql`
    select id from favorites where user_id = ${userId} and card_id = ${cardId} limit 1
  `;

  if (existing) {
    await sql`delete from favorites where id = ${existing.id}`;
    return { removed: true };
  }

  const favorite = {
    id: crypto.randomUUID(),
    userId,
    cardId,
    createdAt: new Date().toISOString(),
  };

  await sql`
    insert into favorites (id, user_id, card_id, created_at)
    values (${favorite.id}, ${favorite.userId}, ${favorite.cardId}, ${favorite.createdAt})
  `;
  return { favorite };
}

export async function deleteSessionsByUser(userId) {
  await ensureDb();
  if (!isPostgresMode()) {
    const db = await readFileDb();
    db.sessions = db.sessions.filter((session) => session.userId !== userId);
    await writeFileDb(db);
    return;
  }
  if (sql) {
    await sql`delete from sessions where user_id = ${userId}`;
  }
}
