const mongoose = require('mongoose');
const productSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    imgUrl:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    }
})

const ProductsData = mongoose.model('Products', productSchema);
module.exports=ProductsData