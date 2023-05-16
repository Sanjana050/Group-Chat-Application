const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.postSignup = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;

  

  try {

    const exists = await User.findOne({ where: { email: email } });
    if (exists) {
      return res.status(400).json({ message: 'User already exists,login instead'});
    }
    
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    await User.create({
      name: name,
      email: email,
      password: hash,
      phone: phone
    });

    console.log('User added');
    res.status(200).json({ message: 'User has been added' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'User could not be added', error: err });
  }
};
