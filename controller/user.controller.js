const User = require("../model/user.model");

exports.createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      name: user.name,
      email: user.email,
    },
  });
};
