//init data
const todo = document.querySelector(".todo");
let todoItem = ["Hit the gym", "Read a book", "Organize office"];
const done = document.querySelector(".done");
let doneItem = ["Buy eggs", "Pay bills"];
//垃圾桶圖示 <i class="delete fa fa-trash"></i>
//init function
// function initTodoItem(TodoItem) {
//   for (let item of TodoItem) {
//     let todoLi = document.createElement("li");
//     todoLi.innerHTML = `<label for="todo">${item}</label><i class="delete fa fa-trash"></i>`;
//     todo.appendChild(todoLi);
//   }
// }
// initTodoItem(todoItem);

// function initDoneItem(DoneItem) {
//   for (let item of DoneItem) {
//     let doneLi = document.createElement("li");
//     doneLi.innerHTML = `<label for="done">${item}</label><i class="delete fa fa-trash"></i>`;
//     done.appendChild(doneLi);
//   }
// }
// initDoneItem(doneItem);
//合在一起
function initItem(InitItem, labelInit, initBlock) {
    for (let item of InitItem) {
        let initLi = document.createElement("li");
        initLi.innerHTML = `<label for="${labelInit}">${item}</label><i class="delete fa fa-trash"></i>`;
        initBlock.appendChild(initLi);
    }
}
//初始化todoItem
initItem(todoItem, todo, todo);
//初始化doneItem
initItem(doneItem, done, done);
//增加項目函式
function addItem(inputValue, todo) {
    let li = document.createElement("li");
    li.innerHTML = `<label for="todo">${inputValue}</label><i class="delete fa fa-trash"></i>`;
    todo.appendChild(li);
}
//create
//點擊add按鈕新增
const addButton = document.querySelector("#addButton");
addButton.addEventListener("click", function (event) {
    const input = event.target.previousElementSibling;
    let inputValue = input.value;
    if (inputValue === "" && inputValue.length === 0) {
        console.log("is space");
    } else {
        addItem(inputValue, todo);
    }
});
//How to prevent form input to reload a page when receiving `Enter` key
//<form>上的onSubmit屬性，設為return false
//按Enter新增
const newTodo = document.querySelector("#newTodo");
newTodo.addEventListener("keypress", function (event) {
    console.log(event);
    const input = event.target;
    let inputValue = input.value;
    if (event.keyCode === 13) {
        if (inputValue === "" && inputValue.length === 0) {
            console.log("is space");
        } else {
            addItem(inputValue, todo);
        }
    }
});
//delete
const workArea = document.querySelector(".workArea");
workArea.addEventListener("click", function (event) {
    let trash = event.target;
    if (trash.tagName === "I") {
        console.log("trash");
        let li = trash.parentElement;
        //console.log(li);
        //trash.parentElement.parentElement
        //可能為.todo的節點或是.done的節點
        trash.parentElement.parentElement.removeChild(li);
    }
});

let timer = 0;
let delay = 200;
let prevent = false;
//checked
//https://css-tricks.com/snippets/javascript/bind-different-events-to-click-and-double-click/
workArea.addEventListener("click", function (event) {
    timer = setTimeout(function () {
        if (!prevent) {
            //console.log("click");
            let label = event.target;
            if (label.tagName === "LABEL") {
                //在Todo區塊內的項目上按，先出現.checked樣式
                //在點一次的話，則跑去Done區塊
                //==>在Todo區塊內的項目上按，先出現.checked樣式
                console.log("label");
                label.classList.add("checked");
            }
        }
        prevent = false;
    }, delay);
});
workArea.addEventListener("click", function (event) {
    clearTimeout(timer);
    prevent = true;
    //console.log("double click");
    let label = event.target;
    if (label.tagName === "LABEL") {
        let todo = label.parentElement.parentElement;
        console.log(todo);
        if (
            todo.classList.contains("todo") &&
            label.classList.contains("checked")
        ) {
            todo.removeChild(label.parentElement);
            done.appendChild(label.parentElement);
        }
        //在Todo區塊內的項目上按，先出現.checked樣式
        //在點一次的話，則跑去Done區塊
        //==>在點一次的話，則跑去Done區塊
        console.log("label");
        label.classList.add("checked");
    }
});
