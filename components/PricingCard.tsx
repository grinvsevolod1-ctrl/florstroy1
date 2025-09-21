import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { media } from 'utils/media';
import Button from './Button';
import RichText from './RichText';
import { useCalculatorModalContext } from 'contexts/calculator-modal.context';

const Wrapper = styled.div<{ isOutlined?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  background: rgb(var(--cardBackground));
  box-shadow: ${(p) => (p.isOutlined ? 'var(--shadow-lg)' : 'var(--shadow-md)')};
  transform: ${(p) => (p.isOutlined ? 'scale(1.1)' : 'scale(1.0)')};
  text-align: center;

  & > *:not(:first-child) {
    margin-top: 1rem;
  }

  ${media('<=desktop')} {
    box-shadow: var(--shadow-md);
    transform: none;
    order: ${(p) => (p.isOutlined ? -1 : 0)};
  }
`;

const Title = styled.h3`
  font-size: 4rem;
`;

const Description = styled.p`
  font-size: 2.5rem;
`;

const PriceContainer = styled.div`
  margin: auto;

  & > *:not(:first-child) {
    margin-top: 2rem;
  }
`;

const Price = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 4rem;
  line-height: 1;
  font-weight: bold;

  span {
    font-size: 2rem;
    font-weight: normal;
  }
`;

const CustomRichText = styled(RichText)`
  li {
    margin: auto;
    width: fit-content;
  }
`;

const CustomButton = styled(Button)`
  width: 100%;
`;

interface PricingCardProps {
  title: string;
  description: string;
  benefits: string[];
  isOutlined?: boolean;
}

export default function PricingCard({
  title,
  description,
  benefits,
  isOutlined,
  children,
}: PropsWithChildren<PricingCardProps>) {
  const isAnyBenefitPresent = benefits?.length;
  const { setIsCalculatorOpened } = useCalculatorModalContext();

  const handleClick = () => {
    setIsCalculatorOpened(true);
    console.log(`Открыта заявка на услугу: ${title}`);
  };

  return (
    <Wrapper isOutlined={isOutlined} itemScope itemType="https://schema.org/Service">
      <Title itemProp="name">{title}</Title>
      <Description itemProp="description">{description}</Description>

      <PriceContainer>
        <Price itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <meta itemProp="priceCurrency" content="RUB" />
          <span itemProp="price">{String(children).replace(/\D/g, '')}</span>
          {children}
        </Price>

        {isAnyBenefitPresent && (
          <CustomRichText>
            <ul>
              {benefits.map((singleBenefit, idx) => (
                <li key={idx}>{singleBenefit}</li>
              ))}
            </ul>
          </CustomRichText>
        )}
      </PriceContainer>

      <CustomButton onClick={handleClick}>Оставить заявку</CustomButton>
    </Wrapper>
  );
}
