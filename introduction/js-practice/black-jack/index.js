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
      return Poker.getCardImage(60, this.suit, display);
    },
  };
};

const slr = (name) => document.querySelector(name);

let cardsPool = [];
let cardsPlayer = [];
let flag = 0;
let aceNum = 0;

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
const displayCard = (card) => {
  slr("#cards").appendChild(card.toString());
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
const dispatch = () => {
  const newCard = cardsPool[flag];
  displayCard(newCard);
  cardsPlayer.push(newCard);

  //JQK為10點 A為11點
  if (newCard.point > 10) {
    newCard.point = 10;
  } else if (newCard.point == 1) {
    newCard.point = 11;
    aceNum++;
  }
  flag++;
};

//計算點數函式
const calc = () => {
  let total = 0;
  let aceNumTmp = aceNum;

  cardsPlayer.forEach((v) => {
    total += v.point;
  });

  if (total > 21) {
    if (aceNumTmp != 0) {
      for (let i = 0; i < aceNumTmp; i++) {
        total -= 10;
        if (total <= 21) {
          slr("#total").innerHTML = total;
          break;
        } else {
          slr("#total").innerHTML = "bust";
        }
      }
    } else {
      slr("#total").innerHTML = "bust";
    }
  } else {
    slr("#total").innerHTML = total;
  }
};

// const card = createCard("c", 11);
// createCard(v.suit, v.point));
// const card = new Card("h", 13);

//產生一副牌
initCards();
//洗牌
cardsPool = [...shuffle(cardsPool)];

//發票按鈕事件
slr("#dispatch").addEventListener("click", () => {
  dispatch();
  calc();
});
