const jwt = require('jsonwebtoken');

const User = require('../models/User');

const auth = async (req, res, next) => {
  const authHeader = req.get("Authorization")

  if(!authHeader){
    return res.json({
			message: 'You are not authenticated.',
		})
		.status(401);
  }

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.AUTH_TOKEN);

  if(!decoded){
    return res.json({
			message: 'You are not authenticated.',
		})
		.status(401);
  }

  if(!decoded.user){
    return res.json({
			message: 'You are not authenticated.',
		})
		.status(401);
  }

  const user = await User.findById(decoded.user);

  req.userId = decoded.user;
  req.user = user;

  next();
}

module.exports = auth;