interface Student {
    firstName: string,
    lastName: string
}

class Student {
    fullName: string;
    constructor (public firstName: string, public lastName: string) {
        this.fullName = firstName + lastName
    }
}

function greeter (student: Student) {
    return "Hello," + student.fullName
}

let student = new Student("Wang", "junping");

document.body.innerHTML = greeter(student);