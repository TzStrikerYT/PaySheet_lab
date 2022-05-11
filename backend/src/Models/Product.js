const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    courseTitle: { type: String, required: true },
    courseContent: {
      type: Array,
      default: [
        {
          subTitle: "",
          explain: "",
          example: "",
        },
      ],
    },
    questions: [
      {
        question: "",
        answer: ""
      }
    ]
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);

/*

courseTitle: "HTML"
courseContent: [
  {},{},{}
]

*/