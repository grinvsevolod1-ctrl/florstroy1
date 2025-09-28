import styled from 'styled-components';
import { useCart } from 'hooks/useCart';
import { equipmentItems } from 'data/equipment';
import { motion } from 'framer-motion';

export default function EquipmentGrid() {
  const { addToCart } = useCart();

  return (
    <Grid>
      {equipmentItems.map((item) => (
        <Card
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Image src={item.image} alt={item.title} />
          <Title>{item.title}</Title>
          <Price>{item.price} ₽</Price>
          <Button onClick={() => addToCart(item)}>Добавить в корзину</Button>
        </Card>
      ))}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;

const Card = styled(motion.div)`
  background: rgb(var(--background));
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
`;

const Price = styled.div`
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
`;

const Button = styled.button`
  background: rgb(var(--primary));
  color: white;
  border: none;
  padding: 0.8rem 1.2rem;
  font-size: 1.2rem;
  border-radius: 0.4rem;
  cursor: pointer;

  &:hover {
    background: rgb(var(--primary), 0.85);
  }
`;