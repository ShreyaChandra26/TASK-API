const mongoose=require("mongoose")

mongoose.connect('mongodb+srv://root6:tasktask@cluster0.sqerpfs.mongodb.net/test')
mongoose.set('strictQuery',true)

mongoose.connection.on('connected',()=>{
    console.log("Database connected")
})


mongoose.connection.on('error',()=>{
    console.log("Not connected")
})