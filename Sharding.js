import { ShardingManager } from 'discord.js';
import path from 'path';
import 'dotenv/config';
import "colors"

const manager = new ShardingManager(path.join(__dirname, '/SRC/bot.js'), {
    token: process.env.TOKEN,
    totalShards: 'auto',
    respawn: true,
});

manager.on("shardCreate", async (shard) => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Launched Shard #${shard.id}`.bold.green)
})

manager.on("disconnect", async (shard) => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Disconnected Shard #${shard.id}`.bold.red)
})

manager.on("death", async (shard) => {
    manager.spawn(manager.totalShards, 10000);
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Killed Shard #${shard.id}`.bold.red)
})

manager.spawn(shards.totalShards , 10000);