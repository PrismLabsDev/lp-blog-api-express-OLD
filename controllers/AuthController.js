const Joi = require('joi');
const mail = require('../mail');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const UserVerification = require('../models/UserVerification');

const login = async (req, res) => {
  try {
    await Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required()
    }).validateAsync(req.body);

    const user = await User.findOne({email: req.body.email});

    if(!user){
      return res.status(404).json({
        message: 'No user with matching email found.'
      });
    }

    const passwordVerification = bcrypt.compareSync(req.body.password, user.password);

    if(!passwordVerification){
      mail.sendMail({
        from: 'lp@PrismLabs.dev',
        to: user.email,
        subject: 'Failed login attempt.',
        html: `An attempt was made to log into your account but failed, if this was not you we suggest changing your password.`
      });

      return res.status(401).json({
        message: 'Password did not match.'
      });
    }

    const token = jwt.sign({ user: user._id }, process.env.AUTH_TOKEN);

    await UserVerification.deleteMany({ user: user, type: 'password' });

    return res.status(200).json({
      message: 'Successful login',
      access_token: token
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
      error: error
		});
  }
};

const register = async (req, res) => {
  try {
    await Joi.object({
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required()
    }).validateAsync(req.body);

    // Create new user record
    const newUser = new User({
      username: req.body.username,
      bio: '',
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      verified: false
    });
    await newUser.save();

    // Create email verification for user
    const emailVerificationString = crypto.randomBytes(16).toString('hex');

    const newUserVerification = new UserVerification({
      user: newUser,
      type: 'email',
      token: emailVerificationString,
    });
    await newUserVerification.save();

    // Send verification email to user
    mail.sendMail({
      from: 'lp@PrismLabs.dev',
      to: req.body.email,
      subject: 'Verify Email',
      html: `You can verify your email with the following token: ${emailVerificationString}`
    });

    return res.status(200).json({
      message: 'You have been registered, please verify your email.'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

const registerVerification = async (req, res) => {
  try {
    await Joi.object({
      email: Joi.string().required(),
      token: Joi.string().required()
    }).validateAsync(req.body);

    const user = await User.findOne({email: req.body.email});
    const verification = await UserVerification.findOne({user: user, type: 'email'});

    if(req.body.token != verification.token){
      const emailVerificationString = crypto.randomBytes(16).toString('hex');

      verification.token = emailVerificationString;
      verification.save();

      mail.sendMail({
        from: 'lp@PrismLabs.dev',
        to: req.body.email,
        subject: 'Verify Email',
        html: `You can verify your email with the following token: ${emailVerificationString}`
      });

      return res.status(401).json({
        message: 'Submitted token was incorrect, a new token has been generated and set to your email.'
      });
    }

    user.verified = true;
    user.save();

    verification.deleteOne();

    mail.sendMail({
      from: 'lp@PrismLabs.dev',
      to: req.body.email,
      subject: 'You have verified your email!',
      html: `You have verified your email!`
    });

    return res.status(200).json({
      message: 'You have verified your email!'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

const passwordReset = async (req, res) => {
  try {
    await Joi.object({
      email: Joi.string().required(),
    }).validateAsync(req.body);

    const user = await User.findOne({email: req.body.email});
    await UserVerification.deleteMany({ user: user, type: 'password' });

    const emailVerificationString = crypto.randomBytes(16).toString('hex');

    const newUserVerification = new UserVerification({
      user: user,
      type: 'password',
      token: emailVerificationString,
    });
    await newUserVerification.save();

    mail.sendMail({
      from: 'lp@PrismLabs.dev',
      to: req.body.email,
      subject: 'Password reset token.',
      html: `You can reset your password with the following token: ${emailVerificationString}`
    });

    return res.status(200).json({
      message: 'reset password'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

const passwordResetVerify = async (req, res) => {
  try {
    await Joi.object({
      email: Joi.string().required(),
      token: Joi.string().required(),
      password: Joi.string().required()
    }).validateAsync(req.body);

    const user = await User.findOne({email: req.body.email});
    const verification = await UserVerification.findOne({ user: user, type: 'password' });

    if(!verification){
      return res.status(404).json({
        message: 'No password reset found.'
      });
    }

    if(req.body.token != verification.token){
      await UserVerification.deleteMany({ user: user, type: 'password' });
      return res.status(401).json({
        message: 'Token does not match and password change has been canceled.'
      });
    }

    user.password = bcrypt.hashSync(req.body.password, 10);
    user.save();

    mail.sendMail({
      from: 'lp@PrismLabs.dev',
      to: req.body.email,
      subject: 'Password reset!',
      html: `You have successfully rest your password!`
    });

    return res.status(200).json({
      message: 'Password has been reset.'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

module.exports = {
	login,
  register,
  registerVerification,
  passwordReset,
  passwordResetVerify
};
