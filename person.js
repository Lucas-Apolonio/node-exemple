class Person {
    constructor(name) {
        this.name = name;
    }

    sayMyName(){
        return `My name is ${this.name} e tenho 28 anos`
    }
}

module.exports = {
    Person
}