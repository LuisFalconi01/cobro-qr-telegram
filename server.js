const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const port = Number(process.env.PORT) || 3000;
const publicDir = path.join(__dirname, 'public');
app.use(express.json({ limit: '10kb' }));
app.use(express.static(publicDir));

app.post('/api/payment-requests', async (req, res) => {
  const amount = Number(req.body?.amount);
  const detail = typeof req.body?.detail === 'string' ? req.body.detail.trim().slice(0, 200) : '';
  if (!Number.isFinite(amount) || amount <= 0 || amount > 1000000) {
    return res.status(400).json({ error: 'Ingresa un monto válido.' });
  }
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return res.status(503).json({ error: 'El comercio aún no configuró las notificaciones.' });
  }
  const message = `💸 Nuevo cobro solicitado\nMonto: $${amount.toFixed(2)}${detail ? `\nDetalle: ${detail}` : ''}`;
  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message }), signal: AbortSignal.timeout(10000)
    });
    const result = await response.json();
    if (!response.ok || !result.ok) throw new Error('Telegram rechazó la notificación');
    return res.json({ ok: true });
  } catch (error) {
    console.error('No se pudo notificar a Telegram:', error.message);
    return res.status(502).json({ error: 'No se pudo avisar al comercio. Inténtalo nuevamente.' });
  }
});

app.listen(port, '0.0.0.0', () => console.log(`PagoQR disponible en http://localhost:${port} y en la red local por la IP de este equipo`));


