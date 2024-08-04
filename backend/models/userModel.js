const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username : {
        required : true,
        unique: true,
        type : String
    },
    password : {
        type: String,
        required: true
    }
},
{
    timestamps: true
}
)

userSchema.pre("save", async function(next){
if(!this.isModified("password")) return next() ;

try {
    this.password = await bcrypt.hash(this.password,10)
} catch (error) {
    next(error)
}

})

const User = mongoose.model("User",userSchema)
module.exports = User

