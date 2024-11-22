const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../_models/User');
const JWTUtil = require('../utils/JWTUtil');

const authService = {
  login: async (username, password) => {
    const user = await User.findByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
		if(!user){
			console.log('User not found');
		}

		if(!(await bcrypt.compare(password, user.password))){
			console.log('Password does not match');
			console.log(password == user.password);
			console.table({password, userPassword: user.password});
		}

      throw new Error('Invalid credentials');
    }
    const token = JWTUtil.generateToken({ id: user.id, role: user.role });
    return token;
  },
  logout: async (token) => {
    await JWTUtil.revokeToken(token);
  },
  register: async (username, password, email) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();
    return newUser;
  }
};

module.exports = authService;