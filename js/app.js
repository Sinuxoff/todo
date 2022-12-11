const TaskName = document.querySelector('.TaskNameSet')
const TaskDesription = document.querySelector('.TaskDesriptionSet')
const TaskDay = document.querySelector('.TaskDaySet')
const AddTaskButton = document.querySelector('.add_new_task_create_button')
const TasksList = document.querySelector('.tasks_list');
const NewTaskWindowButton = document.querySelector('.add_new_task');
const TaskMakerWindow = document.querySelector('.new_task_create_window_body')
const CreateNewTaskButton = document.querySelector('.create_new_task_body')
let Priority = document.querySelector('.setPriority')
let CloseTaskMakerWindow = document.querySelector('.cancle_new_task_create_button')
const AddChangeButton = document.querySelector('.add_change_task_button')
const Body = document.querySelector('body')
let PriorityStatus = false;
let tasks = []

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
}

tasks.forEach((task) => renderTask(task))


//Set Date
let CurentDayDate = document.querySelector('.curentDayDate').innerHTML = new Date().toDateString()
//Set Date

AddTaskButton.addEventListener('click', addTask)
TasksList.addEventListener('click', ShowChangeTaskWindow)
TasksList.addEventListener('click', DeleteTask)
TasksList.addEventListener('click', DoneTask)
CreateNewTaskButton.addEventListener('click', ShowTaskMaker)
NewTaskWindowButton.addEventListener('click', ShowTaskMaker)
CloseTaskMakerWindow.addEventListener('click', CloseWindow)

//Priority----------------------------------------
Priority.addEventListener('click', SetPriority)
function SetPriority() {
    PriorityStatus = true;
    Priority.style.background = '#21bd31'
    Priority.style.borderRadius = '25px'
    return PriorityStatus
}
//Priority---------------------------------------

function addTask(event) {

    if (TaskName.value === "") {
    } else {
        const TaskNameSet = TaskName.value
        const TaskDesriptionSet = TaskDesription.value
        const TaskDaySet = TaskDay.value
        const newTask = {
            id: Date.now(),
            name: TaskNameSet,
            desription: TaskDesriptionSet,
            deadline: TaskDaySet,
            Priority: PriorityStatus,
            done: false
        }
        tasks.push(newTask);

        renderTask(newTask)

        reset()

        TaskMakerWindow.style.display = 'none'
        TaskMakerWindow.style.display = 'none'
        SaveTolocalStorage()
    }
}


function ShowChangeTaskWindow(event) {

    if (event.target.classList == 'task_Edit_Button') {
        const parentNode = event.target.closest('.task_Body')
        const TaskId = Number(parentNode.id)
        const task = tasks.find(function (task) {
            if (task.id === TaskId) {
                return true
            }
        })

        
        const ChangePopUp = `<div id="${task.id}" class="task-change_pop-up"><div class="task-change_pop-up__container"><div class="task-change_pop-up__body"><div  class="change_task_window_body"><div class="change_task_window_container"><input id="ChangeName" value="${task.name}" placeholder="Task name" type="text" class="TaskNameSet"><input id="ChangeDesription" value="${task.desription}" placeholder="Desription" type="text" class="TaskDesriptionSet"><input id="ChangeDeadline" value="${task.deadline}" class="TaskDaySet" type="date"><button title="Set Prioriry" class="setPriority"><svg class="setPriorityIcon" width="20" height="20" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.9625 4.75L13.5875 1.46875C13.6759 1.35832 13.7313 1.22512 13.7473 1.08455C13.7632 0.94398 13.7391 0.801765 13.6776 0.674326C13.6162 0.546887 13.52 0.439422 13.4001 0.364339C13.2802 0.289257 13.1415 0.249619 13 0.250003H1.5C1.30109 0.250003 1.11032 0.32902 0.96967 0.469673C0.829018 0.610325 0.75 0.80109 0.75 1V11.5C0.75 11.6989 0.829018 11.8897 0.96967 12.0303C1.11032 12.171 1.30109 12.25 1.5 12.25C1.69891 12.25 1.88968 12.171 2.03033 12.0303C2.17098 11.8897 2.25 11.6989 2.25 11.5V9.25H13C13.1415 9.25039 13.2802 9.21075 13.4001 9.13567C13.52 9.06058 13.6162 8.95312 13.6776 8.82568C13.7391 8.69824 13.7632 8.55602 13.7473 8.41545C13.7313 8.27488 13.6759 8.14169 13.5875 8.03125L10.9625 4.75ZM2.25 7.75V1.75H11.4375L9.4125 4.28125C9.306 4.41427 9.24797 4.5796 9.24797 4.75C9.24797 4.92041 9.306 5.08573 9.4125 5.21875L11.4375 7.75H2.25Z" fill="#FFCA0E"/></svg></button></div><div class="change_task_buttons"><div class="cancle_change_task_button">Cancel</div><div class="add_change_task_button">Change  task</div></div></div></div></div></div>`
        Body.insertAdjacentHTML('beforeend', ChangePopUp);
        const ChagePopUp = document.querySelector('.task-change_pop-up')

    }
}

