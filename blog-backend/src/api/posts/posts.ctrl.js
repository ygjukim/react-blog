import Post from '../../models/posts.js';

// create a post
// URL: POST /api/posts
// BODY: {title, body, tags}
export const write = async ctx => {
  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
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
  try {
    const posts = await Post.find().exec();
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// read a posts
// URL: GET /api/posts/:id
export const read = async ctx => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
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

// delete a post
// URL: DELETE /api/posts/:id
export const remove = ctx => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: `포스트(id=${id})가 존재하지 않습니다.`,
    };
  } else {
    posts.splice(index, 1);
    ctx.status = 204; // no content
  }
};

// replace a posts
// URL: PUT /api/posts/:id
// BODY: {title, body}
export const replace = ctx => {
  const { id } = ctx.params;
  const { title, body } = ctx.request.body;
  const index = posts.findIndex(p => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: `포스트(id=${id})가 존재하지 않습니다.`,
    };
  } else {
    posts[index] = {
      id,
      title,
      body,
    };
    ctx.body = posts[index];
  }
};

// update a posts
// URL: PATCH /api/posts/:id
// BODY: {title, body}
export const update = ctx => {
  const { id } = ctx.params;
  const { title, body } = ctx.request.body;
  const index = posts.findIndex(p => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: `포스트(id=${id})가 존재하지 않습니다.`,
    };
  } else {
    posts[index] = {
      ...posts[index],
      title,
      body,
    };
    ctx.body = posts[index];
  }
};
