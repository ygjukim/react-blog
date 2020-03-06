const Router = require('koa-router');
const postsControl = require('./posts.ctrl');

const posts = new Router();

posts.get('/', postsControl.list);
posts.post('/', postsControl.write);
posts.get('/:id', postsControl.read);
posts.delete('/:id', postsControl.remove);
posts.put('/:id', postsControl.replace);
posts.patch('/:id', postsControl.update);

module.exports = posts;
