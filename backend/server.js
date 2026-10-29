const app = require('./app.js');
const connectDB = require("./config/db.js");



require("dotenv").config();



const PORT =3000;


const startServer=async()=>{

    try {
        await connectDB();

        app.listen(PORT,()=>{

    console.log(`ur port is running on ${PORT}`)

})


    }
    catch(error){
        console.log("server failed to start",error.message);
    }

}

startServer();


