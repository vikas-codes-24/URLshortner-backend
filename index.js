const express = require("express");
const urlRoute = require("./routes/url");
const { URL } = require("./models/url");
const { connectMongoDb } = require("./connection");
const authRoute = require("./routes/auth");
const app = express();
const PORT = 8000;
const cors = require("cors");
//connections
connectMongoDb("mongodb://127.0.0.1:27017/url-shortner").then(() =>
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
