const express = require("express");
var bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const uri =
  "mongodb+srv://sebastian:seb@cluster0.enpab.mongodb.net/cluster0?retryWrites=true&w=majority";

const app = express();
const port = 5050;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

async function searchForWords(query){
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      var result = [];
      var posts = [];
      try{
          await client.connect();

          found_posts = await displayPosts("found_posts","","")
          lost_posts = await displayPosts("lost_posts","","")

          if(Array.isArray(query) == true){
            found_posts.forEach(element =>{
              query.forEach(q => {
                if(element.description.includes(q) || element.contact == (q) || element.pet_name == (q) || element.pet_breed.includes(q) || element.pet_type == (q)){
                  posts.push(element)
                }
              })
            })
  
            lost_posts.forEach(element =>{
              query.forEach(q => {
                if(element.pet_name == (q) || element.description.includes(q) || element.id_chip == (q) || element.pet_breed.includes(q) || element.pet_type == (q)){
                  posts.push(element)
                }
              })
            })
          }

          else{
            found_posts.forEach(element =>{
              if(element.description.includes(query) || element.contact == (query) || element.pet_name == (query) || element.pet_breed.includes(query) || element.pet_type == (query)){
                console.log("here")
                posts.push(element)
              }
            })

            lost_posts.forEach(element =>{
                if(element.pet_name == (query) || element.description.includes(query) || element.id_chip == (query) || element.pet_breed.includes(query) || element.pet_type == (query)){
                  console.log("here")
                  posts.push(element)
                }
            })
          }
        console.log(posts)
      }finally{
          client.close()
          return posts
      }
}
async function insertMongo(data, collection) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

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

async function update_mongo(user) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db("find-my-pet");
    const col = database.collection("accounts");

    const filter = { email: user.email };
    const options = { upsert: true };

    const updateDoc = {
      $set: {
        phone: user.phone,
      },
    };

    const result = await col.updateOne(filter, updateDoc, options);
    console.log(result);
  } finally {
    await client.close();
  }
}
async function check_user(user) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  var is_already = false;

  try {
    await client.connect();
    const database = client.db("find-my-pet");
    const col = database.collection("accounts");
    results = await displayPosts("accounts", "", "");
    results.forEach((element) => {
      if (element.email == user.email) {
        is_already = true;
      }
    });

    if (is_already == true) {
      return 0;
    }
  } finally {
    await client.close();
  }
}

async function displayPosts(collection, query, options) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  var result = [];
  try {
    await client.connect();
    const database = client.db("find-my-pet");
    const col = database.collection(collection);

    const cursor = col.find(query, options);

    if ((await col.estimatedDocumentCount) == 0) {
      console.log("No items found");
    }

    await cursor.forEach((e) => {
      result.push(e);
    });
    // console.log(result)
    return result;
  } finally {
    await client.close();
  }
}

app.post("/lost_post", (req, res) => {
  console.log(req.body);
  const id_chip = req.body.id;
  const lost_date = req.body.lost_date;
  const description = req.body.description;
  const photo = req.body.photo;
  const pet_name = req.body.pet_name;
  const lan = req.body.lan;
  const lng = req.body.lng;
  const account_id = req.body.accound_id;
  const pet_type = req.body.pet_type;
  const pet_breed = req.body.pet_breed;
  const email = req.body.email;
  const phone = req.body.phone;

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
    pet_breed,
    email,
    phone,
  };
  insertMongo(lost_post, "lost_posts");
  res.send(lost_post);
});

app.post("/found_post", (req, res) => {
  const photo = req.body.photo;
  const lan = req.body.lan;
  const lng = req.body.lng;
  const vet = req.body.vet;
  const account_id = req.body.accound_id;
  const pet_type = req.body.pet_type;
  const pet_breed = req.body.pet_breed;
  const date = req.body.date;
  const description = req.body.description;
  const email = req.body.email;
  const phone = req.body.phone;

  const found_post = {
    photo,
    lan,
    lng,
    vet,
    account_id,
    pet_type,
    pet_breed,
    date,
    email,
    phone,
    description,
  };
  insertMongo(found_post, "found_posts");
  res.send(found_post);
});

app.post("/review", (req, res) => {
  const id = req.body.account_id;
  const rating = req.body.rating;
  const post_id = req.body.post_id;
  const description = req.body.description;
  const account_id = req.body.accound_id;

  const review = {
    id,
    rating,
    post_id,
    description,
    account_id,
  };
  insertMongo(review, "review");
  res.send(review);
});

app.get("/display_posts_lost", async (req, res) => {
  const optiones = {};
  const result = await displayPosts("lost_posts", "", optiones);
  res.json(result);
});

app.get("/display_posts_found", async (req, res) => {
  const optiones = {};
  const result = await displayPosts("found_posts", "", optiones);
  res.json(result);
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const photo_url = req.body.picture;
  const username = req.body.user;

  user = {
    email,
    photo_url,
    username,
  };

  result = await check_user(email);
  if (result != 0) {
    insertMongo(user, "accounts");
  }
  res.send("yip");
});

app.post("/phone", async (req, res) => {
  const phone = req.body.phone;
  const email = req.body.email;

  user = {
    email,
    phone,
  };

  update_mongo(user);
  res.send(user);
});

app.get("/getuser", async (req, res) => {
  const user = req.body.email;
  const result = await displayUser(user);
  res.json(result);
});

app.get("/userposts", async (req, res) => {
  const user = req.body.email;
});

app.get("/getkeywords", async (req,res) =>{
    keywords = req.query;
    var output = await searchForWords(keywords['keywords'])
    console.log(keywords['keywords'])
    res.json(output)
})

app.listen(port, () => {
  console.log("working at", port);
});
