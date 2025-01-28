const { Scenes } = require("telegraf");

const game = new Scenes.BaseScene("game");

game.enter(async (ctx) => {
  ctx.reply(`<b>Game has started!</b>\n\nChoose your number 👇`, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "1",
            callback_data: "1",
          },
          {
            text: "2",
            callback_data: "2",
          },
          {
            text: "3",
            callback_data: "3",
          },
        ],
        [
          {
            text: "4",
            callback_data: "4",
          },
          {
            text: "5",
            callback_data: "5",
          },
          {
            text: "6",
            callback_data: "6",
          },
        ],
        [
          {
            text: "7",
            callback_data: "7",
          },
          {
            text: "8",
            callback_data: "8",
          },
          {
            text: "9",
            callback_data: "9",
          },
          {
            text: "0",
            callback_data: "0",
          },
        ],
      ],
    },
  });
});

const randomNumber = () => {
  return Math.floor(Math.random() * 9) + 1;
};

game.on("callback_query", async (ctx) => {
  const randomNum = randomNumber();
  if (randomNum == ctx.callbackQuery.data) {
    ctx.answerCbQuery();
    ctx.reply(`You win!\nNumber was ${randomNum}`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Play again 🔄", callback_data: "play_again" }],
        ],
      },
    });
    ctx.scene.leave();
    await ctx.deleteMessage(ctx.msgId);
  } else {
    ctx.answerCbQuery();
    ctx.reply(`You lose!\nNumber was ${randomNum}`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Play again 🔄", callback_data: "play_again" }],
        ],
      },
    });
    ctx.scene.leave();
    await ctx.deleteMessage(ctx.msgId);
  }
});

module.exports = game;
