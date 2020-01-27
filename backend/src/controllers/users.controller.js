const userCtrl = {};

const User = require('../models/User');

userCtrl.getUsers = async (req, res) => {
  const users = await User.find();

  res.json(users)
};

userCtrl.getUser = async (req, res) => {
  const user = await User.findOne({
    _id: req.params.id
  });

  res.json(user);
};

userCtrl.createUser = async (req, res) => {
  const {username, numero} = req.body;
  const newUser = new User({username, numero});
  await newUser.save();
  res.send('Users Routers')
};

userCtrl.updateUser = async (req, res) => {
  const {username, numero} = req.body;
  const user = await User.findOneAndUpdate({_id: req.params.id}, {username, numero}, {
    new: true
  });
  if (user) res.status(200).json(user);
};

userCtrl.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  res.json('Users Routers')
}

module.exports = userCtrl;
