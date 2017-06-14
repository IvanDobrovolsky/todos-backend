const dataService = require('../data.service')();

module.exports = (server) => {
    server.route({
        method: 'GET',
        path:'/api/tasks',
        handler: (request, reply) => {
            dataService.getAllTasks()
                .then(data => reply({data}))
                .catch(error => reply({error}));
        }
    });

    server.route({
        method: 'GET',
        path:'/api/tasks/{taskId}',
        handler: (request, reply) => {
            const { taskId } = request.params;

            dataService.getTaskById(taskId)
                .then(data => reply({data}))
                .catch(error => reply({error}));
        }
    });

    server.route({
        method: 'POST',
        path:'/api/tasks',
        handler: (request, reply) => {
            const { payload } = request;

            dataService.addNewTask(payload)
                .then(data => reply({status: 201, data}))
                .catch(error => reply({error}));
        }
    });

    server.route({
        method: 'DELETE',
        path:'/api/tasks/{taskId}',
        handler: (request, reply) => {
            const { taskId } = request.params;

            dataService
                .removeTask(taskId)
                .then(data => reply({status: 200, data}))
                .catch(error => reply({error}));
        }
    });

    server.route({
        method: 'PUT',
        path:'/api/tasks/{taskId}',
        handler: (request, reply) => {
            const { taskId } = request.params;
            const { payload } = request;

            dataService
                .updateTask(taskId, payload)
                .then(updated => reply({status: 200, updated: payload}))
                .catch(error => reply({error}));
        }
    });
};
