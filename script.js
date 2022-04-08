
// Classes Name
const check = "fa-solid fa-check-square";
const uncheck= "fa-regular fa-square";
const line = "line-through";

const checka =  "fa-solid";
const checkb = "fa-check-square"
const unchecka = "fa-regular";
const uncheckb = "fa-square"

// Select Element
const input = document.querySelector("#add-task>input");
const count = document.getElementById("count");
const taskList = document.getElementById("task-list");
const addIcon = document.querySelector("#add-task>i");

// Variables
let list=[],id=0;
let totaltasks=0;

// Fetching data stored in localStorage
const DATA = localStorage.getItem("TodoList");
const TOTAL = localStorage.getItem("totaltasks");


if(DATA){
    list = JSON.parse(DATA);  //converting JSON Data to object
    id=list.length;   
    loadTasks(list);  // Load list on Page
}

if(TOTAL){
    totaltasks=JSON.parse(TOTAL); 
}


function loadTasks(list){
    list.forEach(element => {
        addTask(element);    // calling addTask fn on each task of list array
    });
}


addIcon.addEventListener("click", handleAdd);

function handleAdd(){
    let data = input.value;
    if(data){
        let task = {
            text:data,
            id:id,
            done:false,   //At the start done & delete will be false bydefault
            delete:false,
        }
        
        addTask(task);  //Add task on page
        input.value="";  //empty the input for new task
        list.push(task);  //task pushed in list array
        id++;
        localStorage.setItem("TodoList",JSON.stringify(list));  //list is upated in localstorage
    }
}

// Add valid Tasks on page
function addTask(task){
    
    // if delete is true no need to display Task on page
    if(task.delete){
        return;
    }

    let DONE = task.done;
    const done = (DONE)? check:uncheck;  // class for the check icon
    const checkline = (DONE)? line:"";   // class for the task text

    const li = document.createElement("li");  //<li> tag is created 

    // Adding content in <li>
    li.innerHTML = `  
    <i class="${done}" data-value="check" id="${task.id}"></i>
    <p class="${checkline} text">${task.text}</p>
    <i class="fa-solid fa-trash-can del" data-value="delete" id="${task.id}"></i>
    `;

    taskList.append(li);  //<li> is added in <ul>
    totaltasks++;
    count.innerHTML=totaltasks;  //Total number of task is displayed on page
    localStorage.setItem("totaltasks", totaltasks);  // updated in localstorage


}

taskList.addEventListener("click",(e)=>{
    const target = e.target;   // mouse click element
    const value = target.dataset.value;  //value of data-value attribute of target
    
    if(value=="check"){
        completeTask(target);
    }else if(value=="delete"){
        deleteTask(target);
    }
    //updating list in localStorage
    localStorage.setItem("TodoList", JSON.stringify(list));
});


function completeTask(target){

    //toggle remove the class if class is present or add the class if class is absent 
    target.classList.toggle(checka);
    target.classList.toggle(checkb);
    target.classList.toggle(unchecka);
    target.classList.toggle(uncheckb);
    target.parentNode.querySelector(".text").classList.toggle(line);

    const targetId = target.id;

    list[targetId].done = (list[targetId].done)?false:true; //updating done key value
}

function deleteTask(target){
    // delete icon parentnode is list item , & list item parentNode is whole list
    // removechild removes the selected list item from the whole list
    target.parentNode.parentNode.removeChild(target.parentNode);

    const targetId = target.id;
    list[targetId].delete = true;

    totaltasks--;
    count.innerHTML=totaltasks;  //Total number of task is displayed on page
    localStorage.setItem("totaltasks", totaltasks);  // updating in localstorage

}



