const express = require("express");
const urlRoute = require("./routes/url");
const { URL } = require("./models/url");
const { connectMongoDb } = require("./connection");
const authRoute = require("./routes/auth");
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
require("dotenv").config();
//connections
console.log("MONGO_URL:", process.env.MONGO_URL);
connectMongoDb(process.env.MONGO_URL).then(() =>
  console.log("mongoDB connected"),
);

app.use(cors());
app.use(express.json());
app.use("/url", urlRoute);
app.use("/auth", authRoute);
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log("server running of PORT:", `${PORT}`));
