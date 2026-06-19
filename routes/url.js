const express = require("express");
const checkAuth = require("../Middleware/auth");
const {
  handlegenerateNewShortURL,
  handlegetAnalytics,
  handleGetMyUrls,
  handleDeleteUrl,
} = require("../controllers/url");
const router = express.Router();
router.post("/", checkAuth, handlegenerateNewShortURL);
router.get("/analytics/:shortId", handlegetAnalytics);
router.get("/myurls", checkAuth, handleGetMyUrls);
router.delete("/:id", checkAuth, handleDeleteUrl);
module.exports = router;
