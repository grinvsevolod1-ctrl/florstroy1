import Head from 'next/head';
import styled from 'styled-components';
import BasicSection from 'components/BasicSection';
import Link from 'components/Link';

export default function MoskovskayaOblastPage() {
  return (
    <>
      <Head>
        <title>Устройство полов в Московской области | FlorStroy</title>
        <meta name="description" content="Наливные, бетонные и полимерные полы в Московской области. FlorStroy — надёжный подрядчик по устройству полов." />
        <link rel="canonical" href="https://florstroy.ru/regions/moskovskaya-oblast" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "FlorStroy",
            "url": "https://florstroy.ru/regions/moskovskaya-oblast",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "Московская область",
              "addressCountry": "Россия"
            },
            "telephone": "+7 (495) 000-00-00",
            "description": "Устройство наливных, бетонных и полимерных полов в Московской области",
            "areaServed": "Московская область"
          }
        `}</script>
      </Head>

      <RegionWrapper>
        <BasicSection imageUrl="/test-article/6.jpeg" title="Промышленные полы" overTitle="Московская область">
          <p>
            FlorStroy — подрядчик по устройству наливных, бетонных и полимерных полов в Московской области. Работаем в Одинцово, Подольске, Химках, Балашихе, Королёве и других городах региона.
          </p>
          <StyledList>
            <li>Наливные полы для складов и производств</li>
            <li>Бетонные полы с упрочнителем для промышленных помещений</li>
            <li>Полимерные покрытия для спортплощадок и паркингов</li>
          </StyledList>
          <p>
            Устройство полов под ключ: проектирование, подготовка основания, армирование, гидроизоляция, заливка, финишная обработка. Работаем с гарантией, соблюдаем сроки, предоставляем фотоотчёты и техническую документацию.
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
