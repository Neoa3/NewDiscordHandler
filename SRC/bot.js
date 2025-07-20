import { Client, GatewayIntentBits, Partials } from "discord.js";
import dotenv from 'dotenv';

// Handlers

import loadCommands from "./Handlers/Commands.js";
import loadEvents from "./Handlers/Events.js";
import loadPrefix from "./Handlers/Prefix.js";

// Load .env
dotenv.config();

// Clear console
console.clear();

// Discord client
const client = new Client({
  intents: Object.values(GatewayIntentBits),
  partials: Object.values(Partials),
});

// Bot login

(async () => {
  await loadCommands(client);
  await loadEvents(client);
  await loadPrefix(client);
  await loadLogs(client);
  await client.login(process.env.TOKEN);
})();