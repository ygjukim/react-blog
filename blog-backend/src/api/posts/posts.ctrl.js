let postId = 1;

const posts = [
  {
    id: 1,
    title: '제목',
    body: '내용',
  },
];

// create a post
// URL: POST /api/posts
// BODY: {title, body}
exports.write = ctx => {
  const { title, body } = ctx.request.body;
  postId += 1;
  const post = { id: postId, title, body };
  posts.push(post);
  ctx.body = post;
};

//  query post list
// URL: GET /api/posts
exports.list = ctx => {
  ctx.body = posts;
};

// read a posts
// URL: GET /api/posts/:id
exports.read = ctx => {
  const { id } = ctx.params;
  const post = posts.find(p => p.id.toString() === id);
  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: `포스트(id=${id})가 존재하지 않습니다.`,
    };
  } else {
    ctx.body = post;
  }
};

// delete a post
// URL: DELETE /api/posts/:id
exports.remove = ctx => {
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
exports.replace = ctx => {
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
exports.update = ctx => {
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
