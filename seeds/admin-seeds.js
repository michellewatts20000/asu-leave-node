const {
  Admin
} = require('../models');

const adminData = [{
    name: 'Michelle Watts',
    email: 'watts.e.michelle@gmail.com',
    password: '123456',
  },
  {
    name: 'Tom Patton',
    email: 'tom@asu.org.au',
    password: '2468a$u',
  },

];

const seedAdmin = () =>
  Admin.bulkCreate(adminData, {
    individualHooks: true,
    returning: true,
  });

module.exports = seedAdmin;