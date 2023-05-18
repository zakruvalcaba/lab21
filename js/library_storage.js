const storagePrototype = {
    get: function () {
        let str = localStorage.getItem(this.key) || ''
        return (str === '') ? [] : str.split('|')
    },
    set: function (arr) {
        if (Array.isArray(arr)) {
            let str = arr.join('|')
            localStorage.setItem(this.key, str)
        }
    },
    clear: function () {
        localStorage.setItem(this.key, '')
    }
}
const getTaskStorage = function (key) {
    let storage = Object.create(storagePrototype)
    storage.key = key
    return storage
}