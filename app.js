const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// Start of Question
const continueQuest = {
    type: 'input',
    name: 'continue',
    message: "Do you wish to add an employee?",
    choices: ['yes', 'no']
}
// Questions to ask for employee 
const questionOptions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the employee\'s name?'
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is the employee\'s id?'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the employee\'s email?'
    },
    {
        type: 'list',
        name: 'role',
        message: 'What is the employee\'s role?',
        choices: ['Intern', 'Engineer', 'Manager']
    },
];
//Questions to ask what place they have credit at
const followUpQuest = [
    {
        type: 'input',
        name: 'info',
        message: 'What is the intern\'s school?'
    },
    {
        type: 'input',
        name: 'info',
        message: 'What is the engineer\'s github?'
    },
    {
        type: 'input',
        name: 'info',
        message: 'What is the manager\'s office number?'
    }
];
const employees = [];
writeOutput =() => {
    if(!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(employees), "utf-8")
}

    async function askQuestions() {
        let continueAsking = true;
        while(continueAsking){
            let answers = await inquirer.prompt(questionOptions);
            switch (answers.role) {
                case 'Intern':
                    {
                        const followUp = await inquirer.prompt(followUpQuest[0]);
                        var intern = new Intern (answers.name, answers.id, answers.email, answers.role, followUp.info);
                        employees.push(intern);
                    }
                    break;
                case 'Engineer': 
                    {
                        const followUp = await inquirer.prompt(followUpQuest[1]);
                        var engineer = new Engineer (answers.name, answers.id, answers.email, answers.role, followUp.info);
                        employees.push(engineer);
                    }
                    break;
                case 'Manager':
                    {
                        const followUp = await inquirer.prompt(followUpQuest[2]);
                        var manager = new Manager (answers.name, answers.id, answers.email, answers.role, followUp.info);
                        employees.push(manager);
                }
                break;
        }

        let continueAnswer = await inquirer.prompt(continueQuest);
        continueAsking = continueAnswer.continue.toLowerCase() === 'yes', 'no';
    }

    writeOutput();
}

askQuestions();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
