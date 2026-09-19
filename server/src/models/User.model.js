import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true,
        minLength:[3,"Minimum 3 letters are required"]
    },
    email : {
        type : String,
        required : true,
        unique : true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        lowercase : true,
    },
    password : {
        type: String,
        required: true,
        select : false,
        minLength : 6
    },
    refreshToken : {
       type:String,
       default: null
    },
    role : {
        type : String,
        enum : ["user","admin"],
        default : "user"
    },
},
{
      timestamps : true,
 }
);

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);

    next();
})

userSchema.methods.comparePaaword = async function(plainPassword) {
    return await bcrpyt.compare(plainPassword,this.password);
}

const userModel = mongoose.model("User",userSchema);

export default userModel;