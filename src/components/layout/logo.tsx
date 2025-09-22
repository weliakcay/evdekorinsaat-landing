import Link from 'next/link';

export function Logo({ theme = 'dark' }: { theme?: 'light' | 'dark' }) {
  const accent = theme === 'dark' ? 'text-white' : 'text-[#111827]';
  const highlight = theme === 'dark' ? 'text-[#d9aa63]' : 'text-[#b18343]';

  return (
    <Link
      href="/"
      className="flex items-baseline gap-2 text-lg font-semibold tracking-[0.32em] uppercase"
      aria-label="Evdekor İnşaat ana sayfa"
    >
      <span className={`${accent}`}>Evdekor</span>
      <span className={`${highlight}`}>İnşaat</span>
    </Link>
  );
}
