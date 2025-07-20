import { Collection } from "discord.js";
import { Routes } from "discord-api-types/v9";
import { REST } from "@discordjs/rest";
import 'dotenv/config';
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

const commandsArray = [];

async function SlashCommands(client) {
  client.commands = new Collection();

  const basePath = path.join(process.cwd(), "SRC", "Commands", "Slash");
  const folders = fs.readdirSync(basePath);

  for (const folder of folders) {
    const folderPath = path.join(basePath, folder);
    const files = fs.readdirSync(folderPath).filter(file => file.endsWith(".js") || file.endsWith(".ts"));

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const commandModule = await import(pathToFileURL(filePath).href);
      const command = commandModule.default;

      if (!command?.data?.name) {
        console.warn(`[WARNING] Skipped ${file} (missing data.name)`);
        continue;
      }

      command.folder = folder;
      client.commands.set(command.data.name, command);
      commandsArray.push(command.data.toJSON());
    }
  }

  console.log('[ SYSTEM ] Slash Commands successfully loaded.');
}

export default async function loadCommands(client) {
  await SlashCommands(client);

  const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

  try {
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commandsArray }
    );
    console.log('[ SYSTEM ] Application commands reloaded successfully.');
  } catch (error) {
    console.error("[ERROR] Failed to reload application commands:", error);
  }
}