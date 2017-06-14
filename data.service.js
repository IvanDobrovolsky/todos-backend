class Task {
    constructor (id, summary, description, date, status) {
        this.id = id;
        this.summary = summary;
        this.description = description;
        this.date = date;
        this.status = status;
    }
}

const tasks = [
    new Task(
        1,
        'As a manager I want to know why we need the migration',
        'Be it AngularJS or Angular2 for me end users the project and business logic are the SAME, why the hell we need to spend a lot of money and time on that?',
        Date.now(),
        'todo'
    ),
    new Task(
        2,
        'As a developer I need to know when Angular2 shines and what cool features it has',
        'People say Angular 2 has brought a lot of features, what are features and what I have to know about Angular world?',
        Date.now(),
        'todo'
    ),
    new Task(
        3,
        'As a developer I need to be familiar with AngularJS',
        'It is not serious to ask in 2017! AngularJS is still very nice and you are obligated to know it!',
        Date.now(),
        'done'
    ),
    new Task(
        4,
        'As a developer I need to be familiar with Angular2 features',
        'Well, Angular2 is no longer a new framework, but I might not have any hands-on experience with it',
        Date.now(),
        'doing'
    )
];


function addNewTask(task) {
    tasks.push(task);
}

function updateTask(id, task) {
    const index = tasks.findIndex(item => item.id == id);

    tasks[index] = task;
}

function removeTask(id) {
    const index = tasks.findIndex(item => item.id == id);

    tasks.splice(index, 1);
}

function getAllTasks() {
    return tasks;
}

function getTaskById(id) {
    const index = tasks.findIndex(item => item.id == id);

    return tasks[index];
}

module.exports = function () {
    return {
        getAllTasks,
        getTaskById,
        addNewTask,
        updateTask,
        removeTask
    }
};
