import styled from 'styled-components';
import { useCartContext } from 'context/CartContext';
import { useState } from 'react';

type EquipmentItem = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
};

const equipment: EquipmentItem[] = [
  {
    id: 'machine-001',
    title: 'Затирочная машина',
    description: 'Для финишной обработки бетонных полов, высокая производительность.',
    price: 45000,
    image: '/equipment/trowel.jpg',
  },
  {
    id: 'vacuum-002',
    title: 'Промышленный пылесос',
    description: 'Мощный, подходит для строительной пыли и жидкостей.',
    price: 32000,
    image: '/equipment/vacuum.jpg',
  },
  {
    id: 'laser-003',
    title: 'Лазерный нивелир',
    description: 'Точная разметка уровней, дальность до 30 м.',
    price: 8500,
    image: '/equipment/laser.jpg',
  },
];

export default function EquipmentGrid() {
  const { addToCart } = useCartContext();
  const [animateId, setAnimateId] = useState<string | null>(null);

  function handleAdd(item: EquipmentItem) {
    addToCart(item);
    setAnimateId(item.id);
    setTimeout(() => setAnimateId(null), 300);
  }

  return (
    <Grid>
      {equipment.map((item) => (
        <Card key={item.id}>
          <Image src={item.image} alt={item.title} />
          <Title>{item.title}</Title>
          <Description>{item.description}</Description>
          <Price>{item.price} ₽</Price>
          <OrderButton animate={animateId === item.id} onClick={() => handleAdd(item)}>
            ➕ В корзину
          </OrderButton>
        </Card>
      ))}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
`;

const Card = styled.div`
  background: rgb(var(--background));
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  height: 18rem;
  object-fit: cover;
  border-radius: 0.8rem;
`;

const Title = styled.h3`
  font-size: 2rem;
  margin-top: 1.5rem;
`;

const Description = styled.p`
  font-size: 1.4rem;
  color: rgb(var(--text), 0.7);
`;

const Price = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  margin: 1rem 0;
`;

const OrderButton = styled.button<{ animate?: boolean }>`
  background: rgb(var(--primary));
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.4rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.3s;

  ${({ animate }) => animate && 'transform: scale(1.1);'}
`;