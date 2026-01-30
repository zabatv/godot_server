const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        // Отправляем сообщение всем клиентам
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('Server is running on port', process.env.PORT || 8080);
