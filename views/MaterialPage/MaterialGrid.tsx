import styled from 'styled-components';
import { useCart } from 'hooks/useCart';
import { useState } from 'react';

const materials = [
  {
    id: 'top-001',
    title: 'Топпинг упрочняющий',
    description: 'Для промышленных полов, высокая износостойкость.',
    price: 1200,
    image: '/materials/topping.jpg',
  },
  {
    id: 'epoxy-002',
    title: 'Эпоксидный состав',
    description: 'Двухкомпонентный, влагостойкий, для финишной отделки.',
    price: 1800,
    image: '/materials/epoxy.jpg',
  },
  {
    id: 'hydro-003',
    title: 'Гидроизоляция',
    description: 'Проникающая, подходит для подвалов и фундаментов.',
    price: 950,
    image: '/materials/hydro.jpg',
  },
];

export default function MaterialGrid() {
  const { addToCart } = useCart();
  const [animateId, setAnimateId] = useState<string | null>(null);

  function handleAdd(item: YourItemType) {
    addToCart(item);
    setAnimateId(item.id);
    setTimeout(() => setAnimateId(null), 300);
  }

  return (
    <Grid>
      {materials.map((item) => (
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