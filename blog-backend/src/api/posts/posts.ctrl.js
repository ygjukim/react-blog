import mongoose from 'mongoose';
import Joi from 'joi';
import Post from '../../models/posts.js';

const { ObjectId } = mongoose.Types;

export const getPostById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // bad request
    return;
  }

  try {
    const post = await Post.findById(id);
    if (!post) {
      ctx.status = 404;
      ctx.body = {
        message: `포스트(id=${id})가 존재하지 않습니다.`,
      };
      return;
    }
    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, 3);
  }
};

export const checkOwnPost = (ctx, next) => {
  const { user, post } = ctx.state;
  if (post.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
};

// create a post
// URL: POST /api/posts
// BODY: {title, body, tags}
export const write = async ctx => {
  // parameter validation
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array()
      .items(Joi.string())
      .required(),
  });

  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  // create and save a new post
  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
    user: ctx.state.user,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

//  query post list
// URL: GET /api/posts
export const list = async ctx => {
  const page = parseInt(ctx.query.page || '1', 10);
  if (page < 1) {
    ctx.statu = 400;
    return;
  }

  const { tag, username } = ctx.query;
  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tags: tag } : {}),
  };

  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
    const postCount = await Post.countDocuments().exec();
    ctx.set('Last-Page', Math.ceil(postCount / 10));
    ctx.body = posts.map(post => ({
      ...post,
      body:
        post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
    }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

// read a posts
// URL: GET /api/posts/:id
export const read = async ctx => {
  ctx.body = ctx.state.post;
};

// delete a post
// URL: DELETE /api/posts/:id
export const remove = async ctx => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; // no content
  } catch (e) {
    ctx.throw(500, e);
  }
};

// update a posts
// URL: PATCH /api/posts/:id
// BODY: {title, body, tags}
export const update = async ctx => {
  const { id } = ctx.params;

  // parameter validation
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true,
    }).exec();
    if (!post) {
      ctx.status = 404;
      ctx.body = {
        message: `포스트(id=${id})가 존재하지 않습니다.`,
      };
    } else {
      ctx.body = post;
    }
  } catch (e) {
    ctx.throw(500, e);
  }
};