Body.addEventListener('click', function (event) {

    if (event.target.classList == 'add_change_task_button') {
        const parentNode = event.target.closest('.task-change_pop-up')
        const TaskId = Number(parentNode.id)
        const task = tasks.find(function (task) {
            if (task.id === TaskId) {
                return true
            }
        })
        const ChangeName = document.querySelector("#ChangeName")
        const ChangeDesription = document.querySelector("#ChangeDesription")
        const ChangeDeadline = document.querySelector("#ChangeDeadline")
        task.name = ChangeName.value
        task.desription = ChangeDesription.value
        task.deadline = ChangeDeadline.value
        task.done = false

        parentNode.remove()
        SaveTolocalStorage()
        reset()
        location.reload();
    }
    if (event.target.classList == 'cancle_change_task_button') {
        const parentNode = event.target.closest('.task-change_pop-up')
        parentNode.remove()
        reset()

    }
})



function DeleteTask(event) {

    if (event.target.classList == 'task_Delete_Button') {
        const parentNode = event.target.closest('.task_Body')
        const TaskId = Number(parentNode.id)
        const index = tasks.findIndex(function (task) {
            return task.id === TaskId
        })
        tasks.splice(index, 1)
        parentNode.remove()
    }

    SaveTolocalStorage()
}

function DoneTask(event) {
    if (event.target.classList == 'task_checkbox') {
        const parentNode = event.target.closest('.task_Body')
        const TaskId = Number(parentNode.id)

        const task = tasks.find(function (task) {
            if (task.id === TaskId) {
                return true
            }
        })

        task.done = !task.done
        parentNode.classList.add('DoneTask')
        SaveTolocalStorage()

    }
}

function ShowTaskMaker() {
    TaskMakerWindow.style.display = 'block'
    TaskName.focus()

        

}

function CloseWindow() {
    TaskMakerWindow.style.display = 'none'
    TaskName.value = ""
    TaskDesription.value = ""
    TaskDay.value = ""

}

