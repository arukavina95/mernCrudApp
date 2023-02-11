const mongoose = require("mongoose");

const DB =
  "mongodb+srv://Antalo15:Antalo15@cluster0.eqpu23l.mongodb.net/mernCrud?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection start"))
  .catch((error) => console.log(error.message));
