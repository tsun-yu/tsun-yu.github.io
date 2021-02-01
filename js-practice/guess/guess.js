//取隨機函數
const getRandom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

// querySelector
const slr = (element) => document.querySelector(element);
const startBtn = slr("#start");
const restartBtn = slr("#restart");
const sendBtn = slr("#confirm");
const input = slr("#reply");
const tbodyDisplay = slr("#tbodyDisplay");

//答案
let ans = [];
// 產生答案函數
const getAns = () => {
  ans = [];
  while (ans.length < 4) {
    let a = getRandom(0, 10);
    let flag = 0;
    for (i = 0; i < ans.length; i++) {
      a == ans[i] && flag++;
    }
    flag == 0 && ans.push(String(a));
  }
  // console.log(ans);
};

let display = ``;
let around = 0;
// 顯示紀錄
const displayHistory = (a, b, around, reply) => {
  a == 4
    ? (display += `<tr><td>${around}.</td><td>${reply}</td><td>BINGO</td></tr>`)
    : (display += `<tr><td>${around}.</td><td>${reply}</td><td>${a}A${b}B</td></tr>`);

  tbodyDisplay.innerHTML = display;
};

// 傳送回答及驗證
const operation = () => {
  let reply = input.value;
  let replyArr = reply.split("");
  input.value = "";
  let a = 0;
  let b = 0;
  if (replyArr.length != 4) {
    alert("請輸入四位數字");
    input.value = "";
  } else {
    for (i = 0; i < 4; i++) {
      if (ans[i] === replyArr[i]) {
        a++;
      } else {
        for (j = 0; j < 4; j++) {
          if (ans[i] === replyArr[j]) {
            b++;
            break;
          }
        }
      }
    }
    around += 1;
    displayHistory(a, b, around, reply);
  }
};

// 開始按鈕
startBtn.addEventListener("click", () => {
  tbodyDisplay.innerHTML = `<div>START!</div>`;
  setTimeout(() => {
    tbodyDisplay.innerHTML = ``;
  }, 500);
  startBtn.setAttribute("disabled", "");
  restartBtn.removeAttribute("disabled");
  sendBtn.removeAttribute("disabled");
  input.removeAttribute("disabled");
  getAns();
});

//enter鍵
input.addEventListener("keypress", (e) => {
  e.key === "Enter" && operation();
});

// 重新按鈕
restartBtn.addEventListener("click", () => {
  tbodyDisplay.innerHTML = `<div class="spinner-border text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>`;
  setTimeout(() => {
    tbodyDisplay.innerHTML = ``;
  }, 500);
  display = ``;
  around = 0;
  document.querySelectorAll(".number").forEach((e) => {
    e.classList.remove("numberClick");
  });
  getAns();
});

//確認按鈕
sendBtn.addEventListener("click", () => {
  operation();
});

const selectToggle = (e) => {
  e.target.classList[5] == "numberClick"
    ? e.target.classList.remove("numberClick")
    : e.target.classList.add("numberClick");
};

document.querySelectorAll(".number").forEach((element) => {
  element.addEventListener("click", (e) => {
    selectToggle(e);
  });
});

// 判斷AB
// for (i=0 ; i<4 ; i++){
//     let a = 0
//     if(ans[i] == tmp[i]){
//         a++
//     }else{
//         let b = 0
//         for (j=0 ; j<4 ; j++){
//             if (ans[i] == tmp[j]){
//                 b++
//                 break
//             }
//         }
//     }
// }
