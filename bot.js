const express = require('express')
const multer = require('multer')
const TelegramBot = require('node-telegram-bot-api')
const fs = require('fs')
const mime = require('mime-types') // mime-types kutubxonasini qo‘shdik

const app = express()

// Multer orqali fayllarni yuklash uchun sozlamalar
const upload = multer({ dest: 'uploads/' })

// Telegram botni yaratish
const bot = new TelegramBot('7727607417:AAGRkbmn4QcTg4HhadIDoJp0Z9LHw0Y9UmM', {
  polling: false
})
const CHAT_ID = '-1002447257466' // Telegram kanalning ID-si

// Post yuborish uchun endpoint
app.post('/send-to-telegram', upload.array('imgs'), async (req, res) => {
  try {
    // Frontenddan kelgan parametrlarni olish
    const { name, price, startDate, endDate } = req.body

    // Yuklangan fayllarni tayyorlash
    const media = req.files.map(file => ({
      type: 'photo', // Media turi (rasm)
      media: fs.createReadStream(file.path), // Faylni oqish
      contentType: mime.lookup(file.path) // Mime turi avtomatik aniqlanadi
    }))

    // Caption (matn) yaratish
    const caption = `🥶 *${name.toUpperCase()} uchun aksiyada!*\n\n💰 *Narxi:* ${price} so‘m 😇\n🚚 *Dastafka:* Bor✨\n✈️ *Yetib borish muddati:* 20 kun\n📅 *Aksiya muddati:* ${startDate} - ${endDate}\n\nShoshiling! ✅\n\n📩 Murojaat uchun: @programm_weeb\n👤 Bosh admin: @yakubovv_667`

    // Agar rasm bo‘lsa, media group yuboramiz
    if (media.length > 0) {
      media[0].caption = caption
      media[0].parse_mode = 'Markdown' // Markdown formatida yuborish
      await bot.sendMediaGroup(CHAT_ID, media) // Telegramga rasmni yuborish
    } else {
      // Agar faqat matn bo‘lsa, shu matnni yuborish
      await bot.sendMessage(CHAT_ID, caption, { parse_mode: 'Markdown' })
    }

    // Fayllarni o‘chirish (serverdan)
    req.files.forEach(file => fs.unlinkSync(file.path))

    // Muvaffaqiyatli yuborilganda javob qaytarish
    res.json({ message: 'Post yuborildi!' })
  } catch (error) {
    // Xato bo‘lsa xatolik haqida ma'lumot qaytarish
    console.error(error)
    res.status(500).json({ message: 'Xatolik yuz berdi!' })
  }
})

// Serverni ishga tushirish
app.listen(9999, () => console.log('Server ishga tushdi'))
