import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, phone, email, service, message } = req.body;
  const referer = req.headers.referer || 'не указан';

  const text = `
Новая заявка с сайта florstroy.ru:
Имя: ${name}
Телефон: ${phone}
Email: ${email}
Услуга / объект: ${service}
Комментарий: ${message}
Источник: ${referer}
  `;

  try {
    // Отправка в Telegram
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text,
      }),
    });

    // Отправка на почту через SMTP
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
      from: `"Florstroy Заявка" <${process.env.SMTP_USER}>`,
      to: 'info@florstroy.ru',
      subject: 'Новая заявка с сайта florstroy.ru',
      text,
      html: `<pre>${text}</pre>`,
    });

    res.status(200).end();
  } catch (err) {
    console.error('Ошибка отправки:', err);
    res.status(500).json({ error: 'Ошибка отправки' });
  }
}
