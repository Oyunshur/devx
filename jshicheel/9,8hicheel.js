const student = {
  name: "Oyunshur",
  lastname: "Purevdash",
  age: 18,
  isStudent: true,
  greet: function () {
    console.log(
      `hello! My name is ${this.name} ${this.lastname}. I am ${this.age} years old.`,
    );
  },
};

student.greet();
