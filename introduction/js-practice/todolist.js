//querySelector
const slr = (name) => document.querySelector(name);
const sendBtn = slr("#send");
const input = slr("#input");
const todolist = slr("#todolist");
const editInput = slr("#editInput");

const addEvent4Btns = (selector, eventType, func) => {
  document.querySelectorAll(selector).forEach((element) => {
    element.addEventListener(eventType, (e) => func(e));
  });
};

//存放代辦事項arr
// {id:number , text:string, completed:false}
let todos = [
  // { "id": 111, text: "複習react", "completed": false, "edit": false },
  // { "id": 222, text: "練習js", "completed": true, "edit": false }
];

//新增代辦事項至todos陣列中
const addTodo = () => {
  // {id:number , text:string, completed:false, edit:false}
  if (input.value.trim()) {
    const todosItems = {
      id: +new Date(),
      text: input.value,
      completed: false,
      edit: false,
    };
    todos.unshift(todosItems);
  }
  input.value = ``;

  localStorage.setItem("todos", JSON.stringify(todos));
};

//切換是否已完成
const completedToggle = (id) => {
  todos.forEach((v) => {
    v.id == +id && (v.completed = !v.completed);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
};
//刪除代辦事項
const deleteItem = (id) => {
  todos = todos.filter((v) => v.id !== +id);
  localStorage.setItem("todos", JSON.stringify(todos));
};
//切換編輯狀態
const editToggle = (id) =>
  todos.forEach((v) => {
    v.edit = false;
    v.id == +id && (v.edit = !v.edit);
  });
//儲存已編輯
const saveItem = (id) => {
  todos.forEach((v) => {
    v.id == +id &&
      (v.text = document.querySelector("#editInput").value) &&
      (v.edit = false);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
};

//呈現畫面
const display = () => {
  const displayTodolist = todos.map((value) => {
    let displayTodolistTmp = "";
    displayTodolistTmp = value.edit
      ? `<li>
      <input id="editInput" type="text" value="${value.text}"/>
      <button class="btn btn-primary saveBtn" id="${value.id}">save</button>
      <button class="btn btn-primary completedBtn" id="${value.id}">completed</button>
      <button class="btn btn-primary deleteBtn" id="${value.id}">delete</button>
      </li>`
      : value.completed
      ? `<li>
      <del>${value.text}</del>
      <button class="btn btn-primary editBtn" id="${value.id}">edit</button>
      <button class="btn btn-primary completedBtn" id="${value.id}">completed</button>
      <button class="btn btn-primary deleteBtn" id="${value.id}">delete</button>
      </li>`
      : `<li>${value.text}
      <button class="btn btn-primary editBtn" id="${value.id}">edit</button>
      <button class="btn btn-primary completedBtn" id="${value.id}">completed</button>
      <button class="btn btn-primary deleteBtn" id="${value.id}">delete</button>
      </li>`;

    return displayTodolistTmp;
  });

  todolist.innerHTML = displayTodolist.join("");

  //以下為各按鈕事件

  //完成按鈕事件
  document.querySelectorAll(".completedBtn").forEach((element) => {
    element.addEventListener("click", (e) => {
      completedToggle(e.target.id);
      display();
    });
  });

  //刪除按鈕事件
  addEvent4Btns(".deleteBtn", "click", (e) => {
    deleteItem(e.target.id);
    display();
  });

  //編輯按鈕事件
  addEvent4Btns(".editBtn", "click", (e) => {
    const itemId = e.target.id;
    editToggle(e.target.id);
    display();
    document.querySelector("#editInput").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        saveItem(itemId);
        display();
      }
    });
  });
  //儲存按鈕事件
  addEvent4Btns(".saveBtn", "click", (e) => {
    saveItem(e.target.id);
    display();
  });
};

sendBtn.addEventListener("click", () => {
  addTodo();
  display();
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo();
    display();
  }
});

const initTodo = () => {
  const newTodos = JSON.parse(localStorage.getItem("todos"));
  todos = [...newTodos];
  display();
};

initTodo();
