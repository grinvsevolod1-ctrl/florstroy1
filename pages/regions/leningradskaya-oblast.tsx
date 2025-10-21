import Head from 'next/head';
import styled from 'styled-components';
import BasicSection from 'components/BasicSection';
import Link from 'components/Link';

export default function LeningradskayaOblastPage() {
  return (
    <>
      <Head>
        <title>Устройство полов в Ленинградской области | FlorStroy</title>
        <meta name="description" content="Наливные, бетонные и полимерные полы в Ленинградской области. FlorStroy — надёжный подрядчик по устройству полов." />
        <link rel="canonical" href="https://florstroy.ru/regions/leningradskaya-oblast" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "FlorStroy",
            "url": "https://florstroy.ru/regions/leningradskaya-oblast",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "Ленинградская область",
              "addressCountry": "Россия"
            },
            "telephone": "+7 (495) 000-00-00",
            "description": "Устройство наливных, бетонных и полимерных полов в Ленинградской области",
            "areaServed": "Ленинградская область"
          }
        `}</script>
      </Head>

      <RegionWrapper>
        <BasicSection imageUrl="/test-article/6.jpeg" title="Промышленные полы" overTitle="Ленинградская область">
          <p>
            FlorStroy работает по всей Ленинградской области: Гатчина, Выборг, Тосно, Кингисепп, Сертолово и другие города. Мы — подрядчик по устройству наливных, бетонных и полимерных полов.
          </p>
          <StyledList>
            <li>Наливные полы для производственных помещений</li>
            <li>Бетонные основания с упрочнителем</li>
            <li>Полимерные покрытия для паркингов, спортплощадок и детских зон</li>
          </StyledList>
          <p>
            Устройство полов включает: проектирование, подготовку основания, армирование, гидроизоляцию, заливку, финишную обработку. Работаем с гарантией, соблюдаем сроки, предоставляем фотоотчёты.
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
