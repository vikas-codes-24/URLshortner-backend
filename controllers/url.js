const { nanoid } = require("nanoid");
const { URL } = require("../models/url");

async function handlegenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });
  const shortID = nanoid(8);

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    createdBy: req.user.userId,
    visitHistory: [],
  });
  return res.json({
    shortId: shortID,
  });
}
async function handlegetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
async function handleGetMyUrls(req, res) {
  const urls = await URL.find({
    createdBy: req.user.userId,
  });
  return res.json(urls);
}
async function handleDeleteUrl(req, res) {
  const { id } = req.params;
  await URL.findByIdAndDelete(id);
  return res.json({
    message: "URL Deleted Successfully",
  });
}
module.exports = {
  handlegenerateNewShortURL,
  handlegetAnalytics,
  handleGetMyUrls,
  handleDeleteUrl,
};
