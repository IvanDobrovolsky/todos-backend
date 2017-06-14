const dataService = require('../data.service')();

module.exports = (server) => {
    server.route({
        method: 'GET',
        path:'/api/tasks',
        handler: (request, reply) => {
            return reply({data: dataService.getAllTasks()});
        }
    });

    server.route({
        method: 'GET',
        path:'/api/tasks/{taskId}',
        handler: (request, reply) => {
            const { taskId } = request.params;

            return reply({data: dataService.getTaskById(taskId)});
        }
    });


    server.route({
        method: 'POST',
        path:'/api/tasks',
        handler: (request, reply) => {
            const { payload } = request;

            dataService.addNewTask(payload);

            return reply({success: true})
                .code(201);
        }
    });

    server.route({
        method: 'DELETE',
        path:'/api/tasks/{taskId}',
        handler: (request, reply) => {
            const { taskId } = request.params;

            dataService.removeTask(taskId);

            return reply({success: true})
                .code(200);
        }
    });

    server.route({
        method: 'PUT',
        path:'/api/tasks/{taskId}',
        handler: (request, reply) => {
            const { taskId } = request.params;
            const { payload } = request;

            dataService.updateTask(taskId, payload);

            return reply({success: true, updated: dataService.getTaskById(taskId)})
                .code(200);
        }
    });
};
