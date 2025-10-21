import styled from "styled-components"
import AutofitGrid from "components/AutofitGrid"
import BasicCard from "components/BasicCard"
import Container from "components/Container"
import { media } from "utils/media"

const FEATURES = [
  {
    imageUrl: "/grid-icons/asset-1.svg",
    title: "Шлифовка бетонных полов",
    description:
      "Механическая обработка поверхности для повышения прочности, эстетики и долговечности. Используем профессиональное оборудование.",
  },
  {
    imageUrl: "/grid-icons/asset-2.svg",
    title: "Армирование и заливка",
    description:
      "Укрепление конструкции металлической сеткой или фиброй. Заливка бетонной смеси с соблюдением технологии.",
  },
  {
    imageUrl: "/grid-icons/asset-3.svg",
    title: "Наливные полы",
    description:
      "Идеально ровное покрытие для складов, производств и торговых помещений. Быстрый монтаж, высокая износостойкость.",
  },
  {
    imageUrl: "/grid-icons/asset-4.svg",
    title: "Демонтаж старого покрытия",
    description: "Удаление старого бетона, плитки или наливного пола. Подготовка основания под новое устройство.",
  },
  {
    imageUrl: "/grid-icons/asset-5.svg",
    title: "Гидроизоляция основания",
    description: "Защита от влаги и грунтовых вод. Используем современные материалы и технологии.",
  },
  {
    imageUrl: "/grid-icons/asset-6.svg",
    title: "Устройство бетонной стяжки",
    description: "Базовый слой под финишное покрытие. Обеспечивает ровность и прочность пола.",
  },
]

export default function Features() {
  return (
    <FeaturesSection>
      <Container>
        <CustomAutofitGrid>
          {FEATURES.map((singleFeature, index) => (
            <AnimatedCard key={singleFeature.title} delay={index * 0.1}>
              <BasicCard {...singleFeature} />
            </AnimatedCard>
          ))}
        </CustomAutofitGrid>
      </Container>
    </FeaturesSection>
  )
}

const FeaturesSection = styled.section`
  padding: 5rem 0;

  ${media("<=tablet")} {
    padding: 3rem 0;
  }
`

const AnimatedCard = styled.div<{ delay: number }>`
  animation: fadeInUp 0.6s ease-out ${(p) => p.delay}s both;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:hover {
    transform: translateY(-5px);
    transition: transform 0.3s ease;
  }
`

const CustomAutofitGrid = styled(AutofitGrid)`
  --autofit-grid-item-size: 40rem;

  ${media("<=desktop")} {
    --autofit-grid-item-size: 35rem;
  }

  ${media("<=tablet")} {
    --autofit-grid-item-size: 30rem;
  }

  ${media("<=phone")} {
    --autofit-grid-item-size: 100%;
  }
`
