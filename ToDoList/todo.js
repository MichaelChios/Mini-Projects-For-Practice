// Κώδικας που θα εκτελείται όταν φορτωθεί η σελίδα:
// Code that will run when the page is loaded:
//
// Γράψτε εδώ τον κώδικά σας
// Write your code here
//
const totalCounter = document.querySelector("span.total");
const remainingCounter = document.querySelector("span.left-todo");
let liCounter = document.querySelectorAll("ul li").length;
let nodeListEl = document.querySelectorAll("ul li");
const inputEl = document.querySelector("input");

//--------------------------------------------------
// Ο παραπάνω κώδικας θα κάνει χρήση των εξής συναρτήσεων:
// The above code will use the following functions:

// Adds first 5 tasks
initialize();

inputEl.addEventListener("keyup", (event) => {
    if (event.code === "Enter") {
        addTask();
    }
});

colorEveryOddTask();
totalCounter.innerText = getTotalCount();
remainingCounter.innerText = getTotalCount() - getDoneCount();

nodeListEl.forEach((i) => {
    i.addEventListener("click", () => {
        i.classList.toggle("done");
        remainingCounter.innerText = getTotalCount() - getDoneCount();
    });
});

nodeListEl.forEach((i) => {
    i.addEventListener("dblclick", () => {
        i.remove();
        refresh();
    });
});

// 1. Επιστρέφει το πλήθος των εργασιών που έχουν σημειωθεί ως ολοκληρωμένες
// 1. Returns the count of the tasks that have been marked as done
function getDoneCount() {
    let doneCounter = 0;
    liCounter = document.querySelectorAll("ul li").length;
    for (let i = 0; i < liCounter; i++) {
        if (document.querySelectorAll('ul li')[i].classList.contains('done')) { // if class = "done"
            doneCounter++;
        }
    }
    return doneCounter;
}

// 2. Επιστρέφει το πλήθος όλων των εργασιών
// 2. Returns the total count of all the tasks
function getTotalCount() {
    liCounter = document.querySelectorAll("ul li").length;
    return liCounter;
}

// 3. Χρωματίζει όλες τις άρτιες εργασίες
// 3. Colors every odd task
function colorEveryOddTask() {
    nodeListEl = document.querySelectorAll("ul li");
    for(let i = 0; i < nodeListEl.length; i++){
        if(i % 2 === 0){
            nodeListEl[i].style.backgroundColor = "lightgray";
        }
        else{
            nodeListEl[i].style.backgroundColor = "white";
        }
    }
}

function addTask() {
    const inputEl = document.querySelector("input");
    const ulEl = document.querySelector("ul");
    const liEl = document.createElement("li");
    const spanEl = document.createElement("span");
    const dateSpanEl = document.createElement("span");
    dateSpanEl.classList.add("date");
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateSpanEl.innerText = new Date().toLocaleDateString('el-GR', options);

    spanEl.innerText = inputEl.value;
    liEl.appendChild(dateSpanEl);
    liEl.appendChild(spanEl);
    ulEl.appendChild(liEl);
    liEl.addEventListener("click", () => {
        liEl.classList.toggle("done");
        remainingCounter.innerText = getTotalCount() - getDoneCount();
    });
    liEl.addEventListener("dblclick", () => {
        liEl.remove();
        refresh();
    });
    inputEl.value = "";
    refresh();
}

function refresh(){
    totalCounter.innerText = getTotalCount();
    remainingCounter.innerText = getTotalCount() - getDoneCount();
    colorEveryOddTask();
}

function initialize(){
    for(let i = 0; i < 5; i++){
        const ulEl = document.querySelector("ul");
        const liEl = document.createElement("li");
        const spanEl = document.createElement("span");
        const dateSpanEl = document.createElement("span");
        dateSpanEl.classList.add("date");
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        spanEl.innerText = "Task " + (i+1);
        dateSpanEl.innerText = new Date().toLocaleDateString('el-GR', options);
        liEl.appendChild(dateSpanEl);
        liEl.appendChild(spanEl);
        ulEl.appendChild(liEl);
    }
}