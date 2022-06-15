const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize');
const { User } = models

const lookup = async (email) => {
  const emailValidation = await User.findOne({ where: {
    email
  }});
  if(emailValidation !== null){
    throw boom.notFound('El email ya existe')
  }
}

module.exports = lookup
