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

const create = async (req, res) => {
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

const destroy = async (req, res) => {
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

const like = async (req, res) => {
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

const unlike = async (req, res) => {
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
	show,
  create,
  update,
  destroy,
  like,
  unlike
};
