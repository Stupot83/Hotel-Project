const express = require('express')
const app = express()
const HotelCollection = require("./hotelCollection.js")
const hotel = require("./hotel.js")
const review = require("./review.js")
var path = require('path')

app.use(express.json());
app.use(express.urlencoded());

const collection = new HotelCollection()


//Serves frontend webpage
app.use(express.static("public"))

//Start server
app.listen(3000, ()=>{
    console.log("Server is listening on port 3000. Ready to accept request.")
})

app.get('/list-hotels', (req,res) =>{
        

        //return list of hotels
        res.send(collection.hotels)
})

app.post('/create-hotel', (req,res) =>{
    const {hotelName, hotelLocation, hotelRating} = req.body
    const newHotel = new hotel(hotelName, hotelLocation)
    const newRating = new review(hotelRating)
    collection.add(newHotel,newRating)
    console.log(req.body)
    res.sendFile('thank-you.html', {root: path.join(__dirname, './public')});
    
})