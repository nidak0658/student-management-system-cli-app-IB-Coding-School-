#! /usr/bin/env node
import inquirer from "inquirer";
// Our setup is ready we can start now
console.log("Welcome to Student Management System!\n");
// Creating a class of student
class Student {
    name;
    // Properties  
    static idCounter = 0;
    studentID;
    courses = [];
    balance = 0;
    constructor(name) {
        this.name = name;
        Student.idCounter++;
        this.studentID = this.generateStudentID();
    }
    generateStudentID() {
        return 10000 + Student.idCounter; // 10001, 10002 and so on
    }
    enrollCourse(course) {
        this.courses.push(course);
        this.balance += 1000; // each course fees is 1000
    }
    viewBalance() {
        return this.balance; // pending balance of a student
    }
    payCoursesFee(amount) {
        this.balance -= amount; // the balance of student will - amount paid by student
    }
    showStatus() {
        console.log(`
      Name: ${this.name}
      Student ID: ${this.studentID}
      Courses Enrolled: ${this.courses.join(", ")}
      Balance: ${this.balance}
    `);
    }
    getStudentID() {
        return this.studentID;
    }
    getName() {
        return this.name;
    }
}
// Class end here
const students = []; // students list will be stored here
// MainMenu Start
async function mainMenu() {
    const userInputMenu = await inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: "Select your Menu!",
        choices: [
            "1. Add New Student",
            "2. Enroll Student In Course",
            "3. View Student Balance",
            "4. Pay Course Fees",
            "5. Show Student Status",
            "6. End Menu"
        ]
    });
    // Destructuring
    const { menu } = userInputMenu;
    if (menu === "1. Add New Student")
        await addNewStudent();
    if (menu === "2. Enroll Student In Course")
        await enrollStudent();
    if (menu === "3. View Student Balance")
        await viewBalance();
    if (menu === "4. Pay Course Fees")
        await payTuition();
    if (menu === "5. Show Student Status")
        await showStatus();
    if (menu === "6. End Menu") {
        console.log(`Thank you for using Student Management System\n`);
        process.exit();
    }
    mainMenu();
}
// MainMenu Ends
// Start creating functions
// AddNewStudent Start Here
async function addNewStudent() {
    const userInput = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: "Enter Student Name here!"
    });
    const student = new Student(userInput.name);
    students.push(student);
    console.log(`Student ${student.getName()} added with ID ${student.getStudentID()}\n`);
}
// AddNewStudent Ends Here
// EnrollStudent Start Here
async function enrollStudent() {
    const student = await selectStudent(); // we will create this function after
    if (student) {
        const userInput = await inquirer.prompt({
            type: 'list',
            name: 'course',
            message: "Select courses to enroll",
            choices: ["TypeScript", "JavaScript", "Python", "Next.js"]
        });
        student.enrollCourse(userInput.course);
        console.log(`Successfully Enrolled in Course: ${userInput.course}`);
    }
}
// EnrollStudent Ends Here
// ViewBalance Start Here
async function viewBalance() {
    const student = await selectStudent();
    if (student) {
        console.log(`Balance: ${student.viewBalance()}`);
    }
}
// ViewBalance Ends Here
// PayTuition Starts Here
async function payTuition() {
    const student = await selectStudent();
    if (student) {
        const userInput = await inquirer.prompt({
            type: 'input',
            name: 'amount',
            message: "Enter amount you want to pay?"
        });
        student.payCoursesFee(parseFloat(userInput.amount));
        console.log(`Paid ${userInput.amount}. Balance remaining ${student.viewBalance()}`);
    }
}
// PayTuition Ends Here
// ShowStatus Start Here
async function showStatus() {
    const student = await selectStudent();
    if (student) {
        student.showStatus();
    }
}
// ShowStatus Ends Here
// SelectStudent Start Here
async function selectStudent() {
    if (students.length === 0) {
        console.log('No Students record available.\n');
    }
    else {
        const stdSelect = await inquirer.prompt({
            type: 'list',
            name: 'stdID',
            message: "Select a student!",
            choices: students.map((std) => ({
                name: std.getName(),
                value: std.getStudentID()
            }))
        });
        return (students.find((std) => std.getStudentID() === stdSelect.stdID) || null);
    }
}
// SelectStudent Ends Here
mainMenu();
