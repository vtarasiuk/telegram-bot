const { Telegraf } = require('telegraf');
require('dotenv').config();
const text = require('./const.js');
const request = require('request');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply(`Ave, ${ctx.message.from.first_name ? ctx.message.from.first_name : 'stranger'}!`));
bot.help((ctx) => ctx.reply(text.commands));

bot.command('get_exchange_rates', async (ctx) => {
  try {

    request('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=5', async function (error, response, body) {
      const date = new Date().toUTCString();
      const content = await JSON.parse(body);

      await ctx.replyWithHTML(`
<b>Current exchange rates</b>\n
${content[0].ccy}
Buy: ${content[0].buy} UAH
Sale: ${content[0].sale} UAH

${content[1].ccy}
Buy: ${content[1].buy} UAH
Sale: ${content[1].sale} UAH

${content[2].ccy}
Buy: ${content[2].buy} UAH
Sale: ${content[2].sale} UAH

${content[3].ccy}
Buy: ${content[3].buy} $
Sale: ${content[3].sale} $


${date}`);
    });
    
  } catch (e) {
    console.error(e);
  }
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));