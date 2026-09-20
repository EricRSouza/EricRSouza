export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h16m-6-6 6 6-6 6'}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ServiceIcon({ index }: { index: number }) {
  const shapes = [
    <>
      <path d="M7 29V19m9 10V11m9 18V5" />
      <path d="M4 32h28" />
    </>,
    <>
      <ellipse cx="18" cy="8" rx="12" ry="5" />
      <path d="M6 8v10c0 6 24 6 24 0V8M6 18v10c0 6 24 6 24 0V18" />
    </>,
    <>
      <rect x="3" y="4" width="11" height="11" rx="2" />
      <rect x="22" y="22" width="11" height="11" rx="2" />
      <path d="M14 9h13v9m-5-4 5 4 5-4M22 27H9v-8m-5 4 5-4 5 4" />
    </>,
  ];
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {shapes[index]}
    </svg>
  );
}
