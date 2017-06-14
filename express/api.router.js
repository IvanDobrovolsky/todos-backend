const dataService = require('../data.service')();

module.exports = (app, express) => {
    const apiRouter = express.Router();

    //Middleware for Logging each request to the console
    apiRouter.use((request, response, next) => {
        console.log(request.method, `/api${request.url}`);
        next();
    });


    apiRouter.get('/tasks', (request, response) => {
        response.json({data: dataService.getAllTasks()});
        response.status(200);
    });

    apiRouter.post('/tasks', (request, response) => {
        const task = request.body;

        dataService.addNewTask(task);

        response.json({status: 200});
    });

    apiRouter.get('/tasks/:id', (request, response) => {
        const id = request.params.id;

        response.json({data: dataService.getTaskById(id)});
    });

    apiRouter.put('/tasks/:id', (request, response) => {
        const id = request.params.id;
        const task = request.body;
        console.log(task);

        dataService.updateTask(id, task);
        response.json({status: 200});
    });


    apiRouter.delete('/tasks/:id', (request, response) => {
        const id = request.params.id;

        dataService.removeTask(id);
        response.json({status: 200});
    });

    return apiRouter;
};