let tasks = [];

let task = document.querySelector("input")
let ul = document.querySelector("ul")
let addtask = ()=>{
    tasks.push(task.value)

    let li = document.createElement('li')
    li.className = "li"
    li.textContent = task.value.trim()
    ul.appendChild(li)
}

let btn = document.querySelector("#add")

btn.addEventListener("click",(e)=>{
    e.preventDefault()
    addtask()
    task.value = ""
})

