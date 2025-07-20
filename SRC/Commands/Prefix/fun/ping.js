export default {
  name: 'ping',
  description: 'Replies with pong.',
  execute(client, message, args) {
    message.reply('Pong!');
  }
};
