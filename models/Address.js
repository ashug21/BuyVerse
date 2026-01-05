import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({


fullname : {
    type : String,
    required : true,
},
mobile : {
    type : String,
    required : true,
},
pincode : {
    type : String,
    required : true,
},
address1 : {
    type : String,
    required : true,
},
address2 : {
    type : String,
    required : true,
},
city : {
    type : String,
    required : true,
},

state : {
    type : String,
    required : true,
},

userEmail : {
    type : String,
    required : true
}
});


export default mongoose.models.Address ||
  mongoose.model("Address", AddressSchema);
