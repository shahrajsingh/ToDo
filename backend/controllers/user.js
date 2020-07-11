const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
/*
exports.createUser = (req,res,next) =>{
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  user.save().then( result=>{
    res.status(201).json({
      message: "User Created",
      result: result
    });
  }).catch( err =>{
    res.status(500).json({
      message: "error",
      error: err
    });
  });
}*/

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      question: req.body.question,
      answer: req.body.answer
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      });
  });
}

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      res.status(401).json({
        message: 'user not found'
      });
    } else {
      fetchedUser = user;

      return bcrypt.compare(req.body.password, user.password);

    }
  }).then((result) => {

    if (result) {
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_KEY,
        { expiresIn: "8h" }
      );

      res.status(200).json({
        token: token,
        expiresIn: 3600 * 8,
        userId: fetchedUser._id,
        message: 'user authorised'
      });
    } else {
      res.status(401).json({
        message: 'invalid username or password'
      });
    }
  }).catch((error) => {

    res.status(500).json({
      message: 'Invalid authentication credentials!',
      error: error
    });
  });
}

exports.getUser = (req, res, next) => {
  User.findOne({ _id: req.params.userId }).then((result) => {

    res.status(200).json({
      name: result.name,
      email: result.email
    });
  }).catch((error) => {
    res.status(500).json({
      name: 'error occured',
      error: error
    });
  });
}
exports.updateUser = (req, res, next) => {
  User.updateOne({_id: req.params.userId},{name: req.body.name,email: req.body.email}).then((result)=>{
    res.status(200).json({
      message: 'updated',
      result: result.nModified
    });
  }).catch((error)=>{
    res.status(500).json({
      message: 'error occured',
      result: error
    });
  });
}
