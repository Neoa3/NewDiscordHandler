import { Events } from "discord.js";

export default {
  name: Events.InteractionCreate,

  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (err) {
        console.error(err);
        if (!interaction.replied && !interaction.deferred) {
          await interaction.reply({
            content: '❌ | An error occurred while executing this command.',
            ephemeral: true
          });
        }
      }
    }
  }
};