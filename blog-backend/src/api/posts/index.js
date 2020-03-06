import Router from 'koa-router';
import * as postsControl from './posts.ctrl.js';

const posts = new Router();

posts.get('/', postsControl.list);
posts.post('/', postsControl.write);
posts.get('/:id', postsControl.read);
posts.delete('/:id', postsControl.remove);
posts.put('/:id', postsControl.replace);
posts.patch('/:id', postsControl.update);

export default posts;
