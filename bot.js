const { Telegraf } = require("telegraf");
const bot = new Telegraf("7727607417:AAGRkbmn4QcTg4HhadIDoJp0Z9LHw0Y9UmM");

bot.start((ctx) => {
  ctx.reply("👋 Assalomu alaykum!\n🌐 Bizning sayt: https://xt-web-ivory.vercel.app/\nℹ️ Bot Admini: https://t.me/ItsNoWonder");
});

bot.command("admin", (ctx) => {
  ctx.reply("Bot administrator bilan bog‘lanish: https://t.me/ItsNoWonder");
});

bot.command("help", (ctx) => {
  ctx.reply("Sizda parol bo‘lmasa, bot ishlamaydi");
});

bot.launch();
