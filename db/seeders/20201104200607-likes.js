'use strict';

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Likes', [
      r({ postId: 1, userId: 4}),
      r({ postId: 2, userId: 3}),
      r({ postId: 3, userId: 2}),
      r({ postId: 4, userId: 1}),
      r({ postId: 2, userId: 1}),
      r({ postId: 2, userId: 4}),
      r({ postId: 1, userId: 1})
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Likes');
  }
};
