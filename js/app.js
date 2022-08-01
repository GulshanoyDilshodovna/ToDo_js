const formCreate = document.getElementById('form-create')
const formEdit = document.getElementById('form-edit')
const listGroupTodo = document.getElementById('list-group-todo')
// const messageCreate = document.getElementById('message-create')
const time = document.getElementById('time')
const modal = document.getElementById('modal')
const overlay = document.getElementById('overlay')
/* time elements */
const fullDay = document.getElementById('full-day')
const hourEl = document.getElementById('hour')
const minuteEl = document.getElementById('minute')
const secondEl = document.getElementById('second')
const closeEl = document.getElementById('close')


//check
let editItemId
let todos = JSON.parse(localStorage.getItem('list'))?JSON.parse(localStorage.getItem('list')):[]

if(todos.length) showTodos()

//LOCALSTORAGE
function setTodos(){
    localStorage.setItem('list', JSON.stringify(todos))
}

//GET TIME
function getTime(){
    const now = new Date()
    const year = now.getFullYear()
    const month = +now.getMonth()+1   <10? '0' + now.getMonth() : now.getMonth()
    const day = now.getDay() <10? '0' + now.getDay():now.getDay()
    const second = now.getSeconds() <10? '0' + now.getSeconds():now.getSeconds()
    const minute = now.getMinutes() <10? '0' + now.getMinutes():now.getMinutes()
    const hours = now.getHours()<10? '0' + now.getHours():now.getHours()
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
    const mon = now.getMonth()
    fullDay.innerHTML = `${day} ${months[mon]} ${year}`
    hourEl.innerHTML  = hours
    minuteEl.innerHTML = minute
    secondEl.innerHTML = second

    return `${hours}:${minute}, ${day}  ${month} ${year}`
}

setInterval(getTime, 1000)

//SHOW TODOS
function showTodos(){
    const todos = JSON.parse(localStorage.getItem('list'))
    listGroupTodo.innerHTML = ''
    todos.forEach((item, i) => {
        listGroupTodo.innerHTML += `
        <li  ondblclick="setCompleted(${i})"  class="list-group-item d-flex justify-content-between ${item.completed == true ? 'complated' : ''}">
        ${item.text}
        <div class="todo-icons">
          <span class="opacity-50 me-2">${item.time}</span>
          <img src="img/edit.svg" alt="edit icon" width="25" height="25"  onclick="editTodo(${i})">
          <img  src="img/delete.svg" alt="delete icon" width="25" height="25" onclick="deleteTodo(${i})">
        </div>
        </li>
        `
    });
}


//FUNCTION SHOW MESSAGE 
function showMessage(where, message){
document.getElementById(`${where}`).textContent = message
setTimeout(() => {
document.getElementById(`${where}`).textContent = ''
}, 2000);
}

//GET TODOS
formCreate.addEventListener('submit', (e)=>{
    e.preventDefault()
    let todoText = formCreate['input-create'].value.trim()
    formCreate.reset()
    if(todoText.length){
        todos.push({ text: todoText, time: getTime(), completed: false})
        setTodos()
        showTodos()
    }
    else{
        showMessage('message-create', 'Please, enter some text ... ')
    }
})

//DELETE TODO
function deleteTodo(id){
    const deletedTodo = todos.filter((item, i)=>{
        return id !== i 
    })
    todos = deletedTodo
    setTodos()
    showTodos()
}

//COMPLETED TODO
function setCompleted(id){
const completedTodo = todos.map((item, i)=>{
    if(id == i ){
        return {...item, completed: item.completed == true? false:true}
    }else {
        return {...item}
    }
})
todos = completedTodo
setTodos()
showTodos()
}

//EDIT FORM
formEdit.addEventListener('submit',(e)=>{
    e.preventDefault()
    let todoText = formEdit['input-edit'].value.trim()
    formEdit.reset()
    if(todoText.length){
        todos.splice(editItemId, 1, { text: todoText, time: getTime(), completed: false})
        setTodos()
        showTodos()
        close()
    }
    else{
        showMessage('message-edit', 'Please, enter some text ... ')
    }
})

//EDIT TODO
function editTodo(id){
    open()
    editItemId = id
}

//overlay click
overlay.addEventListener('click', close)
closeEl.addEventListener('click', close)


//
document.addEventListener('keydown', (e)=>{
if(e.which == 27) close()
})

//open function
function open(){
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

//close function
function close(){
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}