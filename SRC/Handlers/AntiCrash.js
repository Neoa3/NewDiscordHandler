import axios from "axios";
import 'dotenv/config';

function antiCrash(client) {
    console.log('[' + ' SYSTEM ' + '] ' + ' Anti Crash System is now active.');
    console.log("🎉 Thank you for using NewDiscordHandler — built with ❤️ by Neo");

    const webhookUrlErrors = process.env.ERROR_WEBHOOK_URL;

    function removeColors(text) {
        return text.replace(/\x1b\[[0-9;]*m/g, '');
    }

    async function sendWebhook(webhookUrl, embed) {
        try {
            await axios.post(webhookUrl, {
                embeds: [embed]
            }, {
                timeout: 10000
            });
        } catch (error) {
            null
        }
    }
    

    async function sendErrorToWebhook(errorType, errorDetails) {
        const embed = {
            color: 0xFF0000,
            title: `🚨 ${errorType} Detected`,
            description: `\`\`\`js\n${removeColors(errorDetails)}\n\`\`\``,
            timestamp: new Date(),
            footer: {
                text: 'Anti-Crash System | Error Monitoring',
                icon_url: client.user.displayAvatarURL()
            },
            fields: [
                { name: "Error Type", value: `\`${errorType}\``, inline: true },
                { name: "Status", value: "⚠️ Detected", inline: true },
            ],
        };

        sendWebhook(webhookUrlErrors, embed);
    }

    process.on("unhandledRejection", (reason) => {
        sendErrorToWebhook("Unhandled Rejection", reason.stack || reason);
    });

    process.on("rejectionHandled", () => {
        sendErrorToWebhook("Handled Rejection", "A promise was rejected but eventually handled.");
    });

    process.on("uncaughtException", (error) => {
        sendErrorToWebhook("Uncaught Exception", error.stack);
    });

    process.on("uncaughtExceptionMonitor", (error) => {
        sendErrorToWebhook("Uncaught Exception Monitor", error.stack);
    });

    const originalConsoleError = console.error;
    console.error = function (...args) {
        originalConsoleError.apply(console, args);
        sendErrorToWebhook("Console Error", args.map(arg => (arg instanceof Error ? arg.stack : arg)).join(' '));
    };
}

export default antiCrash;