const mongoose=require("mongoose");

const itemSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    color:{
        type:String,
    }
});

const item=new mongoose.model('item',itemSchema);

module.exports=item;