import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({


    title : {
        type : String,
        required : true,
    },

    itemsTotal : {
        type : String,
        required : true,
    },

    delivery : {
        type : String,
        required : true,
    },

    total : {
        type : String,
        required : true,
    },
    paymentMethod : {
        type : String,
        required : true
    }

},{timestamps : true});


export default mongoose.models.Order || mongoose.model("Order", OrderSchema);

