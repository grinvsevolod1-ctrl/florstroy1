"use client"

import Head from "next/head"
import NextLink from "next/link"
import styled from "styled-components"
import Button from "components/Button"
import ButtonGroup from "components/ButtonGroup"
import Container from "components/Container"
import OverTitle from "components/OverTitle"
import { useCalculatorModalContext } from "contexts/calculator-modal.context"
import { media } from "utils/media"

export default function Hero() {
  const { setIsCalculatorOpened } = useCalculatorModalContext()

  return (
    <>
      <Head>
        <title>Промышленные и полимерные полы | Florstroy</title>
        <meta
          name="description"
          content="Промышленные бетонные полы, шлифовка, армирование, наливные покрытия. Работаем по Москве и области. Гарантия качества."
        />
        <meta property="og:title" content="Бетонные полы под ключ | Florstroy" />
        <meta
          property="og:description"
          content="Промышленные бетонные полы, шлифовка, армирование, наливные покрытия. Работаем по Москве и области."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://florstroy.ru" />
        <meta property="og:image" content="https://florstroy.ru/preview.jpg" />
      </Head>

      <HeroWrapper>
        <Contents>
          <CustomOverTitle>строительные услуги</CustomOverTitle>
          <Heading>Промышленные и полимерные полы</Heading>
          <Description>
            Наливные полы — идеальное покрытие для сложных условий эксплуатации, которые встречаются на промышленных
            объектах. Мы специализируемся на устройстве наливных полов. Наши методы работы позволяют выполнять работу по
            устройству полов оперативно и с оптимальным соотношением ≪цена/качество≫
          </Description>
          <CustomButtonGroup>
            <Button onClick={() => setIsCalculatorOpened(true)}>
              Рассчитать стоимость <span>&rarr;</span>
            </Button>
            <NextLink href="/pricing" passHref>
              <Button transparent>
                Подробнее <span>&rarr;</span>
              </Button>
            </NextLink>
          </CustomButtonGroup>
        </Contents>
        <ImageContainer />
      </HeroWrapper>
    </>
  )
}

const HeroWrapper = styled(Container)`
  position: relative;
  display: flex;
  padding-top: 5rem;
  padding-bottom: 5rem;
  background-image: url('/test-article/13.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 70vh;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => (theme.mode === "dark" ? "rgba(0, 0, 0, 0.65)" : "rgba(255, 255, 255, 0.4)")};
    z-index: 0;
    transition: background 0.3s ease;
  }

  & > * {
    position: relative;
    z-index: 1;
    color: ${({ theme }) => (theme.mode === "dark" ? "#fff" : "#111")};
    text-shadow: ${({ theme }) =>
      theme.mode === "dark" ? "0 0 10px rgba(0, 0, 0, 0.6)" : "0 0 10px rgba(255, 255, 255, 0.6)"};
  }

  ${media("<=desktop")} {
    padding-top: 3rem;
    padding-bottom: 3rem;
    flex-direction: column;
    align-items: center;
    min-height: 60vh;
  }

  ${media("<=tablet")} {
    min-height: 50vh;
  }
`

const Contents = styled.div`
  flex: 1;
  max-width: 60rem;
  animation: fadeIn 0.8s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ${media("<=desktop")} {
    max-width: 100%;
  }
`

const CustomButtonGroup = styled(ButtonGroup)`
  margin-top: 4rem;
  
  button {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(0);
    }
  }

  ${media("<=tablet")} {
    margin-top: 3rem;
    flex-direction: column;
    gap: 1rem;
    
    button {
      width: 100%;
    }
  }
`

const ImageContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: flex-start;

  ${media("<=desktop")} {
    margin-top: 2rem;
    justify-content: center;
  }
`

const Description = styled.p`
  font-size: 1.8rem;
  opacity: 0.8;
  line-height: 1.6;

  ${media("<=desktop")} {
    font-size: 1.6rem;
  }

  ${media("<=tablet")} {
    font-size: 1.5rem;
  }
`

const CustomOverTitle = styled(OverTitle)`
  margin-bottom: 2rem;
  animation: slideInLeft 0.6s ease-out;

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`

const Heading = styled.h1`
  font-size: 7.2rem;
  font-weight: bold;
  line-height: 1.1;
  margin-bottom: 4rem;
  letter-spacing: -0.03em;
  animation: slideInRight 0.6s ease-out 0.2s both;

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  ${media("<=desktop")} {
    font-size: 5.5rem;
  }

  ${media("<=tablet")} {
    font-size: 4.6rem;
    margin-bottom: 2rem;
  }

  ${media("<=phone")} {
    font-size: 3.5rem;
  }
`
