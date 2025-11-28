const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.once("ready", () => {
  console.log(`Bot conectado como: ${client.user.tag}`);

  const channel = client.channels.cache.get(process.env.VOICE_CHANNEL_ID);

  if (!channel) {
    console.error("❌ Canal no encontrado. Verifica VOICE_CHANNEL_ID en .env");
    return;
  }

  joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
    selfMute: false,
    selfDeaf: true
  });

  console.log("✔ Bot conectado al canal de voz y permanecerá ahí.");
});

client.login(process.env.TOKEN);
