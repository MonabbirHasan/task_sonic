const app = require("./app");

// SERVER PORT TO RUNN
const port = process.env.SERVER_PORT || 4000;

// RELEASE THE CONNECTION VIA LISTEN
app.listen(port, (error) => {
  if (error) {
    console.log(`server running error: ${error}`);
  }
  console.log(`server running on port : localhost:${port}`);
});
