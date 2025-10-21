import { useCart } from 'hooks/useCart';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function CartToast() {
  const { addedItem, setAddedItem } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (addedItem) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setAddedItem(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [addedItem]);

  if (!visible || !addedItem) return null;

  return (
    <Toast>
      ✅ Добавлено: <strong>{addedItem.title}</strong> ({addedItem.quantity} шт.)
    </Toast>
  );
}

const Toast = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: rgb(var(--primary));
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.6rem;
  font-size: 1.4rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  z-index: 9999;
`;
