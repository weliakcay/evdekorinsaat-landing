import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 text-lg font-semibold tracking-tight text-neutral-900"
      aria-label="Evdekorinsaat ana sayfa"
    >
      <Image
        src="/logo.svg"
        alt="Evdekorinsaat"
        width={48}
        height={48}
        priority
      />
      <span className="flex flex-col leading-none">
        <span className="text-sm uppercase tracking-[0.22em] text-[#ef6c39]">Evdekor</span>
        <span className="text-xl font-bold">İnşaat</span>
      </span>
    </Link>
  );
}
