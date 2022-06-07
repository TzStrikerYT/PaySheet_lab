const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    passwordChanged: { type: String, default: false },
    phone: { type: String, required: true },
    document: { type: String, required: true },
    salary: { type: Number, required: true },
    arlType: { type: String, required: true },
    compensationBox: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    admin: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    bank: {type: String, required: true},
    bankAccount: {type: String, required: true},
    paymentState: {type: String, default: 'payed'}, // ready - payed 
    eps: {type: String, reuired: true}
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
