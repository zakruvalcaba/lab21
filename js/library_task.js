const Task = function (task) {
    this.text = task
}
Task.prototype.isValid = function () {
    if (this.text === '') {
        return false
    } else {
        return true
    }
}
Task.prototype.toString = function () {
    let first = this.text.substring(0, 1)
    return first.toUpperCase() + this.text.substring(1)
}