const router = require('express').Router();

const routes = ['users', 'session', 'csrf', 'posts', 'tags', 'likes', 'photo'];

for (let route of routes) {
  router.use(`/${route}`, require(`./${route}`));
}

module.exports = router;
