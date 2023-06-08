
const express = require('express');
const app = express()
const port = 3000
const mongoose = require("mongoose")
const url = "mongodb+srv://diego03:user-root@cluster0.ndljknw.mongodb.net/"

async function conn(){
    try{
        await mongoose.connect(url)
        console.log("Si pastel")

    }catch(error){
        console.log("Nel pastel" + error)
    }
}

conn();