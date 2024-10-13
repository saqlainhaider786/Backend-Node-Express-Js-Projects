const mongo = require("mongoose");

const connectMongo = () => {
    mongo.connect("mongodb://127.0.0.1:27017/HotelManagementSystem").then(() => console.log("Mongo Connected Successfully!..")).catch(err=>console.log(`Error : ${err}`));
}

module.exports = connectMongo;