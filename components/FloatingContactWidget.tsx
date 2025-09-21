import styled from 'styled-components';
import { FaInstagram, FaTelegramPlane, FaPhoneAlt, FaCommentDots } from 'react-icons/fa';
import { SiViber } from 'react-icons/si';

export default function FloatingContactWidget() {
  return (
    <WidgetWrapper>
      <IconLink href="https://instagram.com/florstroy" target="_blank" aria-label="Instagram">
        <FaInstagram />
      </IconLink>
      <IconLink href="viber://chat?number=+74956624994" target="_blank" aria-label="Viber">
        <SiViber />
      </IconLink>
      <IconLink href="https://t.me/florstroy" target="_blank" aria-label="Telegram">
        <FaTelegramPlane />
      </IconLink>
      <IconLink href="tel:+74956624994" aria-label="Позвонить">
        <FaPhoneAlt />
      </IconLink>
      <IconLink href="/contact" aria-label="Форма обратной связи">
        <FaCommentDots />
      </IconLink>
    </WidgetWrapper>
  );
}

const WidgetWrapper = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
    gap: 1rem;
  }
`;

const IconLink = styled.a`
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #222, #444);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background: linear-gradient(135deg, #ff5722, #ff9800);
  }

  @media (max-width: 768px) {
    width: 4rem;
    height: 4rem;
    font-size: 1.8rem;
  }
`;
