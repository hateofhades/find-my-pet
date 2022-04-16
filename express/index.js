const express = require('express')
var bodyParser = require('body-parser')
const { MongoClient } = require('mongodb');
const { options } = require('nodemon/lib/config');
const uri = "mongodb+srv://sebastian:seb@cluster0.enpab.mongodb.net/cluster0?retryWrites=true&w=majority";

const app = express()
const port = 5050;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

async function displayPosts(collection, query, options){
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
    var result = []
    try{
        await client.connect();
        const database = client.db("find-my-pet");
        const col = database.collection(collection)

        const cursor = col.find(query, options)

        if((await col.estimatedDocumentCount) == 0){
            console.log("No items found")
        }

        await cursor.forEach((e) => {
            result.push(e)
        })
        // console.log(result)
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

app.post('/lost_post',(req, res) => {
    const id_chip = req.body.id
    const lost_date = req.body.lost_date
    const description = req.body.description
    const photo = req.body.photo
    const pet_name = req.body.pet_name
    const lan = req.body.lan
    const lng = req.body.lng
    const account_id = req.body.accound_id
    const pet_type = req.body.pet_type
    const pet_breed = req.body.pet_breed

    const lost_post = {
        id_chip,
        lost_date,
        description,
        photo,
        pet_name,
        lan,
        lng,
        account_id,
        pet_type,
        pet_breed
    }
    insertMongo(lost_post,"lost_posts")
    res.send(lost_post)
})

app.post('/found_post',(req,res) =>{
    const photo = req.body.photo
    const lan = req.body.lan
    const lng = req.body.lng
    const contact = req.body.contact
    const vet = req.body.vet
    const account_id = req.body.accound_id
    const pet_type = req.body.pet_type
    const pet_breed = req.body.pet_breed
    const date = req.body.date

    const found_post = {
        photo,
        lan,
        lng,
        contact,
        vet,
        account_id,
        pet_type,
        pet_breed,
        date
    }
    insertMongo(found_post,"found_posts")
    res.send(found_post)
})

app.post('/review',(req,res) =>{
    const id = req.body.account_id
    const rating = req.body.rating
    const post_id = req.body.post_id
    const description = req.body.description
    const account_id = req.body.accound_id

    const review = {
        id,
        rating,
        post_id,
        description,
        account_id
    }
    insertMongo(found_post,"review")
    res.send(found_post)
})

app.get("/display_posts_lost",async (req,res) =>{
    options = {
    }
    const result =  await displayPosts("lost_posts","",options)
    res.json(result)
})


app.get("/display_posts_found",async (req,res) =>{
    options = {
    }
    const result =  await displayPosts("found_posts","",options)
    res.json(result)
})


app.listen(port, () => {
    console.log('working at',port)
})
