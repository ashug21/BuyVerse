import mongoose from "mongoose";


const WishListSchema = new mongoose.Schema({


});


export default mongoose.models.Wishlist ||
  mongoose.model("Wishlist", WishListSchema);
