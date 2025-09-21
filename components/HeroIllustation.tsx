export default function HeroIllustration() {
  return (
    <svg
      id="concrete-floor"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      width="1113.8"
      height="425.71"
      viewBox="0 0 1113.8 825.71"
    >
      <defs>
        {/* Высококачественная текстура бетона с трещинами и неровностями */}
        <pattern
          id="concreteTexture"
          patternUnits="userSpaceOnUse"
          width="50"
          height="50"
        >
          {/* Основной цвет бетона */}
          <rect width="50" height="50" fill="#999" rx="4" ry="4" />
          {/* Мелкие трещины и неровности */}
          <path
            d="M2,15 Q10,8 20,15 T48,15"
            stroke="#777"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M8,25 Q16,18 24,25 T48,25"
            stroke="#777"
            strokeWidth="0.8"
            fill="none"
            opacity="0.2"
          />
          {/* Немного пыли и мелких сколов */}
          <circle cx="10" cy="10" r="1" fill="#555" opacity="0.4" />
          <circle cx="40" cy="40" r="0.7" fill="#555" opacity="0.3" />
        </pattern>

        {/* Трещины для реалистичности */}
        <path
          id="crack1"
          d="M100,400 Q120,380 140,400 T180,380 Q200,400 220,380"
          stroke="#555"
          strokeWidth="2"
          fill="none"
        />
        <path
          id="crack2"
          d="M300,600 Q320,580 340,600 T380,580"
          stroke="#555"
          strokeWidth="1.8"
          fill="none"
        />
        <path
          id="crack3"
          d="M600,700 Q620,680 640,700 T680,680"
          stroke="#555"
          strokeWidth="2.2"
          fill="none"
        />
        {/* Имитируем неровности поверхности */}
        <path
          id="roughSurface"
          d="M0,750 Q200,730 400,750 T800,730 L1113.8,750 L1113.8,825.71 L0,825.71 Z"
          fill="#888"
          opacity="0.2"
        />
      </defs>

      {/* Основной фон - бетон с текстурой */}
      <rect width="100%" height="100%" fill="url(#concreteTexture)" />

      {/* Добавляем трещины */}
      <use xlinkHref="#crack1" opacity="0.8" />
      <use xlinkHref="#crack2" opacity="0.7" />
      <use xlinkHref="#crack3" opacity="0.9" />

      {/* Имитация неровной поверхности (сколы, царапины) */}
      <path
        d="M0,750 Q150,735 300,750 Q450,765 600,750 Q750,735 900,750 Q1050,765 1113.8,750 L1113.8,825.71 L0,825.71 Z"
        fill="#888"
        opacity="0.15"
      />

      {/* Немного пыли и мелких частиц */}
      <circle cx="100" cy="800" r="2" fill="#555" opacity="0.2" />
      <circle cx="200" cy="810" r="1.5" fill="#555" opacity="0.2" />
      <circle cx="400" cy="820" r="1" fill="#555" opacity="0.2" />
      <circle cx="600" cy="805" r="2" fill="#555" opacity="0.2" />
      <circle cx="900" cy="815" r="1.8" fill="#555" opacity="0.2" />

      {/* Внутренний стиль — минимализм, чтобы подчеркнуть бетон */}
    </svg>
  );
}