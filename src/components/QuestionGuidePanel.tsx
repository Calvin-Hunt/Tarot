import { questionCategories } from '@/data/questionGuides';
import { useReading } from '@/context/ReadingContext';
import { usePreferences } from '@/context/PreferencesContext';
import { t, translateQuestionName } from '@/lib/i18n';

export function QuestionGuidePanel() {
  const { selectedQuestionCategoryId, setSelectedQuestionCategoryId } = useReading();
  const { language } = usePreferences();

  return (
    <div className="panel-shell gold-frame p-6">
      <p className="text-xs uppercase tracking-[0.45em] text-gold/70">{t(language, 'question.title')}</p>
      <h3 className="mt-3 font-display text-3xl text-[#fff1cf]">{t(language, 'question.heading')}</h3>
      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        {questionCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setSelectedQuestionCategoryId(category.id)}
            className={`rounded-[22px] border p-5 text-left transition ${
              selectedQuestionCategoryId === category.id ? 'border-gold/40 bg-gold/10' : 'border-white/10 bg-white/[0.03] hover:border-gold/25'
            }`}
          >
            <p className="font-display text-2xl text-[#fff1cf]">{translateQuestionName(language, category.id, category.title)}</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">{category.description}</p>
            <div className="mt-4 space-y-2 text-xs leading-5 text-slate-400">
              {category.prompts.map((prompt) => (
                <p key={prompt}>{prompt}</p>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
