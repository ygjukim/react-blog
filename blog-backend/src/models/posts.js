import Mongoose from 'mongoose';

const { Schema } = Mongoose;

const PostSchema = new Schema({
  title: String,
  body: String,
  tags: [String],
  publishedDate: {
    type: Date,
    default: Date.now,
  },
});

const Post = Mongoose.model('Post', PostSchema);
export default Post;
