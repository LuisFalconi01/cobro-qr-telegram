# Acceso desde celulares en la misma red

1. Conecta la computadora y los celulares a la misma red Wi-Fi.
2. En la computadora, desde esta carpeta ejecuta `npm start` y deja esa ventana abierta.
3. En Windows, abre PowerShell y ejecuta `ipconfig`. Busca la dirección **IPv4** del adaptador Wi-Fi (por ejemplo, `192.168.1.25`).
4. En el navegador del celular abre `http://IP-IPv4:3000`, reemplazando el ejemplo por la IP real (por ejemplo, `http://192.168.1.25:3000`).

Si Windows pregunta si Node.js puede aceptar conexiones en redes privadas, permite el acceso para la red privada. No selecciones redes públicas. La computadora debe permanecer encendida y el servidor activo. El router puede impedir la comunicación entre dispositivos si tiene activado aislamiento de clientes.
