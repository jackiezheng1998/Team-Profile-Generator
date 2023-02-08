// Import NPM packages
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

// Import classes
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

// Output Directory
const DIST_DIR = path.resolve(__dirname, 'dist');
// Output file path and name
const outputPath = path.join(DIST_DIR, 'index.html');

// Import HTML template
const templateHTML = require('./src/template');

// Create an empty array of team members
const teamMembers = [];

/*Add Team Members*/

function addTeamMember() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'what_team_member',
                message: 'Add an engineer, add an intern or finish building your team?',
                choices: ['Engineer', 'Intern', 'Finish building my team, ASSEMBLE!'],
            },
        ])
        .then((val) => {
            if (val.what_team_member === 'Engineer') {
                addEngineer();
            } else if (val.what_team_member === 'Intern') {
                addIntern();
            } else {
                createTeamFile();
            }
        });
}

/* Employee Types */

/*Manager Data Inputs*/
function addManager() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the team manager?',
            },
            {
                type: 'input',
                name: 'id',
                message: 'Employee ID of the team manager?',
            },
            {
                type: 'input',
                name: 'email',
                message: 'Email address of the team manager?',
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: 'What is the office number of the team manager?',
            },
        ])
        .then((val) => {
            const manager = new Manager(val.name, val.id, val.email, val.officeNumber);
            console.table(manager);
            teamMembers.push(manager);
            addTeamMember();
        });
}

/*Engineer data inputs*/
function addEngineer() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: `What is the engineers's name`,
            },
            {
                type: 'input',
                name: 'id',
                message: `What is the engineer's employee ID?`,
            },
            {
                type: 'input',
                name: 'email',
                message: `What is the engineer's email address?`,
            },
            {
                type: 'input',
                name: 'gitHub',
                message: `What is the engineer's github username?`,
            },
        ])
        .then((val) => {
            const engineer = new Engineer(val.name, val.id, val.email, val.gitHub);
            console.table(engineer);
            teamMembers.push(engineer);
            addTeamMember();
        });
}

/* Intern data inputs */
function addIntern() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: `What is the Intern's name`,
            },
            {
                type: 'input',
                name: 'id',
                message: `What is the Intern's employee ID?`,
            },
            {
                type: 'input',
                name: 'email',
                message: `What is the Intern's email address?`,
            },
            {
                type: 'input',
                name: 'school',
                message: `What is the Intern's school?`,
            },
        ])
        .then((val) => {
            const intern = new Intern(val.name, val.id, val.email, val.school);
            console.table(intern);
            teamMembers.push(intern);
            addTeamMember();
        });
}

/* Create the html file */

function createTeamFile() {
    if (!fs.existsSync(DIST_DIR)) {
        fs.mkdirSync(DIST_DIR);
    } else {
        fs.writeFileSync(outputPath, templateHTML(teamMembers), 'utf-8');
        console.log('HTML file created in the dist folder');
    }
}

/* Start | PLEASE WORK */

function startApp() {
    addManager();
}

startApp();