function renderTask(task) {
    const MakePriority = task.Priority ? "Priority" : ""
    const cssClass = task.done ? "task_Body task_Body--done" : "task_Body"

    const taskHtml = ` <div id="${task.id}" class="${cssClass} "> <div class="task"> <input class="task_checkbox" type="radio"> <div class="task_text"> <p id="${MakePriority}" class="task_name">${task.name} </p> <p class="task_desription">${task.desription}</p> <p class="task_deadline">${task.deadline}</p> </div> </div> <div class="task_buttons"> <svg class="task_Edit_Button" width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.0533 3.69778L11.4444 1.07556C11.272 0.904029 11.0387 0.807739 10.7956 0.807739C10.5524 0.807739 10.3191 0.904029 10.1467 1.07556L0.897773 10.3111L0.053328 13.9556C0.0241975 14.0888 0.0251962 14.2268 0.0562508 14.3596C0.0873055 14.4924 0.147632 14.6166 0.232823 14.7231C0.318014 14.8296 0.425917 14.9157 0.548651 14.9751C0.671384 15.0346 0.805847 15.0658 0.942217 15.0667C1.00576 15.0731 1.06979 15.0731 1.13333 15.0667L4.81777 14.2222L14.0533 4.99556C14.2249 4.82316 14.3211 4.58986 14.3211 4.34667C14.3211 4.10347 14.2249 3.87018 14.0533 3.69778V3.69778ZM4.37333 13.4222L0.919995 14.1467L1.70666 10.76L8.62666 3.86667L11.2933 6.53333L4.37333 13.4222ZM11.8889 5.88889L9.22222 3.22222L10.7689 1.68444L13.3911 4.35111L11.8889 5.88889Z" fill="#F1F1F1" /> </svg> <svg class="task_Delete_Button" width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M7.52 0.333328C7.79984 0.333401 8.07256 0.421519 8.29954 0.5852C8.52651 0.748881 8.69624 0.979828 8.78467 1.24533L9.14667 2.33333H11.3333C11.5101 2.33333 11.6797 2.40357 11.8047 2.52859C11.9298 2.65361 12 2.82318 12 2.99999C12 3.17681 11.9298 3.34638 11.8047 3.4714C11.6797 3.59642 11.5101 3.66666 11.3333 3.66666L11.3313 3.714L10.7533 11.8093C10.7173 12.3137 10.4915 12.7858 10.1214 13.1304C9.75126 13.475 9.26436 13.6666 8.75867 13.6667H3.24133C2.73564 13.6666 2.24874 13.475 1.87864 13.1304C1.50855 12.7858 1.28274 12.3137 1.24667 11.8093L0.668667 3.71333C0.66746 3.6978 0.666793 3.68224 0.666667 3.66666C0.489856 3.66666 0.320286 3.59642 0.195262 3.4714C0.0702379 3.34638 0 3.17681 0 2.99999C0 2.82318 0.0702379 2.65361 0.195262 2.52859C0.320286 2.40357 0.489856 2.33333 0.666667 2.33333H2.85333L3.21533 1.24533C3.3038 0.97972 3.47362 0.748696 3.70073 0.585005C3.92784 0.421314 4.20071 0.333261 4.48067 0.333328H7.51933H7.52ZM9.998 3.66666H2.002L2.57667 11.714C2.58863 11.8821 2.66385 12.0395 2.78717 12.1544C2.9105 12.2693 3.07277 12.3332 3.24133 12.3333H8.75867C8.92723 12.3332 9.0895 12.2693 9.21283 12.1544C9.33615 12.0395 9.41137 11.8821 9.42333 11.714L9.998 3.66666ZM4.66667 5.66666C4.82996 5.66668 4.98756 5.72663 5.10958 5.83514C5.23161 5.94364 5.30956 6.09316 5.32867 6.25533L5.33333 6.33333V9.66666C5.33315 9.83658 5.26808 10 5.15143 10.1236C5.03479 10.2471 4.87536 10.3215 4.70574 10.3314C4.53611 10.3414 4.36908 10.2862 4.23878 10.1772C4.10848 10.0681 4.02474 9.91339 4.00467 9.74466L4 9.66666V6.33333C4 6.15652 4.07024 5.98695 4.19526 5.86192C4.32029 5.7369 4.48986 5.66666 4.66667 5.66666V5.66666ZM7.33333 5.66666C7.51014 5.66666 7.67971 5.7369 7.80474 5.86192C7.92976 5.98695 8 6.15652 8 6.33333V9.66666C8 9.84347 7.92976 10.013 7.80474 10.1381C7.67971 10.2631 7.51014 10.3333 7.33333 10.3333C7.15652 10.3333 6.98695 10.2631 6.86193 10.1381C6.7369 10.013 6.66667 9.84347 6.66667 9.66666V6.33333C6.66667 6.15652 6.7369 5.98695 6.86193 5.86192C6.98695 5.7369 7.15652 5.66666 7.33333 5.66666V5.66666ZM7.52 1.66666H4.48L4.258 2.33333H7.742L7.51933 1.66666H7.52Z" fill="#F1F1F1" /> </svg> </div> </div>`

    TasksList.insertAdjacentHTML('beforeend', taskHtml);
}
function SaveTolocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function reset() {
    //reset 
    TaskName.value = ""
    TaskDesription.value = ""
    TaskDay.value = ""
    PriorityStatus = false
    Priority.style.background = 'none'
    //reset 
}
