const boom = require('@hapi/boom');

function validatorHandler(schema, property, isAsync=false) {
  return async (req, res, next) => {
    const data = req[property];
    let error2 = false;
    if(isAsync){
      try{
        await schema.validateAsync(data, { abortEarly: false });
        error2 = false
      } catch(err) {
        error2 = true
      }
    } else {
      const { error } = schema.validate(data, { abortEarly: false });
      error2 = error
    }
    if (error2) {
      next(boom.badRequest(error2));
    }
    next();
  }
}

module.exports = validatorHandler;
