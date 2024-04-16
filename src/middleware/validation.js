import * as yup from "yup";
// import multer from "multer";

// const upload = multer();
// app.use(upload.any());
export default {

  /*** PRODUCT VALIDATION MIDDLEWARES ***/

  validateReviewProduct : async (req, res, next) => {
    const schema = yup.object().shape({
      productId : yup.string().required(),
      review : yup.string().required(),
    })
    await validate(schema, req.body, res, next);
  },

  validateRateProduct : async (req, res, next) => {
    const schema = yup.object().shape({
      productId : yup.string().required(),
      rating : yup.number().required(),
    })
    await validate(schema, req.body, res, next);
  },
 
  // ValidateFilterProducts : async (req, res, next) => {
  //   const schema = yup.object().shape({
  //     category : yup.string(),
  //     brand : yup.string(),
  //     minPrice : yup.number(),
  //     maxPrice : yup.number(),
  //   })
  //   console.log("QUERY", req.query);
  //   await validate(schema, req.query, res, next);
  // },
  

  // validateGetAllProducts : async (req, res, next) => {
  //   const schema = yup.object().shape({
  //     limit : yup.number().required(),
  //     page : yup.number().required(),
  //   })
  //   await validate(schema, req.query, res, next);
  // },

  validateAddProduct : async (req, res, next) => {
    const schema = yup.object().shape({
      name : yup.string().required(),
      description : yup.string().required(),
      price : yup.number().required(),
      images: yup.array().of(yup.string()).required(),
      category : yup.string().required(),
      brand : yup.string().required(),
      stock : yup.number().required(),
    })
    const formData = req.body;
    const files = req.files;

    const imageNames = files.map(file => file.originalname); 
    formData.images = imageNames;

    // console.log("vALIDATION data",formData);
    await validate(schema, formData, res, next);
  },

  /*** USER VALIDATION MIDDLEWARES ***/

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
     console.log("req.params", req.params);
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

/*** VALIDATE ***/

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
