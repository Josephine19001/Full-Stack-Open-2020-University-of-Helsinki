const mongoose = require("mongoose");

const phoneSchema = new mongoose.Schema({
    name: {
      type: String,
      minLength: [8, "name should now be less than 8"],
      required: [true, "name is required"],
      unique: true
    },
    number: {
      type: String,
      minLength: [10, "number should now be less than 10"],
      required: [true, "number is required"]
    },
});

phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Phone', phoneSchema);
