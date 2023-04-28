let tasks = document.getElementById('tasks')
let tarefas = []
console.log(JSON.parse(localStorage.getItem('tasks')))
if(JSON.parse(localStorage.getItem('tasks')==null)){
    localStorage.setItem('tasks', "[]")
}
if(JSON.parse(localStorage.getItem('tasks')).length >0){
    tarefas_from_localStorage = JSON.parse(localStorage.getItem('tasks'))
    tarefas_from_localStorage.forEach(element => {
        criarTask(element)
    });
}

//console.log(JSON.parse(localStorage.getItem('tasks')).length)
//
const input_new_task = document.getElementById("input-new-task")
let cont_id = 0
input_new_task.addEventListener('keypress', (event) => {
    let new_task_value;
    let new_task;
    if (event.key === 'Enter') {
        if (input_new_task.value.trim() != "") {
            event.preventDefault()
            new_task_value = input_new_task.value
            input_new_task.value = ""
            criarTask(new_task_value)
            
        }
    }
})

function criarTask(new_task_value){
    new_task = document.createElement('div')
    new_task.innerHTML = new_task_value
    new_task.setAttribute('draggable', true);
    new_task.classList.add('task')
    new_task.addEventListener('dragstart', function(e){
        e.dataTransfer.setData("text", e.target.innerHTML)
    })
    new_task.addEventListener('dragover', function (e) {
        e.preventDefault()
    })
    new_task.addEventListener('drop', function(e){
        e.preventDefault()
    })
    tasks.appendChild(new_task)
    tarefas.push(new_task_value)
    localStorage.setItem('tasks', JSON.stringify(tarefas));
}



let trash_icon = document.getElementById("trash-div")
console.log(trash_icon)
trash_icon.addEventListener('dragover', function (e) {
    e.preventDefault()
})
trash_icon.addEventListener('drop', function (e) {
    e.preventDefault()
    let value_drop = e.dataTransfer.getData("text")
    let list_task = document.getElementsByClassName('task')
    for (let i = 0; i < list_task.length; i++) {
        
        if(list_task[i].innerHTML === value_drop){
            list_task[i].remove()
            break;
        }
    }
    for(let j =0; j<tarefas.length; j++){
        if(tarefas[j]===value_drop){
            console.log("achou")
            tarefas.splice(j,1)
            localStorage.setItem('tasks', JSON.stringify(tarefas));
            break;
        }
    }
})
