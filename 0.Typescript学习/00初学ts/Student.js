var Student = /** @class */ (function () {
    function Student(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + lastName;
    }
    return Student;
}());
function greeter(student) {
    return "Hello," + student.fullName;
}
var student = new Student("Wang", "junping");
document.body.innerHTML = greeter(student);
