import mongoose from "mongoose";

const dbConnection = async()=>{
  try{
    await mongoose.connect( process.env.MONGODB_CNN!);

    console.log('Has been connected to DataBase');
  }catch(err){
    console.log(err)
    throw new Error('Error a la hora de iniciar la base de datos');
  }
}

export default dbConnection;