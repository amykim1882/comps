const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://finalproj:harrypotter@cluster0.78py6.mongodb.net/harrypotter-quiz?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true  });

const app = express();
const jsonParser = bodyParser.json();
app.use(cors());

let database = null;
let collection = null;
let scoreCollection = null;

async function connectDB(){
	await client.connect();
	database = client.db("harrypotter-quiz");
	collection = database.collection("quiz");
	scoreCollection = database.collection("score");
}
connectDB();


app.listen(5000, function(){
	console.log("Hello! Server is running on port 5000.")
})

async function getAllQuiz(req, res){
	const query = {};
	let quizCursor = await collection.find(query);
	let quizs = await quizCursor.toArray();
	console.log(quizs);
	// construct my response
	const response = quizs;
	res.json(response);
}
app.get('/quiz', getAllQuiz);

async function getScoreById(req, res){
	// convert the parameter into lowercase and search based on _id
	const id = req.params.id;

	// construct query
	//const query = {};
	// query["_id"] = villagerName;
	const query = {_id:id};
	let scoreCursor = await scoreCollection.find(query);
	let score = await scoreCursor.toArray();

	const response = score;
	res.json(response);
}
app.get("/score/:id", getScoreById);


async function updateScore(req, res){
	// grab the villager informaiton
	const id = req.params.id;
	// grab the new rating that is being sent through body
	const newRating = req.body.score;

	console.log(id);
	console.log(newRating);

	// construct query
	const filter = {_id:id};
	const updateDocument = {
		$set:{
			score: newRating
		}
	};
	const options = { upsert: true };
	// console.log(filter);
	const result = await scoreCollection.updateOne(filter, updateDocument, options);

	// http request code
	// matched dount, modified count
	// i construct a json object that contains both to the client
	const response = [
		{matchedCount : result.matchedCount},
		{modifiedCount: result.modifiedCount}
	];
	console.log(response);
	res.json(response);
}

app.post("/updatescore/:id", jsonParser, updateScore);











