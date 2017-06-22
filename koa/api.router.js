const api = require('koa-router')();
const dataService = require('../data.service')();

api.get('/api/tasks', async (ctx, next) => {
   ctx.body = await dataService.getAllTasks();

   return next;
});

api.get('/api/tasks/:id', async (ctx, next) => {
   const taskId = ctx.params.id;

   try {
       ctx.body = await dataService.getTaskById(taskId);
   } catch (error) {
       ctx.body = `<h1 style="color: red">Not task found for id ${taskId}!</h1>`;
   }

   return next;
});

api.post('/api/tasks', async (ctx, next) => {
    const task = ctx.request.body;

    try {
        ctx.body = {status: 201, data: await dataService.addNewTask(task)}
    } catch (error) {
        ctx.body = `<h1 style="color: red">${error}</h1>`;
    }

   return next;
});

api.put('/api/tasks/:id', async (ctx, next) => {
    const task = ctx.request.body;
    const taskId = ctx.params.id;

    try {
        ctx.body = {status: 201, data: await dataService.updateTask(taskId, task)}
    } catch (error) {
        ctx.body = `<h1 style="color: red">${error}</h1>`;
    }

    return next;
});

api.delete('/api/tasks/:id', async (ctx, next) => {
    const taskId = ctx.params.id;

    try {
        ctx.body = {status: 201, data: await dataService.removeTask(taskId)}
    } catch (error) {
        ctx.body = `<h1 style="color: red">${error}</h1>`;
    }

    return next;
});

api.get('*', async (ctx, next) => {
    ctx.body = `<h1 style="color: red">The server doesn't handle such route</h1>`;

    return next;
});

module.exports = api;

