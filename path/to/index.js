const { Client } = require('discord.js-selfbot-v13');
const readlineSync = require('readline-sync');
const colors = require('colors');

// Clear the terminal and print the welcome message
console.clear();
console.log(colors.bold(colors.magenta('————————————————————————————————————————————————————')));
console.log(colors.bold(colors.magenta('                   ZRCS RPC SETUP!                   ')));
console.log(colors.bold(colors.magenta('————————————————————————————————————————————————————')));
console.log(colors.green('Welcome to Discord RPC Setup!'));

// Ask for Discord token
const token = readlineSync.question(colors.yellow('Enter your Discord Token: '));

// Initialize the Discord client
const client = new Client();

client.on('ready', () => {
    console.log(colors.green(`Logged in as ${client.user.tag}!`));

    // Ask for presence type
    const presenceTypes = ['PLAYING', 'WATCHING', 'LISTENING', 'STREAMING'];
    const presenceTypeIndex = readlineSync.keyInSelect(presenceTypes, colors.cyan('Choose your presence type:'));
    if (presenceTypeIndex === -1) {
        console.log(colors.red('No presence type selected, exiting.'));
        process.exit();
    }
    const presenceType = presenceTypes[presenceTypeIndex];

    // Ask for presence details
    const details = readlineSync.question(colors.cyan('Enter the top message (Details): '));
    const state = readlineSync.question(colors.cyan('Enter the middle message (State): '));
    const largeImageKey = readlineSync.question(colors.cyan('Enter the image name for large image (e.g., image.png): '));
    const largeImageText = readlineSync.question(colors.cyan('Enter the text for large image: '));

    let smallImageKey = '';
    let smallImageText = '';
    if (readlineSync.keyInYN(colors.cyan('Do you want to set a small image?'))) {
        smallImageKey = readlineSync.question(colors.cyan('Enter the image name for small image (e.g., image.png): '));
        smallImageText = readlineSync.question(colors.cyan('Enter the text for small image: '));
    }

    // Ask for buttons
    let buttons = [];
    if (readlineSync.keyInYN(colors.cyan('Do you want to add buttons?'))) {
        do {
            const buttonLabel = readlineSync.question(colors.cyan('Enter button name: '));
            const buttonUrl = readlineSync.question(colors.cyan('Enter button URL: '));
            buttons.push({ label: buttonLabel, url: buttonUrl });
        } while (readlineSync.keyInYN(colors.cyan('Do you want to add another button?')));
    }

    // Ask for elapsed time
    let startTimestamp = null;
    if (readlineSync.keyInYN(colors.cyan('Do you want to set elapsed time?'))) {
        startTimestamp = new Date();
    }

    // Default streaming URL
    const defaultStreamingUrl = 'https://www.twitch.tv/default';

    // Set the presence
    client.user.setPresence({
        activities: [{
            name: details,
            type: presenceType,
            state: state,
            details: details,
            timestamps: startTimestamp ? { start: startTimestamp } : undefined,
            assets: {
                large_image: largeImageKey,
                large_text: largeImageText,
                small_image: smallImageKey,
                small_text: smallImageText,
            },
            buttons: buttons,
            url: presenceType === 'STREAMING' ? defaultStreamingUrl : undefined
        }]
    });

    console.log(colors.green('Presence set successfully!'));
});

// Log in to Discord
client.login(token).catch(console.error);
