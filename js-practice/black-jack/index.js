class Card {
  constructor(suit, point) {
    this.suit = suit;
    this.point = point;
  }
  toString() {
    let display = "";
    switch (this.point) {
      case 1:
        display = "A";
        break;
      case 11:
        display = "J";
        break;
      case 12:
        display = "Q";
        break;
      case 13:
        display = "K";
        break;
      default:
        display = this.point;
    }
    return Poker.getCardImage(60, this.suit, display);
  }
}

const createCard = (suit, point) => {
  return {
    suit,
    point,
    toString: function () {
      let display = "";
      switch (this.point) {
        case 1:
          display = "A";
          break;
        case 11:
          display = "J";
          break;
        case 12:
          display = "Q";
          break;
        case 13:
          display = "K";
          break;
        default:
          display = this.point;
      }
      return Poker.getCardImage(200, this.suit, display);
    },
  };
};

const slr = (name) => document.querySelector(name);
const disabled = (id) => slr(id).setAttribute("disabled", "");
const abled = (id) => slr(id).removeAttribute("disabled", "");

let cardsPool = [],
  cardsPlayer = [],
  cardsBank = [],
  flag = 0,
  aceNumPlayer = 0,
  aceNumBank = 0,
  playerTotal = 0,
  bankTotal = 0,
  isPlayer = true,
  playerDone = false;

//產生一副牌函式
const initCards = () => {
  const suit = ["c", "s", "d", "h"];
  const point = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  for (i = 0; i < suit.length; i++) {
    for (j = 0; j < point.length; j++) {
      cardsPool.push(createCard(suit[i], point[j]));
    }
  }
};

//呈現撲克牌函式
const displayCard = (id, card) => {
  slr(id).appendChild(card.toString());
};

//洗牌函式
const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

//發牌函式
const deal = () => {
  const newCard = cardsPool[flag];
  if (isPlayer) {
    displayCard("#playerCards", newCard);
    cardsPlayer.push(newCard);
  } else {
    displayCard("#bankCards", newCard);
    cardsBank.push(newCard);
  }

  //JQK為10點 A為11點
  if (newCard.point > 10) {
    newCard.point = 10;
  } else if (newCard.point == 1) {
    newCard.point = 11;
    isPlayer ? aceNumPlayer++ : aceNumBank++;
  }
  flag++;
};

//計算點數函式
const calc = (id, arr) => {
  let total = 0;
  let aceNumTmp = isPlayer ? aceNumPlayer : aceNumBank;

  arr.forEach((v) => {
    total += v.point;
  });

  if (total > 21) {
    if (aceNumTmp != 0) {
      //點數>21但有A
      for (let i = 0; i < aceNumTmp; i++) {
        total -= 10;
        if (total <= 21) {
          slr(id).innerHTML = total;
          isPlayer ? (playerTotal = total) : (bankTotal = total);
          break;
        } else if (i == aceNumTmp - 1) {
          if (isPlayer) {
            disabled("#deal");
            disabled("#done");
            playerTotal = total;
            isPlayer = false;
            playerDone = true;
            slr(id).innerHTML = `<div class="alert alert-danger" role="alert">
              BUST !!</div>`;
          } else {
            slr(
              "#result"
            ).innerHTML = `<div class="alert alert-success" role="alert">
              YOU WIN !!
            </div>`;
            slr(id).innerHTML = "bust";
          }
        }
      }
    } else {
      //點數>21 但沒有A
      if (isPlayer) {
        disabled("#deal");
        disabled("#done");
        playerTotal = total;
        isPlayer = false;
        playerDone = true;
        slr(id).innerHTML = `<div class="alert alert-danger" role="alert">
        BUST !</div>`;
      } else {
        slr(id).innerHTML = "bust";
        slr(
          "#result"
        ).innerHTML = `<div class="alert alert-success" role="alert">YOU WIN !!</div>`;
      }
    }
  } else {
    //點數<21
    slr(id).innerHTML = total;
    isPlayer ? (playerTotal = total) : (bankTotal = total);
  }
  flag < 3 && (isPlayer = !isPlayer);
  //過五關
  if (cardsPlayer.length == 5 && playerTotal <= 21) {
    slr(
      "#result"
    ).innerHTML = `<div class="alert alert-success" role="alert">YOU WIN !!</div>`;
    disabled("#deal");
    disabled("#done");
  }
};

// const card = createCard("c", 11);
// createCard(v.suit, v.point));
// const card = new Card("h", 13);

//產生一副牌
initCards();
//洗牌
cardsPool = [...shuffle(cardsPool)];

//新遊戲
const newGame = () => {
  let time = 500;
  while (time < 2000) {
    setTimeout(() => {
      deal();
      isPlayer
        ? calc("#playerTotal", cardsPlayer)
        : calc("#bankTotal", cardsBank);
    }, time);
    time += 500;
  }
  disabled("#deal");
  disabled("#done");
  setTimeout(() => {
    abled("#deal");
    abled("#restart");
    abled("#done");
  }, 1550);
};

//莊家拿牌
const bankAuto = () => {
  while (bankTotal <= 21) {
    if (bankTotal < playerTotal || bankTotal < 17) {
      if (slr("#bankTotal").innerHTML == "bust") {
        break;
      } else {
        deal();
        calc("#bankTotal", cardsBank);
      }
    } else {
      bankTotal == playerTotal
        ? (slr(
            "#result"
          ).innerHTML = `<div class="alert alert-secondary" role="alert"> EVEN </div>`)
        : (slr(
            "#result"
          ).innerHTML = `<div class="alert alert-danger" role="alert">YOU LOSE !</div>`);
      break;
    }
  }
};

//開始按鈕事件
slr("#start").addEventListener("click", function () {
  newGame();
  this.setAttribute("disabled", "");
});

//發牌按鈕事件
slr("#deal").addEventListener("click", () => {
  deal();
  isPlayer ? calc("#playerTotal", cardsPlayer) : calc("#bankTotal", cardsBank);
});

//重新開始按鈕事件
slr("#restart").addEventListener("click", () => {
  slr("#bankTotal").innerHTML = ``;
  slr("#bankCards").innerHTML = ``;
  slr("#playerTotal").innerHTML = ``;
  slr("#playerCards").innerHTML = ``;
  slr("#result").innerHTML = ``;
  cardsPool.length = 0;
  initCards();
  cardsPool = [...shuffle(cardsPool)];
  cardsPlayer = [];
  cardsBank = [];
  flag = 0;
  aceNumPlayer = 0;
  aceNumBank = 0;
  isPlayer = true;
  newGame();
});

//結束按鈕事件
slr("#done").addEventListener("click", () => {
  disabled("#done");
  disabled("#deal");
  playerDone = !playerDone;
  isPlayer = false;
  bankAuto();
});
