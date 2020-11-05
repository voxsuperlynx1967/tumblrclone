const express = require('express');
const asyncHandler = require('express-async-handler');

const { Tag, Tag_Post, Post } = require("../../db/models");
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
          attributes: ['title']
        },
      ]
  });

  res.json({ tags });
}));


module.exports = router;
