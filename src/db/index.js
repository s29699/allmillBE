//code for db connection

import mongoose from "mongoose";

const DB_NAME = "dummy";

const connectDB = () => (
                  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
                  .then(
                    (ci) => (console.log(`DB connected !! CONNECTION INSTANCE: ${ci.connection.host} `)),
                    () => (console.log("in then block of mongoose connect in db folder"))
                  )
                  .catch( () => (console.log("from the catch block of mongoose connect in db folder")) )
                )


// const connectDB = async () => {
//     try {
//         const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         console.log(`DB connected !! CONNECTION INSTANCE: ${connectionInstance.connection.host} `)
        
//     } catch (error) {
//         console.log("error in db connection", error);
//     }
// }

export default connectDB;