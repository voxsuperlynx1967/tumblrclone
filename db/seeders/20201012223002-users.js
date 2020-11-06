'use strict';

const bcrypt = require('bcryptjs');

function createPassword() {
  return bcrypt.hashSync('password');
}

function r(o) {
  o.createdAt = new Date();
  o.updatedAt = new Date();
  return o;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      r({ username: 'guyfieri', email: 'flavor@example.com', hashedPassword: createPassword() }),
      r({ username: 'chefgordon', email: 'grams@example.com', hashedPassword: createPassword() }),
      r({ username: 'fishflay', email: 'bflay@example.com', hashedPassword: createPassword() }),
      r({ username: 'simoncarroll', email: 'snc40@georgetown.edu', hashedPassword: createPassword() }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users');
  }
};
