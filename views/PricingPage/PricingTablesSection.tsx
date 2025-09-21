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
  text-align: center;
  box-sizing: border-box;
  width: 100%;
  max-width: 320px;

  & > *:not(:first-child) {
    margin-top: 1rem;
  }

  ${media('<=desktop')} {
    box-shadow: var(--shadow-md);
    order: ${(p) => (p.isOutlined ? -1 : 0)};
  }
`;

const Title = styled.h3`
  font-size: 3.2rem;
`;

const Description = styled.p`
  font-size: 2rem;
  color: rgba(var(--textSecondary), 0.9);
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
  font-size: 3.2rem;
  line-height: 1;
  font-weight: bold;

  span {
    font-size: 1.8rem;
    font-weight: normal;
    margin-left: 0.4rem;
  }
`;

const CustomRichText = styled(RichText)`
  li {
    margin: auto;
    width: fit-content;
    font-size: 1.6rem;
    line-height: 1.6;
  }
`;

const CustomButton = styled(Button)`
  width: 100%;
  margin-top: auto;
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
          <span itemProp="price">{children}</span>
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
