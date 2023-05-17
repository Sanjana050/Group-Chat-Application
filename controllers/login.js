const jwt = require('jsonwebtoken');
const User=require('../models/user')
const bcrypt=require('bcrypt');
require('dotenv').config;
const secretKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbmphbmFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.ex8WIWs1CaF8riXrwR-TtHswUYgP3-z7pBnNtL8ROpE';


function generateToken(email,password){
    
    return jwt.sign({email:email,password:password}, secretKey, { expiresIn: '1800s' });
}
exports.postLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
  
    try {
      const user = await User.findOne({ where: { email: email } });
      if (user) {
        bcrypt.compare(password, user.dataValues.password, (err, result) => {
          if (err || result === false) {
            console.log('incorrect pass');
            res.status(300).json({ message: 'wrong password, try again' });
          } else {
            const token= generateToken(user.email,user.password)
            res.status(200).json({ message: 'successfully logged in' ,token:token});
          }
        });
      } else {
        console.log('user not found');
        res.status(500).json({ message: 'internal server error' });
      }
    } catch (err) {
      res.status(500).json({ message: 'user not found', err: err });
    }
  };
  