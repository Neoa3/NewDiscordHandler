import { Events, Client } from "discord.js";
import 'dotenv/config';

export default {
  name: Events.ClientReady,
  once: true,

  /**
   * 
   * @param {Client} client 
   * @returns 
   */

  async execute(client) {
    console.log(`✅ Bot is online as ${client.user.tag}`);
    console.log("🎉 Thank you for using NewDiscordHandler — built with ❤️ by Neo");

    client.user.setPresence({
      activities: [{ name: 'Status...', type: 5 }],
      status: 'idle'
    });

  }
};
