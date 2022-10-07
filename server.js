const express = require('express');

const cors = require('cors')
const {Client} = require('pg');
const PORT = process.env.PORT || 3001;
const connectionString = 'postgresql://postgres:docker@127.0.0.1:5432/cars_db';
const client = new Client ({
    connectionString:connectionString,
});

let corsOptions = {
    config:'/root/fullStack/index.html',
}
client.connect()

const app = express();
app.use(express.json())
app.use(cors())

app.use(express.static('public'))
app.route('/api/cars')
.get((req,res) => {
client.query('SELECT * FROM cars')
.then(result => {
    res.status(200).send(result.rows)
 })
})
.post((req,res) => {
let {make,model,car_year,car_type,owners_id} = req.body 
 client.query('INSERT INTO cars (make, model, car_year, car_type, owners_id) VALUES ($1,$2,$3,$4,$5)',[make, model, car_year, car_type, owners_id],
 (error,results) => {
    if(error) {
        console.log(error)
    }
    console.log(owners_id)
    res.status(201).send(`added ${make} , ${model}`)
 })
    
})

app.route('/api/cars/:id')
.patch((req, res) => {
    let id = req.params.id;
    
    
    let {make,model,car_year,car_type,owners_id} = req.body 
    if(make) {
        client.query(`UPDATE cars SET make = $1 WHERE car_id = $2`,[make,id]) 
    }
    if(model) {
        client.query(`UPDATE cars SET model = '${model}' WHERE car_id = '${id}'`)
    }
    if(car_year) {
        client.query(`UPDATE cars SET car_year = '${car_year}' WHERE car_id = '${id}'`)
    }
    if(car_type){
        client.query(`UPDATE cars SET car_type = '${car_type}' WHERE car_id = '${id}'`)
    }
    if(owners_id) {
        client.query(`UPDATE cars SET owners_id = '${owners_id}' WHERE car_id = '${id}'`)

    }
    res.status(201).send(`car with ${id} updated`)
   
  
})

.delete((req,res) => {
    let id = req.params.id;
    client.query(`DELETE FROM cars WHERE car_id = ${id}`)
    .then(results =>{
        res.status(202).send(`deleted car with id of ${id}`)

    })

})
.get((req,res) => {
    let id = req.params.id;
    client.query(`SELECT * FROM cars WHERE car_id = ${id}`)
    .then(result => {
        res.status(200).send(result.rows)
     })
    })

app.use(express.static('public'))
app.route('/api')
.get((req,res)=>{
    client.query('SELECT * FROM owners,cars')
    .then(results => {
        res.status(200).send(results.rows)
    })
})

app.listen(PORT,() => {
console.log('listening on port', PORT)
});