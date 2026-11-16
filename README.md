# PagoQR

Aplicación web mobile-first para solicitar un cobro y abrir el enlace de pago de Deuna. Al enviar el formulario, el servidor avisa al dueño por Telegram. El enlace abre Deuna en otra pestaña o aplicación compatible; la app no procesa ni verifica el pago.

## Requisitos

Node.js 18 o superior, npm y conexión a internet para Telegram.

## Configurar Telegram

1. En Telegram, busca **@BotFather**, envía `/newbot` y sigue las instrucciones. Copia el token del bot; trátalo como una contraseña.
2. Abre una conversación con el bot nuevo y pulsa **Iniciar** o envíale `/start`.
3. Para encontrar el chat ID, abre `https://api.telegram.org/bot<TU_TOKEN>/getUpdates` sustituyendo el marcador por el token. Busca `message` → `chat` → `id`. Si no aparece, manda otro mensaje al bot y consulta de nuevo. No compartas esa URL: contiene el token.
4. Copia `.env.example` como `.env` en esta carpeta y completa `TELEGRAM_BOT_TOKEN` y `TELEGRAM_CHAT_ID`.

El token que se compartió en el chat debe considerarse expuesto: revócalo y genera uno nuevo con `/revoke` en BotFather antes de poner el nuevo token en `.env`. `.env` está excluido de Git.

## Instalar y ejecutar

Desde esta carpeta:

```sh
npm install
npm start
```

Abre `http://localhost:3000`. El cliente ingresa el monto y un detalle opcional. El dueño recibe **💸 Nuevo cobro solicitado**, el monto y el detalle. Después aparece el enlace **Abrir Deuna para pagar**.

Para probar desde un celular conectado a la misma red Wi-Fi, abre `http://IP-LOCAL-DE-TU-COMPUTADORA:3000`. Para uso público, despliega el servidor detrás de HTTPS y genera el QR fijo del mostrador apuntando a la URL pública de la aplicación.

## Endpoint

- `POST /api/payment-requests`: valida el monto y envía el mensaje al chat configurado.

El enlace Deuna está configurado en `public/index.html`. Los datos no se guardan en una base de datos. La confirmación del pago debe verificarse en Deuna.
