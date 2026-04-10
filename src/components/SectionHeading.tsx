import { motion } from 'framer-motion';

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-3xl text-center"
    >
      <p className="mb-4 text-xs uppercase tracking-[0.5em] text-gold/80">{eyebrow}</p>
      <h2 className="font-display text-4xl text-gradient-gold sm:text-5xl">{title}</h2>
      <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">{description}</p>
    </motion.div>
  );
}
