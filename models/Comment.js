const mongoose=require('mongoose');

const CommentSchema=new mongoose.Schema({

    body:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    story:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Story'
    },

    createdAt:{
        type:Date,
        default:Date.now
    }
});


const Comment=mongoose.model('Comment',CommentSchema);

module.exports=Comment;