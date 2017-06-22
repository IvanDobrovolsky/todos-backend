const dataService = require('../data.service')();

module.exports = (app, express) => {
    const apiRouter = express.Router();

    //Middleware for Logging each request to the console
    apiRouter.use((request, response, next) => {
        console.log(request.method, `/api${request.url}`);
        next();
    });


    apiRouter.get('/tasks', (request, response) => {
        dataService.getAllTasks()
            .then(data => response.json({data}))
            .catch(error => response.json({error}));
    });

    apiRouter.post('/tasks', (request, response) => {
        const task = request.body;

        dataService.addNewTask(task)
            .then(data => response.json({status: 201, data}))
            .catch(error => response.json({error}));
    });

    apiRouter.get('/tasks/:id', (request, response) => {
        const id = request.params.id;

        dataService.getTaskById(id)
            .then(data => response.json({data}))
            .catch(error => response.json({error}));
    });

    apiRouter.put('/tasks/:id', (request, response) => {
        const id = request.params.id;
        const task = request.body;

        dataService
            .updateTask(id, task)
            .then(updated => response.json({status: 200, updated: task}))
            .catch(error => response.json({error}));
    });


    apiRouter.delete('/tasks/:id', (request, response) => {
        const id = request.params.id;

        dataService
            .removeTask(id)
            .then(data => response.json({status: 200, data}))
            .catch(error => response.json({error}));
    });

    return apiRouter;
};