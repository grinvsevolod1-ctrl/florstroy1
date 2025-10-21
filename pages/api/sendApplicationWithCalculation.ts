import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, contactMethod, contactValue, service, message, calculation } = req.body;
  const referer = req.headers.referer || 'не указан';

  const contactLabels: Record<string, string> = {
    Телефон: 'Телефон',
    Email: 'Email',
    Telegram: 'Telegram',
    WhatsApp: 'WhatsApp',
  };

  const contactLabel = contactLabels[contactMethod] || 'Контакт';

  const text = `
Новая заявка с сайта florstroy.ru:
Имя: ${name}
${contactLabel}: ${contactValue}
Услуга / объект: ${service}
Комментарий: ${message}
Источник: ${referer}

📐 Расчёт:
${calculation}
  `;

  try {
    console.log('Получены данные:', { name, contactMethod, contactValue, service, message, calculation });

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

    // Письмо тебе
    await transporter.sendMail({
      from: `"Florstroy Заявка" <${process.env.SMTP_USER}>`,
      to: 'info@florstroy.ru',
      subject: 'Новая заявка с сайта florstroy.ru',
      text,
      html: `<pre>${text}</pre>`,
    });

    // Автоответ клиенту (если это email)
    if (contactMethod === 'Email' && contactValue.includes('@')) {
      await transporter.sendMail({
        from: `"Florstroy" <${process.env.SMTP_USER}>`,
        to: contactValue,
        subject: 'Спасибо за вашу заявку!',
        text: `Здравствуйте, ${name}!

Спасибо за обращение в Florstroy. Мы получили вашу заявку и расчёт:

${calculation}

Наш менеджер свяжется с вами в ближайшее время.

С уважением, команда Florstroy.`,
        html: `<p>Здравствуйте, ${name}!</p>
<p>Спасибо за обращение в <strong>Florstroy</strong>. Мы получили вашу заявку и расчёт:</p>
<pre>${calculation}</pre>
<p>Наш менеджер свяжется с вами в ближайшее время.</p>
<p>С уважением,<br/>команда Florstroy</p>`,
      });
    }

    res.status(200).end();
  } catch (err) {
    console.error('Ошибка отправки:', err);
    res.status(500).json({ error: 'Ошибка отправки' });
  }
}
