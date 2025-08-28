import { ShardingManager } from 'discord.js';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import 'colors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const manager = new ShardingManager(path.join(__dirname, './SRC/bot.js'), {
    token: process.env.TOKEN,
    totalShards: 'auto',
    respawn: true,
});

manager.on('shardCreate', (shard) => {
    console.log(`[${new Date().toString().split(' ', 5).join(' ')}] Launched Shard #${shard.id}`.bold.green);
});

manager.on('disconnect', (shard) => {
    console.log(`[${new Date().toString().split(' ', 5).join(' ')}] Disconnected Shard #${shard.id}`.bold.red);
});

manager.on('death', (shard) => {
    console.warn(`Shard #${shard.id} died. Respawning...`.bold.yellow);
});

manager.spawn(manager.totalShards, 10000, 5000);
