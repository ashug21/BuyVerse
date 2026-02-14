import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    stars: {
      type: String,
      required: true,
    },

    rating: {
      type: String,
      required: true,
    },

    beforePrice: {
      type: String,
      required: true,
    },

    afterPrice: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "Pending",
    },
    description : {
      type : String,
      required: true
    },
    image: {
        type: String,
        required: true,
      }
  },
  { timestamps: true }
);

export default mongoose.models.Image ||
  mongoose.model("Image", ImageSchema);
