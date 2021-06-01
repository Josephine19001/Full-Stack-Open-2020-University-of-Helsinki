require("dotenv").config();

const PORT = process.env.PORT;
const MONGODBURI = process.env.MONGODB_URI;

module.exports = {
    PORT,
    MONGODBURI
}