document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.querySelector('.send-button');
    const messageInput = document.querySelector('.input-area input');
    const messagesContainer = document.querySelector('.messages');

    const socket = io();

    sendButton.addEventListener('click', () => {
        const messageText = messageInput.value.trim();
        if (messageText) {
            sendMessageToServer(messageText);
            displayMessage(messageText, 'sent');
            messageInput.value = '';
        }
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const messageText = messageInput.value.trim();
            if (messageText) {
                sendMessageToServer(messageText);
                displayMessage(messageText, 'sent');
                messageInput.value = '';
            }
        }
    });

    function sendMessageToServer(message) {
        fetch('/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        }).then(response => {
            if (!response.ok) {
                console.error('Error sending message to server');
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    }

    function displayMessage(message, type) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', type);
        messageElement.innerHTML = `<p>${message}</p><span class="timestamp">${new Date().toLocaleTimeString()}</span>`;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    socket.on('receive-message', (message) => {
        displayMessage(message, 'received');
    });
});
