const mongoose=require('mongoose')

const connectDb=(DB_URI)=>{
  try {
    console.log('Database Connected :)');
    mongoose.connect(DB_URI)
  } catch (error) {
    console.log('Error in connecting db',e);
  }
}

module.exports=connectDb;