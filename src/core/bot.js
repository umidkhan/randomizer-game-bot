const { Telegraf, session, Scenes } = require("telegraf");
const { game } = require("./scenes");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([game]);
bot.use(session());
bot.use(stage.middleware());

bot.start(async (ctx) => {
  ctx.reply(
    `Hello <a href="tg://user?id=${ctx.from.id}" >${ctx.from.first_name}</a>\nWelcome to the bot!`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Start the game",
              callback_data: "start_game",
            },
          ],
        ],
      },
    }
  );
});

bot.action("start_game", async (ctx) => {
  ctx.scene.enter("game");
  ctx.answerCbQuery("Game has started!");
  await ctx.deleteMessage(ctx.msgId);
});

bot.action("play_again", async (ctx) => {
  ctx.scene.enter("game");
  ctx.answerCbQuery("Game has started!");
  await ctx.deleteMessage(ctx.msgId);
});

bot.command("play", async (ctx) => {
  ctx.scene.enter("game");
});

bot.launch(() => {
  console.log("Bot has started");
  bot.telegram.sendMessage(process.env.ADMIN_ID, "Bot has started");
});
