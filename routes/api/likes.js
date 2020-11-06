const express = require('express');
const asyncHandler = require('express-async-handler');

const { Like } = require("../../db/models");
const { requireUser } = require("../util/auth");
const {
  jwtConfig: { expiresIn },
} = require("../../config");

const router = express.Router();
router.get('/', asyncHandler(async function (req, res) {

    const likes = await Like.findAll({
    });

    res.json({ likes });
  }));

  router.get('/:id', asyncHandler(async function (req, res) {

    const likes = await Like.findAll({
        where: {
            userId: req.params.id
        }
    });

    res.json({ likes });
  }));


  router.post('/', asyncHandler(async function (req, res) {

    console.log("hi")
    const { postId, userId } = req.body;
    const newLike = await Like.create({ postId, userId });
    const like = await Like.findByPk(newLike.id, {
    });
    res.json({ like });
  }));

  router.delete('/', asyncHandler(async function (req, res) {


    const { postId, userId } = req.body;
    Like.destroy({
        where: {
            postId: postId,
            userId: userId
        }
    });

    res.json({ msg: 'success' });
  }));


  module.exports = router;
