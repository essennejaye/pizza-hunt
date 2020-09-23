const router = require('express').Router();
const { addComment, removeComment } = require('../../controllers/comment-controller');

// Post comments at /api/comments
router
.route('/:pizzaId')
.post(addComment);

// Delete comments at /api/comments
router
.route('/:pizzaId/:commentId')
.delete(removeComment);

module.exports = router