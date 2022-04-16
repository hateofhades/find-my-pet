const express = require('express')
var bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')
const uri = "mongodb+srv://sebastian:seb@cluster0.enpab.mongodb.net/cluster0?retryWrites=true&w=majority";

const app = express()
const port = 5050;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

async function displayPosts(collection){
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
    
    try{
        await client.connect();
        const database = client.db("find-my-pet");
        const col = database.collection(collection)
        const result = await col.find({}).toArray
        return result
    }finally{
        await client.close()
    }
}

async function insertMongo(data,collection){
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

    try {
        await client.connect();
        const database = client.db("find-my-pet");
        const col = database.collection(collection);
        const result = await col.insertOne(data);
        console.log(`A post was inserted with the _id: ${result.insertedId}`);
      } finally {
        await client.close();
      }
}


app.get('/',(req, res) =>{
    res.send('Testing')
})

app.post('/lost_post',(req, res) => {
    id_chip = req.body.id
    lost_date = req.body.lost_date
    description = req.body.description
    photo = req.body.photo
    pet_name = req.body.pet_name
    location_x = req.body.lan
    location_y = req.body.lng

    const lost_post = {
        id_chip: id_chip,
        lost_date:lost_date,
        description:description,
        photo:photo,
        pet_name:pet_name,
        lan : location_x,
        lng : location_y,
    }
    insertMongo(lost_post,"lost_posts")
    res.send(lost_post)
})

app.post('/found_post',(req,res) =>{
    photo = req.body.photo
    lan = req.body.lan
    lng = req.body.lng
    contact = req.body.contact
    vet = req.body.vet

    const found_post = {
        photo: photo,
        lan:lan,
        lng:lng,
        contact:contact,
        vet:vet
    }
    insertMongo(found_post,"found_posts")
    res.send(found_post)
})

app.get("/display_posts",(res,req) =>{
})

app.listen(port, () => {
    console.log('working at',port)
})

