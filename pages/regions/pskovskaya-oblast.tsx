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
      </Head>

      <RegionWrapper>
        <BasicSection imageUrl="/test-article/6.jpeg" title="Промышленные полы" overTitle="Псковская область">
          <p>
            Работаем по всей Псковской области: Псков, Великие Луки, Остров, Печоры, Дно и другие населённые пункты.
          </p>
          <StyledList>
            <li>Наливные полы для промышленных объектов</li>
            <li>Бетонные основания с упрочнителем</li>
            <li>Полимерные покрытия для открытых площадок</li>
          </StyledList>
          <p>
            Надёжность, скорость, прозрачность — всё как ты любишь.
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
