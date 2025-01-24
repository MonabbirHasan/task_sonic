const app = require("./app");
const port = process.env.SERVER_PORT || 4000;
app.listen(port, (error) => {
  if (error) {
    console.log(`server running error: ${error}`);
  }
  console.log(`server running on port : localhost:${port}`);
});
