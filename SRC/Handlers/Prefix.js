import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { Collection } from "discord.js";

export default async function loadPrefix(client) {
  const basePath = path.join(process.cwd(), "SRC", "Commands", "Prefix");
  const folders = fs.readdirSync(basePath);
  client.prefix = new Collection();

  for (const folder of folders) {
    const folderPath = path.join(basePath, folder);
    const files = fs.readdirSync(folderPath).filter(file => file.endsWith(".js") || file.endsWith(".ts"));

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const commandModule = await import(pathToFileURL(filePath).href);
      const command = commandModule.default;

      if (!command?.name) {
        console.warn(`[WARNING] Skipped ${file} (missing command.name)`);
        continue;
      }

      const properties = { folder, command };
      client.prefix.set(command.name, properties);
    }
  }

  console.log('[ SYSTEM ] Prefix commands were successfully loaded.');
}