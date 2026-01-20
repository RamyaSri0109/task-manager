//Greetings
const greeting = document.getElementById("greeting");
const hour = new Date().getHours();

if(hour<12){
    greeting.textContent = "Good Morning!!";
} else if(hour>12 && hour<16){
    greeting.textContent = "Good Afternoon!!";
} else{
    greeting.textContent = "Good Evening!!";
}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const submitBtn = document.getElementById("submitBtn");
const taskList = document.getElementById("tasksList");


function displayTasks(){
    taskList.innerHTML = "";
    tasks.forEach(function(task){

        const li = document.createElement("li");


        const taskInfo = document.createElement("div");
        taskInfo.classList.add("task-info");
        taskInfo.textContent = `${task.name}`;

        const taskDetails = document.createElement("div");
        taskDetails.classList.add("task-details");

        const due = document.createElement("span");
        due.textContent = `Due : ${task.dueDate}`;

        taskDetails.appendChild(due);

        const priority = document.createElement("span");
        priority.textContent = `Priority : ${task.priority}`;

        taskDetails.appendChild(priority);

        const status = document.createElement("span");
        status.textContent = `Status : ${task.status}`;
        taskDetails.appendChild(status);
        
        
        taskInfo.appendChild(taskDetails);
        
        const actionsDiv = document.createElement("div");
        actionsDiv.classList.add("task-actions");
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "Mark as Complete";
        completeBtn.classList.add("complete-btn");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");
        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        
        
        // append buttons into actions div
        actionsDiv.appendChild(completeBtn);
        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);
        
        // append info + actions to li
        li.appendChild(taskInfo);
        li.appendChild(actionsDiv);

        //append li to ul
        taskList.appendChild(li);

        deleteBtn.addEventListener("click", function(){
            tasks = tasks.filter(function(t){
                return t.id !== task.id;
            });

            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks();
            getTaskInsights();
            alert("Task is deleted");

        });

        completeBtn.addEventListener("click",function(){
            task.status = "Completed";
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks();
            getTaskInsights();
            alert("Task is Completed!");
        })

        if (task.status === "Completed") {
            completeBtn.textContent = "Completed";
            completeBtn.disabled = true;

            taskInfo.classList.add("completed-task");
        }

    });
}
displayTasks();
getTaskInsights();

submitBtn.addEventListener("click", function(){
    const taskName = document.getElementById("name").value;
    const dueDate = document.getElementById("duedate").value;
    const priority = document.getElementById("priority").value;

    console.log(taskName, dueDate, priority);

    if(taskName ===""){
        alert("Task name should not be empty");
        return;
    }

    const task = {
        id:Date.now(),
        name:taskName,
        dueDate : dueDate,
        priority:priority,
        status: "Pending"
    };

    tasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    
    alert("Task added");
    displayTasks();
    getTaskInsights();
    document.getElementById("name").value="";
    document.getElementById("duedate").value ="";
    document.getElementById("priority").value = "low";

});


function getTaskInsights(){
    console.log("Total tasks : "+tasks.length);
    let pendingTasks = 0;
    let completedTasks = 0;
    let dueToday = 0;
    const today = new Date().toISOString().split("T")[0];

    tasks.forEach(function(task){
        if(task.status==="Pending"){
            pendingTasks++;
        }
        else if(task.status=="Completed"){
            completedTasks++;
        }
        if(task.dueDate===today){
            dueToday++;
        }
    });
    // console.log("Pending Tasks : "+pendingTasks);
    // console.log("Completed Tasks : "+completedTasks);
    // console.log("Due today tasks : "+dueToday);
    document.getElementById("total").textContent = tasks.length;
    document.getElementById("pending").textContent = pendingTasks;
    document.getElementById("completed").textContent = completedTasks;
    document.getElementById("dueToday").textContent = dueToday;

}

