import User from '../../../Models/test.js';

export default {
  name: 'testmongo',
  description: 'Test MongoDB connection and auto-create user if not found.',

  async execute(client, message, args) {
    try {
      const userId = message.author.id;
      const username = message.author.username;

      let user = await User.findOne({ userId });

      if (!user) {
        user = await User.create({
          userId,
          username,
          coins: 0
        });

        return message.reply(`🆕 User created!\n👤 ${username}\n💰 Coins: ${user.coins}`);
      }

      message.reply(`✅ Found user!\n👤 ${user.username}\n💰 Coins: ${user.coins}`);
    } catch (err) {
      console.error(err);
      message.reply('❌ Error accessing the database.');
    }
  }
};