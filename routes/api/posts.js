const express = require('express');
const asyncHandler = require('express-async-handler');

const { User, Post, Tag_Post, Tag } = require("../../db/models");
const { requireUser } = require("../util/auth");
const {
  jwtConfig: { expiresIn },
} = require("../../config");

const router = express.Router();

router.get('/', asyncHandler(async function (req, res) {
  const posts = await Post.findAll({
    include: [{
      model: User,
      as: 'Poster',
      attributes: ['username']
    },
    {
        model: User,
        as: 'Reblog',
        attributes: ['username']
      }
    ],
    order: [['createdAt', 'DESC']]
  });
  posts[0].dataValues["poop"] = "oh yeah"
//   console.log(posts[0].dataValues)

  for (let i=0; i < posts.length; i++) {
      const tags = await Tag_Post.findAll({
        where: {
            postId: posts[i].dataValues.id
        },
        include: [
            {
              model: Tag,
              attributes: ['title']
            },
          ]
      });
    posts[i].dataValues["Tags"] = tags
  }

  console.log(posts[0].dataValues)

  res.json({ posts });
}));


router.post('/', asyncHandler(async function (req, res) {

  debugger;
  const { postType, userId, title, text, mediaLink, caption, reblogUserId  } = req.body;
  debugger
  console.log(postType)
  const newPost = await Post.create({ postType, userId, title, text, mediaLink, caption, reblogUserId  });
  console.log(newPost)
  const post = await Post.findByPk(newPost.id, {
    include: [
      {
        model: User,
        as: 'Poster',
        attributes: ['id', 'username']
      },
      {
        model: User,
        as: 'Reblog',
        attributes: ['username']
      },
    ]
  });
  res.json({ post });
}));

module.exports = router;
