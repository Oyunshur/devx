class person {
  constructor(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

const person1 = new person("John", 30, "male");
const person2 = new person("Jane", 25, "female");

class student extends person {
  constructor(name, age, gender, studentid) {
    super(name, age, gender);
    this.studentid = studentid;
  }
}
const student1 = new student("Oyunshur", 18, "female", "12345");

console.log(student1);
// const person = new object();
// person.name = "John";
// person.age = 30;

// const student = {
//     name:
// }
