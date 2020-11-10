const express = require('express');
const asyncHandler = require('express-async-handler');

const { Tag, Tag_Post, Post, User } = require("../../db/models");
const { requireUser } = require("../util/auth");
const {
  jwtConfig: { expiresIn },
} = require("../../config");

const router = express.Router();

router.get('/', asyncHandler(async function (req, res) {
  const tags = await Tag_Post.findAll({

    include: [
        {
          model: Tag,
          attributes: ['id', 'title']
        },
      ]
  });

  res.json({ tags });
}));

router.get('/:id', asyncHandler(async function (req, res) {
    const id = req.params.id
    const tag = await Tag.findAll({
      where: {
          id: id
      }
    });

    res.json({ tag });
  }));




module.exports = router;
