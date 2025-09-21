import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { FaInstagram, FaTelegramPlane, FaPhoneAlt, FaCommentDots } from 'react-icons/fa';
import { SiViber } from 'react-icons/si';

type ContactItem = {
  href: string;
  title: string;
  icon: IconType;
};

const contactItems: ContactItem[] = [
  { href: 'https://instagram.com/florstroy', title: 'Instagram', icon: FaInstagram },
  { href: 'viber://chat?number=+74956624994', title: 'Viber', icon: SiViber },
  { href: 'https://t.me/florstroy', title: 'Telegram', icon: FaTelegramPlane },
  { href: 'tel:+74956624994', title: 'Позвонить: +7 495 662 49 94', icon: FaPhoneAlt },
  { href: '/contact', title: 'Форма обратной связи', icon: FaCommentDots },
];

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
      {contactItems.map(({ href, title, icon: Icon }) => (
        <IconLink key={title} href={href} target="_blank" title={title}>
          <Icon />
        </IconLink>
      ))}
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
