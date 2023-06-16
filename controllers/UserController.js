const index = async (req, res) => {
  try {
    return res.status(200).json({
      message: 'Welcome to our blog.'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

const show = async (req, res) => {
  try {
    return res.status(200).json({
      message: 'Welcome to our blog.'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

const update = async (req, res) => {
  try {
    return res.status(200).json({
      message: 'Welcome to our blog.'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

const follow = async (req, res) => {
  try {
    return res.status(200).json({
      message: 'Welcome to our blog.'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

const unfollow = async (req, res) => {
  try {
    return res.status(200).json({
      message: 'Welcome to our blog.'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
			message: 'Server error.',
		});
  }
};

module.exports = {
	index,
  show,
  update,
  follow,
  unfollow
};
