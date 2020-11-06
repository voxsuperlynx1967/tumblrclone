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
  const { postType, userId, title, text, mediaLink, caption, reblogUserId, tagList  } = req.body;
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
  const postId = newPost.id
  for (let i=0; i<tagList.length; i++) {
    const title = tagList[i]
    try {
        const tag = await Tag.findAll({

            where: {
                title: title
            }
          });
          const tagId = tag.id
          const newTagPost = await Tag_Post.create({ postId, tagId })
    } catch {
        const newTag = await Tag.create({ title })
        const tagId = newTag.id
        const newTagPost = await Tag_Post.create({ postId, tagId })
    }

  }
  res.json({ post });
}));

router.delete('/', asyncHandler(async function (req, res) {


    const { id, userId } = req.body;
    Tag_Post.destroy({
        where: {
            postId: id
        }
    })
    Post.destroy({
        where: {
            id: id,
            userId: userId
        }
    });

    res.json({ msg: 'success' });
  }));

module.exports = router;
