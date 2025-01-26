////////////////////////
// VERIFY THE API KEY
////////////////////////
function isValidApiKey(apiKey) {
  if (apiKey === process.env.API_ACCESS_KEY) {
    return true;
  } else {
    return false;
  }
}

module.exports = (req, res, next) => {
  const apiKey = req.header("Authorization");

  if (apiKey) {
    // If the request includes an API key, proceed with API key verification
    if (isValidApiKey(apiKey)) {
      req.apiKey = apiKey;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized - Invalid API key" });
    }
  } else {
    // If API key IS NOT provided, send a 401 Unauthorized response
    res
      .status(401)
      .json({ message: "Unauthorized - Token or API key not provided" });
  }
};
