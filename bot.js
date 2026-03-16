const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
  console.log('امسح هذا QR من واتساب');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('البوت اشتغل بنجاح');
});

client.on('message', async (msg) => {
  const text = msg.body.trim();

  if (
    text === 'مرحبا' ||
    text === 'مرحبا!' ||
    text === 'hello' ||
    text === 'menu' ||
    text === 'ابدأ' ||
    text === 'start'
  ) {
    await client.sendMessage(
      msg.from,
      `أهلاً بكم في عيادة الدكتور

اختر الرقم:
1 - حجز موعد
2 - عنوان العيادة
3 - أوقات الدوام
4 - رقم السكرتيرة`
    );
    return;
  }

  if (text === '1') {
    await client.sendMessage(
      msg.from,
      `لحجز موعد أرسل المعلومات التالية:
الاسم الكامل
رقم الهاتف
اليوم المطلوب
الوقت المناسب`
    );
    return;
  }

  if (text === '2') {
    await client.sendMessage(
      msg.from,
      `عنوان العيادة:
دمشق - اكتب هنا العنوان الكامل`
    );
    return;
  }

  if (text === '3') {
    await client.sendMessage(
      msg.from,
      `أوقات الدوام:
يومياً من 4:00 مساءً حتى 9:00 مساءً
عدا الجمعة`
    );
    return;
  }

  if (text === '4') {
    await client.sendMessage(
      msg.from,
      `رقم السكرتيرة:
09XXXXXXXX`
    );
    return;
  }
});

client.initialize();