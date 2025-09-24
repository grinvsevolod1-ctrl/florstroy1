export default function Logo({ ...rest }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }} {...rest}>
      <img
        src="/favicon.png"
        alt="FlorStroy Logo"
        width={40}
        height={40}
        style={{
          borderRadius: '50%',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      />
      <span
        style={{
          fontWeight: 700,
          fontSize: '1.8rem',
          marginLeft: '1rem',
          color: 'currentColor',
        }}
      >
        FlorStroy
      </span>
    </div>
  );
}
