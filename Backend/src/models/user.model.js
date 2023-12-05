import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    fName:{
        type:String,
        required:true,
        trim:true,
    },
    lName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:[true,"Email is required!"],
        unique:true,
        lowercase:true,
        trim:true,
    },
    // isPro:{//professional
    //     type:Boolean,
    //     default:false
    // },
    role:{//professional
        
        default:"user" //user, profrssional, admin.
    },
    password:{
        type:String,
        required:[true,"Password is required!"],
    },
    refreshToken:{
        type:String,

    },
},{timestamps:true})

userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next()

    this.password = bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (plainPassword){
    return await bcrypt.compare(plainPassword,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this.id,
        email: this.email,
        role:this.role,
        fullName: this.fName + this.lName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

export const  User = mongoose.model("User",userSchema)