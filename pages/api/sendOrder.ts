import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { cart, name, phone, comment } = req.body;
  const referer = req.headers.referer || 'не указан';

  if (!cart || !Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ error: 'Корзина пуста' });
  }

  const itemsText = cart
    .map((item, idx) => `${idx + 1}. ${item.title} — ${item.price} ₽ × ${item.quantity}`)
    .join('\n');

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const text = `
🛒 Новый заказ с сайта florstroy.ru:

👤 Имя: ${name}
📞 Контакт: ${phone}
💬 Комментарий: ${comment}
🌐 Источник: ${referer}

📦 Товары:
${itemsText}

💰 Итого: ${totalPrice} ₽
  `;

  try {
    console.log('Заказ получен:', { name, phone, comment, cart });

    // Telegram
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text,
      }),
    });

    // Email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Florstroy Заказ" <${process.env.SMTP_USER}>`,
      to: 'info@florstroy.ru',
      subject: 'Новый заказ с сайта florstroy.ru',
      text,
      html: `<pre>${text}</pre>`,
    });

    // Автоответ клиенту
    if (phone.includes('@')) {
      await transporter.sendMail({
        from: `"Florstroy" <${process.env.SMTP_USER}>`,
        to: phone,
        subject: 'Ваш заказ принят',
        text: `Здравствуйте, ${name}!\n\nМы получили ваш заказ на сумму ${totalPrice} ₽.\nМенеджер свяжется с вами в ближайшее время.`,
        html: `<p>Здравствуйте, ${name}!</p><p>Мы получили ваш заказ на сумму <strong>${totalPrice} ₽</strong>.</p><p>Менеджер свяжется с вами в ближайшее время.</p><p>С уважением,<br/>команда Florstroy</p>`
      });
    }

    res.status(200).end();
  } catch (err) {
    console.error('Ошибка отправки:', err);
    res.status(500).json({ error: 'Ошибка отправки' });
  }
}