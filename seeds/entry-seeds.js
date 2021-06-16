const {
  Entry
} = require('../models');

const entryData = [{
    name: 'Fred',
    email: 'fred@gmail.com',
    phone: 452210918,
    sector: 'Community sector',
    post: 2000,
    employer: 'test company',
    years: 6,
    union: true,
    shift: true,
    personal: 60,
    annual: 25,
    long: 4.80,
  },

];

const seedEntry = () => Entry.bulkCreate(entryData);

module.exports = seedEntry;