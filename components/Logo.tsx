export default function Logo({ ...rest }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        backgroundColor: 'transparent',
        color: '#f0f0f0', // светлый текст для тёмной темы
      }}
      {...rest}
    >
      <img
        src="/favicon.svg"
        alt="FlorStroy Logo"
        width={48}
        height={48}
        style={{
          borderRadius: '6px', // лёгкое закругление
          objectFit: 'contain',
          backgroundColor: 'transparent',
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