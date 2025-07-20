import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

export default async function loadEvents(client) {
  const basePath = path.join(process.cwd(), 'SRC', 'Events');
  const folders = fs.readdirSync(basePath);

  for (const folder of folders) {
    const folderPath = path.join(basePath, folder);
    const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.js') || file.endsWith('.ts'));

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const eventModule = await import(pathToFileURL(filePath).href);
      const event = eventModule.default;

      if (!event || !event.name || !event.execute) {
        console.warn(`[WARNING] Skipping invalid event file: ${file}`);
        continue;
      }

      if (event.once) {
        client.once(event.name, (...args) => {
          event.execute(...args, client);
        });
      } else {
        client.on(event.name, (...args) => {
          event.execute(...args, client);
        });
      }
    }
  }

  console.log('[ SYSTEM ] Events were successfully loaded.');
}
