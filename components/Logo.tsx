import { useEffect, useState } from 'react';

export default function Logo({ ...rest }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const match = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(match.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    match.addEventListener('change', handler);
    return () => match.removeEventListener('change', handler);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.5rem 1rem',
        borderRadius: '16px', // большее закругление
        backgroundColor: isDarkMode ? '#000' : '#fff',
        color: isDarkMode ? '#fff' : '#000',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
      {...rest}
    >
      <img
        src="/favicon.svg"
        alt="FlorStroy Logo"
        width={48}
        height={48}
        style={{
          borderRadius: '16px', // закругление изображения
          objectFit: 'contain',
          backgroundColor: isDarkMode ? '#000' : '#fff',
          padding: '4px',
        }}
      />
      <span
        style={{
          fontWeight: 700,
          fontSize: '1.8rem',
          fontFamily: '"Segoe UI", sans-serif',
          color: 'inherit',
        }}
      >
        FlorStroy
      </span>
    </div>
  );
}
