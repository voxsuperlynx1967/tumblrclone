'use strict';

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [
      r({ postType: 'text', userId: 1, title: "How are you", text: 'Im doing well'}),
      r({ postType: 'image', userId: 2, mediaLink: "https://i.pinimg.com/originals/b0/f6/42/b0f642ac479b2bb74f2613326a8ba92e.jpg"}),
      r({ postType: 'image', userId: 3, mediaLink: "https://assets.blog.foodnetwork.ca/files/2015/07/bobby-flay-bbq-menu-sweet-potato-wedges.jpg"}),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts');
  }
};
