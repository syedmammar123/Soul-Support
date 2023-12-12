import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    fName:{
        type:String,
        trim:true,
        required:true,
    },
    lName:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
        required:[true,"Email is required!"],
    },
    // isPro:{//professional
    //     type:Boolean,
    //     default:false
    // },
    role:{//professional
        type : String,
        enum : ['user','admin','pro'],
        default:"user",
        required: true
    },
    password:{
        type:String,
        required:[true,"Password is required!"],
    },
    gender:{
        type:String,
        enum : ['male','female'],
        required:true,
    },
    refreshToken:{
        type:String,
    },
},{timestamps:true})

userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password,10)
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