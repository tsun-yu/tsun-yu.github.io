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

let cardsPool = [];
let cardsPlayer = [];
let cardsBank = [];
let flag = 0;
let aceNumPlayer = 0;
let aceNumBank = 0;
let isPlayer = true;
let playerDone = false;
let playerTotal = 0;
let bankTotal = 0;

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
      for (let i = 0; i < aceNumTmp; i++) {
        total -= 10;
        if (total <= 21) {
          slr(id).innerHTML = total;
          isPlayer ? (playerTotal = total) : (bankTotal = total);
          break;
        } else {
          slr(id).innerHTML = "bust";
          if (isPlayer) {
            isPlayer = false;
            playerDone = true;
          }
        }
      }
    } else {
      slr(id).innerHTML = "bust";
      if (isPlayer) {
        isPlayer = false;
        playerDone = true;
      }
    }
  } else {
    slr(id).innerHTML = total;
    isPlayer ? (playerTotal = total) : (bankTotal = total);
  }
  flag < 3 && (isPlayer = !isPlayer);
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
  slr("#deal").setAttribute("disabled", "");
  slr("#done").setAttribute("disabled", "");
  setTimeout(() => {
    deal();
    calc("#playerTotal", cardsPlayer);
  }, 500);
  setTimeout(() => {
    deal();
    calc("#bankTotal", cardsBank);
  }, 1000);
  setTimeout(() => {
    deal();
    calc("#playerTotal", cardsPlayer);
    slr("#deal").removeAttribute("disabled", "");
    slr("#restart").removeAttribute("disabled", "");
    slr("#done").removeAttribute("disabled", "");
  }, 1500);
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
  cardsPool = [...shuffle(cardsPool)];
  cardsPlayer = [];
  cardsBank = [];
  flag = 0;
  aceNumPlayer = 0;
  aceNumBank = 0;
  isPlayer = true;
  newGame();
});

slr("#done").addEventListener("click", () => {
  slr("#done").setAttribute("disabled", "");
  slr("#deal").setAttribute("disabled", "");
  playerDone = !playerDone;
  isPlayer = false;
  bankAuto();
});

const bankAuto = () => {
  while (bankTotal < 21) {
    if (bankTotal < playerTotal) {
      if (slr("#bankTotal").innerHTML == "bust") {
        break;
      } else {
        deal();
        calc("#bankTotal", cardsBank);
      }
    } else {
      break;
    }
  }
};
