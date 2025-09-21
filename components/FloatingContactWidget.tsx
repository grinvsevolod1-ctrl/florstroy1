import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import { FaInstagram, FaTelegramPlane, FaPhoneAlt, FaCommentDots } from 'react-icons/fa';
import { SiViber } from 'react-icons/si';

export default function FloatingContactWidget() {
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hovered) setVisible(false);
    }, 15000);
    return () => clearTimeout(timer);
  }, [hovered]);

  if (!visible) return null;

  return (
    <WidgetWrapper onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <IconLink href="https://instagram.com/florstroy" target="_blank" title="Instagram">
        <FaInstagram />
      </IconLink>
      <IconLink href="viber://chat?number=+74956624994" target="_blank" title="Viber">
        <SiViber />
      </IconLink>
      <IconLink href="https://t.me/florstroy" target="_blank" title="Telegram">
        <FaTelegramPlane />
      </IconLink>
      <IconLink href="tel:+74956624994" title="Позвонить: +7 495 662 49 94">
        <FaPhoneAlt />
      </IconLink>
      <IconLink href="/contact" title="Форма обратной связи">
        <FaCommentDots />
      </IconLink>
    </WidgetWrapper>
  );
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(2rem); }
  to { opacity: 1; transform: translateY(0); }
`;

const WidgetWrapper = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  animation: ${fadeIn} 0.6s ease-out;

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
  background: linear-gradient(135deg, #1e1e1e, #3a3a3a);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;

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
