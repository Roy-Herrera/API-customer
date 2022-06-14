const boom = require('@hapi/boom')
const Joi = require('joi');
const { models } = require('../libs/sequelize');
const { User } = models

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5)

const lookup = async (email) => {
  const emailValidation = await User.findOne({ where: {
    email
  }});
  if(emailValidation !== null){
    throw boom.notFound('El email ya existe')
  }
}

const createUserSchema = Joi.object({
  email: email.required().external(lookup),
  password: password.required(),
  role: role.required()
});



const updateUserSchema = Joi.object({
  email: email,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
