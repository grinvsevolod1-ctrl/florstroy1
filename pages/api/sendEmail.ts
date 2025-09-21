import { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function SendEmail(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, phone, email, service, message } = req.body;
  const referer = req.headers.referer;

  const htmlContent = `
    <div style="font-family: sans-serif; font-size: 16px;">
      <h2>Новая заявка с сайта florstroy.ru</h2>
      <p><strong>Имя:</strong> ${name}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Услуга / объект:</strong> ${service}</p>
      <p><strong>Комментарий:</strong><br/>${message}</p>
      <hr/>
      <p>Источник: ${referer || 'не указан'}</p>
    </div>
  `;

  const textContent = `
Новая заявка с сайта florstroy.ru:
Имя: ${name}
Телефон: ${phone}
Email: ${email}
Услуга / объект: ${service}
Комментарий: ${message}
Источник: ${referer || 'не указан'}
  `;

  try {
    // Отправка на почту
    await sgMail.send({
      to: ['info@florstroy.ru'],
      from: 'info@florstroy.ru',
      subject: 'Новая заявка с сайта florstroy.ru',
      text: textContent,
      html: htmlContent,
    });

    // Отправка в Telegram
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: textContent,
      }),
    });

    res.status(204).end();
  } catch (error) {
    console.error('ERROR', error);
    res.status(400).send({ message: 'Ошибка отправки' });
  }
}
