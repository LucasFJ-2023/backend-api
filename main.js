const express = require("express");
//npm install mysql2 --save
const mysql = require("mysql2");
//npm install cors --save
const cors = require("cors");

const app = express();
const port = 3000;


app.use(express());
app.use(express.json());

//Host, user, password database
const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    port: 3306,
    password:"Rækkehus2023",
    database:"cafe_finder"
});





// Returnere alle caféer //
app.get('/cafes', (req, res) => {
    connection.query('SELECT * FROM cafes', (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});




// Returnere alle users //
app.get('/user', (req, res) => {
    connection.query('SELECT * FROM users', (error, results, fields) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});





// Hente information på bestemt user_id //
app.get('/user/:id',(req, res)=>{
    const id = req.params.id
    connection.query('SELECT * FROM users WHERE id = ?',
        [id],(error,results)=>{
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(results);
    });
});





// Hente information på bestemt cafe_ide //
app.get('/cafe/:id',(req, res)=>{
    const id = req.params.id

    connection.query('SELECT * FROM cafes WHERE id = ?',
        [id],(error,results)=>{
            if (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send(results);
        });
});





// Find café ved søgning af by //
app.get('/cafes/search', (req,res)=>{
    const city = req.query.city;
    connection.query('SELECT * FROM cafes WHERE city = ?',
        [city],
        (error, results)=>{
            if (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send(results);
        });
});





// Oprette ny bruger //
app.post('/new/user',(req,res) => {

    const username = req.body.username
    const email = req.body.email

    connection.query(
        'INSERT INTO `users`(username, email) values (?,?)',
        [username, email],
        function (err, results) {
            if (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send(results)
        }
    )
})




// Oprette ny cafe //
app.post('/new/cafe',(req,res) => {
    //Get the data from the request body
    const cafeName = req.body.cafeName
    const address = req.body.address
    const city = req.body.city
    const star = req.body.star

    connection.query(
        'INSERT INTO `cafes`(cafe_name, address, city, star) values (?, ?, ?, ?)',
        [cafeName, address, city, star],
        function (err, results) {
            if (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send(results)
        }
    )
})




// Oprette ny favorit //
app.post('/new/favorite',(req,res) => {
    //Get the data from the request body
    const userId = req.body.userId
    const cafeId = req.body.cafeId

    connection.query(
        'INSERT INTO `favorites`(user_id, cafe_id) values (?,?)',
        [userId, cafeId],
        function (err, results) {
            if (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send(results)
        }
    )
})





// Oprette nye åbningstider til caféer //
app.post('/new/openingHours',(req,res) => {
    //Get the data from the request body
    const cafeId = req.body.cafeId
    const dayOfWeek = req.body.dayOfWeek
    const openingTime = req.body.openingTime
    const closingTime = req.body.closingTime

    connection.query(
        'INSERT INTO `opening_hours`(cafe_id, day_of_week, opening_time, closing_time) values (?,?,?,?)',
        [cafeId, dayOfWeek, openingTime, closingTime],
        function (err, results) {
            if (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.send(results)
        }
    )
})




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

