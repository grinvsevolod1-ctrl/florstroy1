import React, { useState } from 'react';
import styled from 'styled-components';
import useEscClose from 'hooks/useEscKey';
import { media } from 'utils/media';
import Button from './Button';
import CloseIcon from './CloseIcon';
import Container from './Container';
import Input from './Input';
import Overlay from './Overlay';

export interface NewsletterModalProps {
  onClose: () => void;
}

export default function NewsletterModal({ onClose }: NewsletterModalProps) {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [sent, setSent] = useState(false);

  useEscClose({ onClose });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const BOT_TOKEN = '7194760789:AAFpsv53YHZfy15mvZgiDoRMTqvDVs_V6gU';
    const CHAT_ID = '940316027';
    const text = `Заявка с сайта FlorStroy:\nИмя: ${name}\nТелефон: ${phone}`;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    });

    setSent(true);
  }

  return (
    <Overlay>
      <Container>
        <Card onSubmit={onSubmit}>
          <CloseIconContainer>
            <CloseIcon onClick={onClose} />
          </CloseIconContainer>
          {sent ? (
            <Title>Заявка отправлена! Мы свяжемся с вами в ближайшее время.</Title>
          ) : (
            <>
              <Title>Оставьте заявку на бесплатный замер</Title>
              <Row>
                <CustomInput
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  required
                />
                <CustomInput
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Телефон"
                  required
                />
                <CustomButton as="button" type="submit">
                  Отправить
                </CustomButton>
              </Row>
            </>
          )}
        </Card>
      </Container>
    </Overlay>
  );
}

const Card = styled.form`
  display: flex;
  position: relative;
  flex-direction: column;
  margin: auto;
  padding: 10rem 5rem;
  background: rgb(var(--modalBackground));
  border-radius: 0.6rem;
  max-width: 70rem;
  overflow: hidden;
  color: rgb(var(--text));

  ${media('<=tablet')} {
    padding: 7.5rem 2.5rem;
  }
`;

const CloseIconContainer = styled.div`
  position: absolute;
  right: 2rem;
  top: 2rem;

  svg {
    cursor: pointer;
    width: 2rem;
  }
`;

const Title = styled.div`
  font-size: 3.2rem;
  font-weight: bold;
  line-height: 1.1;
  letter-spacing: -0.03em;
  text-align: center;
  color: rgb(var(--text));

  ${media('<=tablet')} {
    font-size: 2.6rem;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 3rem;
`;

const CustomButton = styled(Button)`
  padding: 1.8rem;
  box-shadow: var(--shadow-lg);
`;

const CustomInput = styled(Input)`
  width: 100%;
`;
