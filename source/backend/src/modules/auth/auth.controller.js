const authService = require("./auth.service");
// const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await authService.login(username);

    if (!user) {
      return res.status(401).json({
        message: "Invalid username",
      });
    }

    // const isMatched = await bcrypt.compare(password, user.password_hash);

    if (password !== user.password_hash) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    return res.json({
      success: true,
      username: user.username,
      role: user.role_name,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const existedUser = await authService.findByUsername(username);

    if (existedUser) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);

    const accountId = await authService.createAccount(
      3,
      username,
      password,
      email,
    );

    return res.status(201).json({
      success: true,
      accountId,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  login,
  register,
};
