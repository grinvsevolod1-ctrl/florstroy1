export default function Logo({ ...rest }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
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