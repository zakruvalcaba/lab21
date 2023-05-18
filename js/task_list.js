const $ = (id) => document.getElementById(id)

const addToTaskList = function () {
    let taskTextBox = $('task')
    let newTask = new Task(taskTextBox.value)
    if (newTask.isValid()) {
        tasklist.add(newTask)
        tasklist.save()
        tasklist.display()
        taskTextBox.value = ''
    } else {
        alert('Please enter a task.')
    }
    taskTextBox.focus()
}

const clearTaskList = function () {
    tasklist.clear()
    $('task').focus()
}

const deleteFromTaskList = function () {
    tasklist.deleteTask(this.title)
    tasklist.save()
    tasklist.display()
    $('task').focus()
}

window.addEventListener('load', () => {
    $('add_task').onclick = addToTaskList
    $('clear_tasks').onclick = clearTaskList

    tasklist.displayDiv = $('tasks')
    tasklist.deleteClickHandler = deleteFromTaskList

    tasklist.load()
    tasklist.display()
    $('task').focus()
})