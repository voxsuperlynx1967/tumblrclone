'use strict';

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [
      r({ postType: 'text', userId: 1, title: "Flavortown", text: 'Currently riding the bus', noteCount: 2}),
      r({ postType: 'image', userId: 2, mediaLink: "https://i.pinimg.com/originals/b0/f6/42/b0f642ac479b2bb74f2613326a8ba92e.jpg", caption: "Mediocre. My gran could do better and she's dead.", noteCount: 3}),
      r({ postType: 'image', userId: 3, mediaLink: "https://assets.blog.foodnetwork.ca/files/2015/07/bobby-flay-bbq-menu-sweet-potato-wedges.jpg", caption: "I love making hamburgers on the grill. Sweet potatos anyone?", noteCount: 1}),
      r({ postType: 'quote', userId: 4, title: "A balanced diet is a cookie in each hand", text: "Barbara Johnson", noteCount: 1}),
      r({ postType: 'reblog', userId: 1, title: "A balanced diet is a cookie in each hand", text: "Barbara Johnson", reblogUserId: 4})
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts');
  }
};
