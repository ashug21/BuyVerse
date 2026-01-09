import mongoose from "mongoose";

const CommentsSchema = new mongoose.Schema({


name : {
    type : String,
    required : true,
},
description : {
    type : String,
    required : true,
},

productId: {
    type: String,
    required: true,
    index: true,
  },

}, {timestamps : true});

export default mongoose.models.Comments ||
  mongoose.model("Comments", CommentsSchema);
