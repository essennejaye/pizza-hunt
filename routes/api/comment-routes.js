const router = require('express').Router();
const { addComment,
    removeComment,
    addReply,
    removeReply
} = require('../../controllers/comment-controller');

// Post comments at /api/comments
router
    .route('/:pizzaId')
    .post(addComment);

// Delete comments, add replies(update comments) at /api/comments
router
    .route('/:pizzaId/:commentId')
    .put(addReply)
    .delete(removeComment);
// delete reply
router
    .route('/:pizzaiD/:commentId/:replyId')
    .delete(removeReply);

module.exports = router