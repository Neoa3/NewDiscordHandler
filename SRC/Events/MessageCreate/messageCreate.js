import { Events, PermissionFlagsBits } from "discord.js";

export default {
  name: Events.MessageCreate,

  async execute(message, client) {
    const ownerIds = process.env.OWNER_IDS?.split(',') || [];

    if (message.author?.bot) return;
    if (!message.guild) {
      return message.channel.send("❌ | Prefix commands only work in servers.")
        .then(msg => setTimeout(() => msg.delete().catch(() => { }), 3000));
    }

    const prefix = process.env.BOT_PREFIX || '$';

    // 📦 Prefix Commands
    if (message.content.startsWith(prefix)) {
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();
      const commandData = client.prefix.get(commandName) || client.prefix.find(cmd => cmd.command.aliases?.includes(commandName));

      if (commandData) {
        const command = commandData.command;
        if (!message.guild.members.me.permissions.has(PermissionFlagsBits.Administrator)) {
          return message.reply('❌ Bot needs administrator permissions.');
        }

        try {
          await command.execute(client, message, args);
        } catch (error) {
          console.error(error);
          return message.reply('❌ An error occurred while executing this command.');
        }
        return;
      }
    }

  }
};
