import * as yup from "yup";

export default {

  validateGetUserByType : async (req, res, next) => {
    const schema = yup.object().shape({
      type : yup.string().required().oneOf(["user", "admin"]),
    })
    await validate(schema, req.query, res, next);
  },

  validateGetUserById : async (req, res, next) => {
     const schema = yup.object().shape({
        id : yup.string().required(),
     }) 
     await validate(schema, req.params, res, next);
  },

  validateSignup : async (req, res, next) => {
      const schema = yup.object().shape({
        name : yup.string().required(),
        email : yup.string().email().required(),
        password : yup.string().required(),
        type : yup.string().required().oneOf(["user", "admin"]),
        phone : yup.string().required().min(10).max(10), 
      });
      await validate(schema, req.body, res, next);
  },

  validateLogin: async (req, res, next) => {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    });
    await validate(schema, req.body, res, next);
  },
};

const validate = async (schema, reqData, res, next) => {
  try {
    await schema.validate(reqData, { abortEarly: false });
    next();
  } catch (err) {
    const errors = err.inner.map(({ path, message, value }) => ({
        path,
        message,
        value,
      }));
    res.status(400).send(errors);
  }
};
