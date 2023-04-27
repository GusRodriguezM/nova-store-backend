import mongoose from "mongoose";

const dbConnection = async() => {
    try {
        mongoose.set( 'strictQuery', false );
        await mongoose.connect( process.env.DATABASE_CNN as string );

        console.log('The connection to the database has been successful');
    } catch (error) {
        console.log(error);
        throw new Error('Error in the database connection');
    }
}

export default dbConnection;