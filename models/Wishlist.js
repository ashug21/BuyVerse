import mongoose from "mongoose";


const WishListSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },

  price : {
    type: String,
    required: true,
  },

  img : {
    type: String,
    required: true,
  },

  userEmail : {
    type: String,
    required: true,
  }

});


export default mongoose.models.Wishlist ||
  mongoose.model("Wishlist", WishListSchema);
