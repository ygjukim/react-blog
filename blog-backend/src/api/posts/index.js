import Router from 'koa-router';
import * as postsControl from './posts.ctrl.js';
import checkLoggedIn from '../../lib/checkLoggedIn.js';

const posts = new Router();

posts.get('/', postsControl.list);
posts.post('/', checkLoggedIn, postsControl.write);
posts.get('/:id', postsControl.getPostById, postsControl.read);
posts.delete(
  '/:id',
  checkLoggedIn,
  postsControl.getPostById,
  postsControl.checkOwnPost,
  postsControl.remove,
);
posts.patch(
  '/:id',
  checkLoggedIn,
  postsControl.getPostById,
  postsControl.checkOwnPost,
  postsControl.update,
);

export default posts;
