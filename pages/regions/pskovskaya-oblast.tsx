import Head from 'next/head';
import styled from 'styled-components';
import BasicSection from 'components/BasicSection';
import Link from 'components/Link';

export default function PskovskayaOblastPage() {
  return (
    <>
      <Head>
        <title>Устройство полов в Псковской области | FlorStroy</title>
        <meta name="description" content="Наливные, бетонные и полимерные полы в Псковской области. FlorStroy — надёжный подрядчик по устройству полов." />
        <link rel="canonical" href="https://florstroy.ru/regions/pskovskaya-oblast" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "FlorStroy",
            "url": "https://florstroy.ru/regions/pskovskaya-oblast",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "Псковская область",
              "addressCountry": "Россия"
            },
            "telephone": "+7 (495) 000-00-00",
            "description": "Устройство наливных, бетонных и полимерных полов в Псковской области",
            "areaServed": "Псковская область"
          }
        `}</script>
      </Head>

      <RegionWrapper>
        <BasicSection imageUrl="/test-article/6.jpeg" title="Промышленные полы" overTitle="Псковская область">
          <p>
            FlorStroy — подрядчик по устройству полов в Пскове, Великих Луках, Острове, Печорах, Дно и других населённых пунктах области. Выполняем наливные, бетонные и полимерные покрытия.
          </p>
          <StyledList>
            <li>Наливные полы для промышленных объектов</li>
            <li>Бетонные основания с упрочнителем</li>
            <li>Полимерные покрытия для открытых площадок и паркингов</li>
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
