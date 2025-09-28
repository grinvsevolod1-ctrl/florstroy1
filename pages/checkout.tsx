
import { useCart } from 'hooks/useCart';
import styled from 'styled-components';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');

    await fetch('/api/sendOrder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart, name, phone, comment }),
    });

    setStatus('sent');
    clearCart();
  }

  return (
    <Wrapper>
      <h1>Оформление заказа</h1>
      {cart.length === 0 ? (
        <p>Корзина пуста.</p>
      ) : (
        <>
          <CartList>
            {cart.map((item) => (
              <CartItem key={item.id}>
                <strong>{item.title}</strong> — {item.price} ₽ ×
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  min={1}
                />
                <RemoveButton onClick={() => removeFromCart(item.id)}>✖</RemoveButton>
              </CartItem>
            ))}
          </CartList>
          <Total>Итого: {totalPrice} ₽</Total>
          <Form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Телефон"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <textarea
              placeholder="Комментарий"
              value={comment}
              on