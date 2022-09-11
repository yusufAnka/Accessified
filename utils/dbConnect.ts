// const mongoose = require('mongoose');
import mongoose from "mongoose"
import { DATABASE_URI } from "../env";

export const accessifiedDB = async() => {
    try{
        await mongoose.connect(`${DATABASE_URI}`, {
            // useUnifiedTopology: true,
            // useNewUrlParser: true
        })

    } catch(err){
        return err;
    }
}