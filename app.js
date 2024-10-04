let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
    const storedtasks = JSON.parse(localStorage.getItem('tasks'))

    if (storedtasks) {
        storedtasks.forEach((task) => tasks.push(task))
        updateTask()
        updateStats()
    }
})

let task = document.querySelector("input")

let ul = document.querySelector("ul")

let addtask = () => {
    let text = task.value.trim()
    if (text) {
        tasks.push({ task: text, completed: false })

        task.value = ""
        updateTask()
        updateStats()
        savetask()
    }

    console.log(tasks)
}


const savetask = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

let btn = document.querySelector("#add")

btn.addEventListener("click", (e) => {
    e.preventDefault()
    addtask()
    updateTask()
})


const toggletaskcomplete = (index) => {
    tasks[index].completed = !tasks[index].completed
    updateTask()
    updateStats()
    savetask()
}

const delTask = (index) => {
    tasks.splice(index, 1)
    updateTask()
    updateStats()
    savetask()
}

const editTask = (index) => {
    const taskinput = document.querySelector("input")
    taskinput.value = tasks[index].task
    tasks.splice(index, 1)
    updateTask()
    updateStats()
    savetask()
}

const updateStats = () => {
    const completedTasks = tasks.filter((task) => task.completed).length
    const totalTasks = tasks.length
    const progress = (completedTasks / totalTasks) * 100
    let prog = document.querySelector("#progress-count")
    prog.style.width = `${progress}%`

    document.getElementById("numbers").innerText = `${completedTasks} / ${totalTasks}`
    if (tasks.length && completedTasks === totalTasks) {
        blast()
    }
}



const updateTask = () => {
    ul.innerHTML = ""
    tasks.forEach((task, index) => {
        let li = document.createElement("li")
        console.log(index)
        li.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed' : ''}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
                <p class="lip ${task.completed ? 'completed' : ''}">${task.task}</p>
            </div>
            <div class="icons">
                <i class="fa-regular fa-pen-to-square first" onclick="editTask(${index})"></i>
                <i class="fa-solid fa-trash del" onclick="delTask(${index})"></i>
            </div>
        </div>
        `
        li.addEventListener("change", () => toggletaskcomplete(index))
        ul.appendChild(li)

    })
    
}


const blast = () => {
    const duration = 15 * 1000,
        animationEnd = Date.now() + duration,
        defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // since particles fall down, start a bit higher than random
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            })
        );
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            })
        );
    }, 250);
}


