const tasklist = {
    tasks: [],
    storage: getTaskStorage('tasks_12345'),
    displayDiv: null,
    deleteClickHandler: null,
    load: function() {
        if (this.tasks.length === 0) {
            this.tasks = this.storage.get()
        }
    },
    save: function () {
        this.storage.set(this.tasks)
    },
    sort: function () {
        this.tasks.sort()
    },
    add: function (task) {
        this.tasks.push(task.toString())
    },
    deleteTask: function (i) {
        this.sort()
        this.tasks.splice(i, 1)
    },
    clear: function () {
        this.tasks.length = 0
        this.storage.clear()
        this.displayDiv.innerHTML = ''
    },
    display: function () {
        let html = ''
        let links

        this.sort()

        for (let i in this.tasks) {
            html += 
                `
                    <p>
                    <a href='#' title=${i}>Delete</a> ${this.tasks[i]}
                    </p>
                `
        }
        this.displayDiv.innerHTML = html

        links = this.displayDiv.getElementsByTagName('a')
        for (let i = 0; i < links.length; i++) {
            if (links[i].innerHTML === 'Delete') {
                links[i].onclick = this.deleteClickHandler
            } else {
                links[i].onclick = this.editClickHandler
            }
        }
    }
}