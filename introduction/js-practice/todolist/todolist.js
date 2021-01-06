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
      ? `<li class="d-flex">
        <div class="d-flex align-items-center px-2">
          <a
            href="##"
            class="completedBtn d-flex align-items-center justify-content-center"
            id="${value.id}"
          >
            <i class="fas fa-check" id="${value.id}"></i>
          </a>
          <input id="editInput" type="text" value="${value.text}"/>
          <button class="btn btn-primary saveBtn" id="${value.id}">Done</button>
        </div>
      </li>`
      : value.completed
      ? `<li class="d-flex">
      <div class="d-flex align-items-center px-2">
        <a
          href="##"
          class="completedBtn d-flex align-items-center justify-content-center"
          id="${value.id}"
        >
          <i class="fas fa-check" id="${value.id}"></i>
        </a>
        <div class="todoItem todoItemChecked"><del>${value.text}</del></div>
        <div class="editnDeleteBtns">
          <a href="##" class="editBtn" >
            <i class="fas fa-pen" id="${value.id}"></i>
          </a>
          <a href="##" class="deleteBtn" >
            <i class="fas fa-trash-alt" id="${value.id}"></i>
          </a>
        </div>
      </div>
    </li>`
      : `<li class="d-flex">
      <div class="d-flex align-items-center px-2">
        <a
          href="##"
          class="completedBtn d-flex align-items-center justify-content-center"
          id="${value.id}"
        >
          <i class="fas fa-check" id="${value.id}"></i>
        </a>
        <div class="todoItem">${value.text}</div>
        <div class="editnDeleteBtns">
          <a href="##" class="editBtn" >
            <i class="fas fa-pen" id="${value.id}"></i>
          </a>
          <a href="##" class="deleteBtn" >
            <i class="fas fa-trash-alt " id="${value.id}"></i>
          </a>
        </div>
      </div>
    </li>`;

    return displayTodolistTmp;
  });

  todolist.innerHTML = displayTodolist.join("");

  //以下為各按鈕事件

  //完成按鈕事件
  addEvent4Btns(".fa-check", "click", (e) => {
    completedToggle(e.target.id);
    display();
  });
  // addEvent4Btns(".completedBtn", "click", (e) => {
  //   completedToggle(e.target.id);
  //   console.log(e.target,e.target.id)
  //   display();
  // });

  //刪除按鈕事件
  addEvent4Btns(".fa-trash-alt", "click", (e) => {
    deleteItem(e.target.id);
    display();
  });

  //編輯按鈕事件
  addEvent4Btns(".fa-pen", "click", (e) => {
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
