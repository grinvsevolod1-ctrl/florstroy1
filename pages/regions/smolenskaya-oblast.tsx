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
      </Head>

      <RegionWrapper>
        <BasicSection imageUrl="/test-article/6.jpeg" title="Промышленные полы" overTitle="Смоленская область">
          <p>
            FlorStroy работает по всей Смоленской области: Смоленск, Вязьма, Рославль, Ярцево, Сафоново и другие города.
          </p>
          <StyledList>
            <li>Наливные полы для производств и складов</li>
            <li>Бетонные основания с упрочнителем</li>
            <li>Полимерные покрытия для спортплощадок</li>
          </StyledList>
          <p>
            Гарантия, сроки, фотоотчёты, техническая документация — всё включено.
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
