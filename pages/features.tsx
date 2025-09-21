import Head from 'next/head';
import styled from 'styled-components';
import AutofitGrid from 'components/AutofitGrid';
import BasicCard from 'components/BasicCard';
import Page from 'components/Page';
import SectionTitle from 'components/SectionTitle';
import YoutubeVideo from 'components/YoutubeVideo';
import { media } from 'utils/media';

const FEATURES = [
  {
    imageUrl: '/grid-icons/asset-1.svg',
    title: 'Бетонные полы под ключ',
    description: 'Полный цикл работ: от подготовки основания до финишного покрытия. Работаем по Москве и области.',
  },
  {
    imageUrl: '/grid-icons/asset-2.svg',
    title: 'Шлифовка и упрочнение',
    description: 'Механическая обработка поверхности с топпингом или упрочнителем — для долговечности и эстетики.',
  },
  {
    imageUrl: '/grid-icons/asset-3.svg',
    title: 'Наливные покрытия',
    description: 'Эпоксидные и полиуретановые системы для складов, СТО, производств. Толщина от 2 мм.',
  },
  {
    imageUrl: '/grid-icons/asset-4.svg',
    title: 'Армирование пола',
    description: 'Сетка, фибра или арматура — повышаем прочность конструкции и предотвращаем трещины.',
  },
  {
    imageUrl: '/grid-icons/asset-5.svg',
    title: 'Гидроизоляция основания',
    description: 'Обмазочная и рулонная защита от влаги и грунтовых вод. Рекомендуется для цокольных помещений.',
  },
  {
    imageUrl: '/grid-icons/asset-6.svg',
    title: 'Монолитные плиты',
    description: 'Надёжная основа под тяжёлые нагрузки. Толщина до 200 мм, армирование по проекту.',
  },
  {
    imageUrl: '/grid-icons/asset-7.svg',
    title: 'Проектирование и расчёт',
    description: 'Помогаем рассчитать объёмы, подобрать материалы и составить смету под ваш объект.',
  },
  {
    imageUrl: '/grid-icons/asset-8.svg',
    title: 'Гарантия и сопровождение',
    description: 'Официальная гарантия до 5 лет. Консультации и техническое сопровождение на всех этапах.',
  },
  {
    imageUrl: '/grid-icons/asset-9.svg',
    title: 'Работаем по договору',
    description: 'Прозрачные условия, фиксированные сроки, юридическая ответственность. Работаем с юр. и физ. лицами.',
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Head>
        <title>Наши услуги и преимущества | FlorStroy</title>
        <meta
          name="description"
          content="Узнайте, какие услуги предоставляет FlorStroy: бетонные полы, наливные покрытия, армирование, гидроизоляция и многое другое."
        />
      </Head>

      <Page title="Наши услуги и преимущества">
        <Wrapper>
          <SectionTitle>Краткое видео-презентация</SectionTitle>
          <YoutubeVideo url="https://www.youtube.com/watch?v=BggrpKfqh1c" />
          <CustomAutofitGrid>
            {FEATURES.map((singleFeature) => (
              <BasicCard key={singleFeature.title} {...singleFeature} />
            ))}
          </CustomAutofitGrid>
        </Wrapper>
      </Page>
    </>
  );
}

const Wrapper = styled.div`
  & > *:not(:first-child) {
    margin-top: 10rem;
  }
`;

const CustomAutofitGrid = styled(AutofitGrid)`
  --autofit-grid-item-size: 40rem;

  ${media('<=tablet')} {
    --autofit-grid-item-size: 30rem;
  }

  ${media('<=phone')} {
    --autofit-grid-item-size: 100%;
  }
`;
