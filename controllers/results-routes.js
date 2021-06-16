const express = require('express');
const {
  Entry
} = require('../models');
const sequelize = require('../config/connection');
const router = express.Router();

router.get('/:id', async (req, res) => {
  const userSumIndustry = await Entry.findAll({
    attributes: [
      'sector',
      [
        sequelize.fn('sum', sequelize.col('annual')),
        'total_annual',
      ],
      [
        sequelize.fn('sum', sequelize.col('personal')),
        'total_personal',
      ],
      [
        sequelize.fn('sum', sequelize.col('long')),
        'total_long',
      ],
      [sequelize.fn('count', sequelize.col('*')), 'total_submissions'],
    ],
    group: ['sector'],
    order: sequelize.literal('total_annual DESC'),
  });

  const latestEntry = await Entry.findOne({
    where: {
      id: req.params.id,
    },
  });

  const userSumAll = await Entry.findAll({
    attributes: [
      [
        sequelize.fn('sum', sequelize.col('annual')),
        'total_annual',
      ],
      [
        sequelize.fn('sum', sequelize.col('personal')),
        'total_personal',
      ],
      [
        sequelize.fn('sum', sequelize.col('long')),
        'total_long',
      ],
    ],
  });

  const userData = await Entry.findAll().catch((err) => {
    res.json(err);
  });
  const users = userData.map((user) =>
    user.get({
      plain: true,
    })
  );
  const users2 = userSumIndustry.map((user) =>
    user.get({
      plain: true,
    })
  );
  const users3 = userSumAll.map((user) =>
    user.get({
      plain: true,
    })
  );

  const latestUser = latestEntry.get({
    plain: true,
  });

  const totals = users2.find((u) => u.sector === latestUser.sector);

  const totalNumber = userData.length;

  console.log(totals, latestEntry, users3);

  res.render('results', {
    users,
    users2,
    users3,
    userSumAll,
    totalNumber,
    latestUser,
    totals,
  });
});

module.exports = router;