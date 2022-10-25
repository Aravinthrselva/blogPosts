const mongoose =  require("mongoose");

mongoose.connect ("mongodb://localhost:27017/blogDB")


// This block is to inform us that the connection is successful
const db = mongoose.connection;
db.on("error", console.error.bind(console, " connection error: "));
db.once("open", () => {
  console.log("Database Connected to composeSchema.js");
});


const Schema = mongoose.Schema;

const composeSchema = new Schema ({
  title : String,
  body : String,
})

const Compose = mongoose.model('Compose', composeSchema);

module.exports = Compose;
