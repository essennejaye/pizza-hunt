const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ReplySchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment _id
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    replyBody: {
      type: String, 
      required: 'You must provide a reply!',
      trim: true
    },
    writtenBy: {
      type: String,
      required: 'You must leave a name'
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
  },
  {
    toJSON: {
      getters: true
    },
  }
)

const CommentSchema = new Schema({
  writtenBy: {
    type: String,
    required: 'You must leave a name'
  },
  commentBody: {
    type: String,
    required: 'You must provide a comment!',
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
  },
  replies: [ReplySchema]
},
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

const Comment = model('Comment', CommentSchema);

// get total count of comments and replies on retrieval
CommentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
})


module.exports = Comment;