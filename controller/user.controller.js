const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/app_error");
const { promisify } = require("util");

function genToken(user){
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn:"30d"
    }
  )
}

exports.createUser = async (req, res) => {
  const user = await User.create(req.body);
  user.password = undefined;
  res.status(201).json({
    status: "success",
    data: user,
  });
};

exports.getSingleUser = async (req, res) => {
  const singleUser = await User.findById(req.params.id);
  res.status(200).json({
    status: "Success",
    user: singleUser
  });
};

exports.getAllUser = async (req, res) => {
  const userList = await User.find();
  res.status(200).json({
    status: "Success",
    userList: userList,
  });
};

exports.deleteUser = async (req, res)=>{
  const user = await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "Success",
    message: "User has been deleted."
  })
}

exports.signUp = async (req, res, next) => { //next use in middleware

  const {name, email, password} = req.body; //object-destructuring

  // use multi condition

  // const isUser = await User.findOne({
  //   $or: [{userName:userName}, {email:email}]
  // });

  // user single condition
  const isUser = await User.findOne({email: email});

  if(isUser){
    return res.status(403).json({
      status: "Error",
      message: "Already exists user."
    })
  }

  const passEncript = await bcrypt.hash(password, 12);

  const newUser = await User.create({
    name : name,
    email: email,
    password: passEncript
  });

  newUser.password = undefined;

  const token = genToken(newUser);

  res.status(200).json({
    status: "Success",
    token: token,
    data: newUser
  })

}

exports.signIn = async (req, res, next) =>{

  const {email, password} = req.body;

  let isUser = await User.findOne({email: email}).select("+password");

  if(!isUser){
    return res.status(404).json({
      status: "Error",
      message: "User doesn't found."
    })
  }

  if(!(await bcrypt.compare(password, isUser.password))){
    return res.status(403).json({
      status: "Error",
      message: "Passowrd is incorrect."
    })
  }

  isUser.password = undefined;
  const token = genToken(isUser);

  res.status(200).json({
    status: "Success",
    token: token,
    data: isUser
  })

}

exports.protect = catchAsync(async (req, res, next) => {
  // getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    next(new AppError("You are not logged in. Please log in.", 401));
  }

  // verification token
  const decorded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check if user still exists
  const currentUser = await User.findById(decorded.id);
  if (!currentUser) {
    next(
      new AppError("The user belonging to this token does no longer exist", 401)
    );
  }

  //check if user changed passowrd after the token was issued
  // if (currentUser.changedPasswordAfter(decoded.iat)) {
  //   return next(
  //     new AppError('User recently changed password! Please login again', 401)
  //   );
  // }

  // grent access to protected route
  req.user = currentUser;
  //req.locals.user = currentUser;
  next();
});