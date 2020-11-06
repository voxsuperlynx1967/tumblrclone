'use strict';

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tag_Posts', [
      r({ postId: 1, tagId: 5}),
      r({ postId: 2, tagId: 1}),
      r({ postId: 2, tagId: 2}),
      r({ postId: 2, tagId: 6}),
      r({ postId: 3, tagId: 2}),
      r({ postId: 3, tagId: 4}),
      r({ postId: 3, tagId: 6})
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tag_Posts');
  }
};
