'use strict';

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tags', [
      r({ title: 'beefwellington'}),
      r({ title: 'beef'}),
      r({ title: 'sweetpotato'}),
      r({ title: 'bbq'}),
      r({ title: 'flavortown'}),
      r({ title: 'tasty'}),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tags');
  }
};
