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
const historyList = slr("#history");
const resultList = slr("#result");

// 顯示紀錄
const displayHistory = (a, b) => {
  let display = `<tbody>`;
  if (a == 4) {
    for (i = 0; i < history.length; i++) {
      display += `<tr><td>${i + 1}.  </td>`;
      display += `<td>${history[i].join("")}  </td>`;
      i + 1 == history.length
        ? (display += `<td>bingo</td></tr>`)
        : (display += `<td>${result[i]}</td>`);

      display += `</tr>`;
    }
  } else {
    for (i = 0; i < history.length; i++) {
      display += `<tr><td>${i + 1}.  </td>`;
      display += `<td>${history[i].join("")}  </td>`;
      display += `<td>${result[i]}</td>`;
      display += `</tr>`;
    }
  }
  display += `</tbody>`;
  historyList.innerHTML = display;
};

// 產生答案函數
let ans = [];
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
  console.log(ans);
};

let history = [];
let result = [];

// 傳送回答
const operation = () => {
  let tmp = input.value.split("");
  let tmpResult = ``;
  input.value = "";
  if (tmp.length != 4) {
    alert("請輸入四位數字");
    input.value = "";
  } else {
    let a = 0;
    let b = 0;
    for (i = 0; i < 4; i++) {
      if (ans[i] === tmp[i]) {
        a++;
      } else {
        for (j = 0; j < 4; j++) {
          if (ans[i] === tmp[j]) {
            b++;
            break;
          }
        }
      }
      tmpResult = `${a}A${b}B`;
    }
    history.push(tmp);
    result.push(tmpResult);

    displayHistory(a, b);
    console.log(result);
  }
};

// 按鈕功能
startBtn.addEventListener("click", () => {
  historyList.innerHTML = `<div>START!</div>`;
  setTimeout(() => {
    historyList.innerHTML = ``;
  }, 2000);
  startBtn.setAttribute("disabled", "");
  restartBtn.removeAttribute("disabled");
  sendBtn.removeAttribute("disabled");
  getAns();
});
restartBtn.addEventListener("click", () => {
  historyList.innerHTML = `<div class="spinner-border text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>`;
  setTimeout(() => {
    historyList.innerHTML = ``;
  }, 500);
  result.length = 0;tsun-yu.github.io
  getAns();
  history.length = 0;
});
input.addEventListener("keypress", (e) => {
  e.key === "Enter" && operation();
});

sendBtn.addEventListener("click", () => {
  operation();
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
