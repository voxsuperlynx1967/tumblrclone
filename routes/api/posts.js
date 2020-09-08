const express = require('express');
const asyncHandler = require('express-async-handler');

const { User, Post } = require("../../db/models");
const { requireUser } = require("../util/auth");
const {
  jwtConfig: { expiresIn },
} = require("../../config");

const router = express.Router();

router.get('/', asyncHandler(async function (req, res) {
  const posts = await Post.findAll({
    include: [{
      model: User,
      attributes: ['username']
    }],
    order: [['createdAt', 'DESC']]
  });

  res.json({ posts });
}));


router.post('/', asyncHandler(async function (req, res) {
  debugger;
  const { postType, userId, mediaLink } = req.body;
  debugger
  const newPost = await Post.create({ postType, userId, mediaLink });
  const post = await Post.findByPk(newPost.id, {
    include: [
      {
        model: User,
        attributes: ['id', 'username']
      },
    ]
  });
  res.json({ post });
}));

module.exports = router;
