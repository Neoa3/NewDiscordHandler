# Neo Discord Handler

A modern, feature-rich Discord bot handler built with Discord.js v14, featuring both slash commands and prefix commands with a robust architecture designed for scalability and maintainability.

## 🚀 Features

- **Dual Command System**: Support for both slash commands and prefix commands
- **Modular Architecture**: Clean separation of concerns with dedicated handlers
- **Sharding Support**: Built-in sharding manager for handling large bot instances
- **Anti-Crash System**: Comprehensive error handling and monitoring
- **Event-Driven**: Fully event-driven architecture
- **ES6 Modules**: Modern JavaScript with ES6 module syntax
- **Environment Configuration**: Secure configuration management with dotenv

## 📁 Project Structure

```
discord_handler_noonserv/
├── package.json                 # Project dependencies and scripts
├── Sharding.js                  # Sharding manager for large bot instances
├── SRC/                         # Main source code directory
│   ├── bot.js                   # Main bot entry point
│   ├── Core/
│   │   └── Client.js            # Client monitoring and health checks
│   ├── Handlers/
│   │   ├── AntiCrash.js         # Error handling and crash prevention
│   │   ├── Commands.js          # Slash command loader and registration
│   │   ├── Events.js            # Event handler loader
│   │   └── Prefix.js            # Prefix command loader
│   ├── Events/
│   │   ├── Client/
│   │   │   └── Ready.js         # Bot ready event handler
│   │   ├── interactionCreate/
│   │   │   └── interactionCreate.js  # Slash command interaction handler
│   │   └── MessageCreate/
│   │       └── messageCreate.js # Prefix command message handler
│   └── Commands/
│       ├── Slash/               # Slash command categories
│       │   └── fun/
│       │       └── ping.js      # Example slash command
│       └── Prefix/              # Prefix command categories
│           └── fun/
│               └── ping.js      # Example prefix command
```

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Neoa3/NewDiscordHandler.git
   cd NewDiscordHandler
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Discord Bot Configuration
   TOKEN=your_discord_bot_token_here
   CLIENT_ID=your_bot_client_id_here

   # Bot Owner Configuration
   OWNER_IDS=owner_id1,owner_id2,owner_id3

   # Error Monitoring
   ERROR_WEBHOOK_URL=your_discord_webhook_url_here

   # Optional: Additional Configuration
   # BOT_PREFIX=$
   ```

   ### How to Get These Values:

   **TOKEN** (Required):
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Create a new application or select existing one
   - Go to "Bot" section
   - Click "Reset Token" to get your bot token

   **CLIENT_ID** (Required):
   - In Discord Developer Portal, go to "General Information"
   - Copy the "Application ID"

   **OWNER_IDS** (Required):
   - Enable Developer Mode in Discord settings
   - Right-click your username and select "Copy ID"
   - Use comma-separated values for multiple owners

   **ERROR_WEBHOOK_URL** (Optional but Recommended):
   - Create a Discord webhook in your server
   - Go to Server Settings → Integrations → Webhooks
   - Create a new webhook and copy the URL

   ⚠️ **Security Note**: Never commit your `.env` file to version control!

4. **Run the bot**
   ```bash
   # For normal operation
   npm start
   
   # For sharding (recommended for large bots)
   npm run Shard
   ```

## 📋 Dependencies

- **discord.js**: ^14.11.0 - Discord API wrapper
- **@discordjs/rest**: ^2.5.1 - REST API client
- **discord-api-types**: ^0.38.14 - TypeScript definitions
- **dotenv**: ^16.3.1 - Environment variable management
- **axios**: ^1.10.0 - HTTP client for webhooks
- **node-fetch**: ^3.3.2 - Fetch API for Node.js

## 🏗️ Architecture Overview

### Core Components

#### 1. **Main Bot Entry (`SRC/bot.js`)**
- Initializes the Discord client with all intents and partials
- Loads all handlers in sequence
- Handles bot authentication

#### 2. **Command Handlers**

**Slash Commands (`SRC/Handlers/Commands.js`)**
- Automatically discovers and loads slash commands from the `SRC/Commands/Slash/` directory
- Registers commands with Discord's API
- Organizes commands by categories (folders)

**Prefix Commands (`SRC/Handlers/Prefix.js`)**
- Loads prefix commands from `SRC/Commands/Prefix/` directory
- Supports command aliases
- Uses `$` as the default prefix

#### 3. **Event Handler (`SRC/Handlers/Events.js`)**
- Dynamically loads all event files from the `SRC/Events/` directory
- Supports both `once` and `on` event listeners
- Automatically passes client instance to event handlers

#### 4. **Anti-Crash System (`SRC/Handlers/AntiCrash.js`)**
- Monitors for unhandled rejections and exceptions
- Sends error reports to Discord webhook
- Provides detailed error logging with timestamps
- Includes error type classification and status tracking

### Event System

#### **Ready Event (`SRC/Events/Client/Ready.js`)**
- Sets bot presence and status
- Confirms successful bot login
- Configurable activity display

#### **Interaction Handler (`SRC/Events/interactionCreate/interactionCreate.js`)**
- Processes slash command interactions
- Includes error handling with user-friendly messages
- Supports ephemeral responses

#### **Message Handler (`SRC/Events/MessageCreate/messageCreate.js`)**
- Processes prefix commands
- Validates bot permissions
- Owner-only command support
- Automatic message cleanup for invalid usage

### Client Monitoring (`SRC/Core/Client.js`)
- Periodic client health checks
- Login status monitoring
- System status reporting

## 🚀 Sharding Support

The project includes a dedicated sharding manager (`Sharding.js`) that:
- Automatically determines optimal shard count
- Handles shard lifecycle events (create, disconnect, death)
- Provides automatic shard respawning
- Includes comprehensive logging for shard management

## 📝 Command Development

### Creating Slash Commands

Create new slash commands in `SRC/Commands/Slash/[category]/[command].js`:

```javascript
import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('commandname')
    .setDescription('Command description'),

  async execute(interaction) {
    // Command logic here
    await interaction.reply('Response');
  }
};
```

### Creating Prefix Commands

Create new prefix commands in `SRC/Commands/Prefix/[category]/[command].js`:

```javascript
export default {
  name: 'commandname',
  description: 'Command description',
  aliases: ['alias1', 'alias2'], // Optional
  execute(client, message, args) {
    // Command logic here
    message.reply('Response');
  }
};
```

## 🔒 Security Features

- **Environment Variables**: Sensitive data stored in `.env` file
- **Permission Validation**: Bot checks for required permissions
- **Owner Verification**: Support for multiple bot owners
- **Error Isolation**: Comprehensive error handling prevents crashes

## 📊 Monitoring and Logging

- **Console Logging**: Color-coded system messages
- **Error Webhooks**: Real-time error reporting to Discord
- **Client Health Checks**: Periodic status monitoring
- **Shard Management**: Detailed shard lifecycle tracking

## 🛠️ Customization

### Environment Variables
- `PREFIX`: Command Prefix
- `TOKEN`: Discord bot token
- `CLIENT_ID`: Bot application ID
- `OWNER_IDS`: Comma-separated list of owner user IDs
- `ERROR_WEBHOOK_URL`: Discord webhook URL for error reporting

### Configuration Options
- **Presence**: Modify bot status in `Ready.js`
- **Permissions**: Adjust required permissions in event handlers
- **Logging**: Customize log formats and colors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull 

## 📦 Update v1.1.0

1. 😁 Detect and resolve all errors.
2. ✅ Added automatic MongoDB connection using `MONGO_URI`
3. 📂 Models are now auto-loaded from the `SRC/Models/` folder on startup
4. 🛠️ Collections are created automatically if not found
5. 🚫 Improved error handling for missing or invalid DB connections

## 🔄 Updates

Stay updated with the latest Discord.js features and security patches by regularly updating dependencies:

```bash
npm update
```

## 🆘 Support

If you need help setting up or using the bot, feel free to reach out:

- 📩 **Communication via email**: [neo@noonserv.com](mailto:neo@noonserv.com) 
- 💬 **Discord Support Server**: [Join Here](https://discord.gg/wG3acZWPBv)
- 📧 **Contact the developer**: [neo.x8](https://discord.com/users/1316110658257031300)

---

**Neo Discord Handler** - A modern, scalable Discord bot framework built for the future. 