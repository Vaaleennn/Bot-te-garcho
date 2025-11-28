const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {
  console.log(`Bot conectado como: ${client.user.tag}`);

  // AUTO-CONEXIÓN SI HAY UNA VARIABLE SETEADA
  if (process.env.VOICE_CHANNEL_ID) {
    const channel = client.channels.cache.get(process.env.VOICE_CHANNEL_ID);

    if (channel) {
      joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
        selfMute: false,
        selfDeaf: true
      });

      console.log(`Auto-conectado al canal: ${channel.name}`);
    }
  }
});

// COMANDO !unite
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === "!unite") {
    const channel = message.member.voice.channel;

    if (!channel) {
      return message.reply("⚠️ Debes estar en un canal de voz para usar este comando.");
    }

    try {
      joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
        selfMute: false,
        selfDeaf: true
      });

      message.reply(`✅ Me he unido al canal: **${channel.name}**`);
    } catch (error) {
      console.error(error);
      message.reply("❌ No pude unirme al canal.");
    }
  }
});

client.login(process.env.TOKEN);
