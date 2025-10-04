export default function Logo({ ...rest }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        background: 'linear-gradient(90deg, #e0f7e9, #f0fcf7)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      }}
      {...rest}
    >
      <img
        src="/favicon.svg"
        alt="FlorStroy Logo"
        width={48}
        height={48}
        style={{
          borderRadius: '50%',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
          backgroundColor: '#fff',
          padding: '4px',
        }}
      />
      <span
        style={{
          fontWeight: 800,
          fontSize: '2rem',
          fontFamily: '"Segoe UI", sans-serif',
          color: '#2c5f2d',
          letterSpacing: '0.5px',
        }}
      >
        FlorStroy
      </span>
    </div>
  );
}