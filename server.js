const express = require('express');
const bodyParser = require('body-parser');
const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;

const discordBotToken = 'OTU0MzQ1MTAzMjk4ODA5OTQ2.GF_gL_.cqOKgCVPI0XtrDxJgscQc02-GEytMacPKniSzU'; // Replace with your Discord bot token
const channelId = '1265847349717241900'; // Replace with your Discord channel ID
const prefix = '<@953977857506430976>';

app.use(bodyParser.json());
app.use(express.static('public'));

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('messageCreate', async (message) => {
    if (!message.author.bot) {
        io.emit('receive-message', message.content);
    }
});

client.login(discordBotToken);

// Endpoint to receive messages from the website and send to Discord
app.post('/send-message', async (req, res) => {
    const message = req.body.message;
    try {
        const channel = await client.channels.fetch(channelId);
        await channel.send(`${prefix} ${message}`);
        res.status(200).send('Message sent to Discord');
    } catch (error) {
        console.error('Error sending message to Discord:', error);
        res.status(500).send('Error sending message to Discord');
    }
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
