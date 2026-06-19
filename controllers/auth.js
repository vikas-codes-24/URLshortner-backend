const { user } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await user.create({
    name,
    email,
    password: hashedPassword,
  });
  return res.json({
    message: "User Created Successfully",
  });
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const foundUser = await user.findOne({ email });
  if (!foundUser) {
    return res.status(400).json({ error: "user not found" });
  }

  const isMatch = await bcrypt.compare(password, foundUser.password);
  if (!isMatch) {
    return res.status(400).json({ error: "invalid Password" });
  }
  const token = jwt.sign(
    {
      userId: foundUser._id,
      email: foundUser.email,
      name: foundUser.name,
    },
    "vikas-secret-key",
  );
  return res.json({
    message: "Login Successful",
    token,
  });
}

module.exports = { handleUserSignup, handleUserLogin };
