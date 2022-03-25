const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const apiRoutes = require("./src/modules/routes/routes");

app.use(cors());

app.use(bodyParser.json());
app.use("/", apiRoutes);

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});