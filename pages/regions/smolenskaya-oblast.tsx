import Head from 'next/head';
import styled from 'styled-components';
import BasicSection from 'components/BasicSection';
import Link from 'components/Link';

export default function SmolenskayaOblastPage() {
  return (
    <>
      <Head>
        <title>Устройство полов в Смоленской области | FlorStroy</title>
        <meta name="description" content="Наливные, бетонные и полимерные полы в Смоленской области. FlorStroy — надёжный подрядчик по устройству полов." />
        <link rel="canonical" href="https://florstroy.ru/regions/smolenskaya-oblast" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "FlorStroy",
            "url": "https://florstroy.ru/regions/smolenskaya-oblast",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "Смоленская область",
              "addressCountry": "Россия"
            },
            "telephone": "+7 (495) 000-00-00",
            "description": "Устройство наливных, бетонных и полимерных полов в Смоленской области",
            "areaServed": "Смоленская область"
          }
        `}</script>
      </Head>

      <RegionWrapper>
        <BasicSection imageUrl="/test-article/6.jpeg" title="Промышленные полы" overTitle="Смоленская область">
          <p>
            FlorStroy выполняет устройство полов в Смоленске, Вязьме, Рославле, Ярцево, Сафоново и по всей области. Мы — надёжный подрядчик по наливным, бетонным и полимерным покрытиям.
          </p>
          <StyledList>
            <li>Наливные полы для производств и складов</li>
            <li>Бетонные основания с упрочнителем</li>
            <li>Полимерные покрытия для спортплощадок и детских зон</li>
          </StyledList>
          <p>
            Работаем по технологии: подготовка основания, армирование, гидроизоляция, заливка, финишная обработка. Предоставляем гарантию, фотоотчёты, техдокументацию.
          </p>
          <p>
            <Link href="/contact">Свяжитесь с нами</Link> для консультации и расчёта стоимости.
          </p>
        </BasicSection>
      </RegionWrapper>
    </>
  );
}

const RegionWrapper = styled.div`
  background: rgb(var(--secondBackground));
  padding-bottom: 15rem;
`;

const StyledList = styled.ul`
  margin: 2rem 0;
  padding-left: 2rem;
  font-size: 1.6rem;
  line-height: 1.6;

  li {
    margin-bottom: 1.2rem;
  }
`;
