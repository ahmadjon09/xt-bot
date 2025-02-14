require("dotenv").config();
const { Telegraf } = require("telegraf");

const BOT_TOKEN = "7727607417:AAGRkbmn4QcTg4HhadIDoJp0Z9LHw0Y9UmM";
const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  try {
    ctx.reply("👋 Assalomu alaykum!\n🌐 Bizning sayt: https://xt-web-ten.vercel.app/\nℹ️ Bot Admini: https://t.me/ItsNoWonder");
  } catch (error) {
    console.error("❌ start buyrug‘ida xatolik:", error);
  }
});

bot.command("admin", (ctx) => {
  try {
    ctx.reply("Bot administrator bilan bog‘lanish: https://t.me/ItsNoWonder");
  } catch (error) {
    console.error("❌ admin buyrug‘ida xatolik:", error);
  }
});

bot.command("help", (ctx) => {
  try {
    ctx.reply("Sizda parol bo‘lmasa, bot ishlamaydi");
  } catch (error) {
    console.error("❌ help buyrug‘ida xatolik:", error);
  }
});

// **Ping orqali botni jonli saqlash (UptimeRobot uchun)**
setInterval(() => {
  console.log("✅ Bot hali ham ishlayapti...");
}, 600000); // 10 daqiqada bir marta ishlaydi

// **Xatolarni ushlash**
process.on("uncaughtException", (error) => {
  console.error("❌ Kutilmagan xatolik:", error);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Kutilmagan va'da rad etildi:", reason);
});

// **Botni ishga tushirish**
(async () => {
  try {
    console.log("🚀 Bot ishga tushirilmoqda...");
    await bot.launch();
    console.log("✅ Bot muvaffaqiyatli ishga tushdi!");
  } catch (error) {
    console.error("❌ Botni ishga tushirishda xatolik:", error);
  }
})();
