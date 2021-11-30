
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://finalproj:harrypotter@cluster0.78py6.mongodb.net/harrypotter-quiz?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true  });

async function connectDB(){
	await client.connect();
	// database -> collections -> documents
	// define a database
	const database = client.db("harrypotter-quiz");
	// name of the database
	// if you already have a database with the same name
	// it will use that database
	// if you don't
	// it will one with the name
	// define collections

	const collection = database.collection("quiz");
	const quizDocuments = [
		{
			"_id" : "one",
			"question" : "Who is a famous member of S.P.E.W.?",
			"correct" : "Dobby",
			"wrong1" : "Winky",
			"wrong2" : "Kreacher",
			"wrong3" : "Hokey"
		},

		{
			"_id" : "two",
			"question" : "Who is the grandfather of Scorpius Malfoy",
			"correct" : "Lucius Malfoy",
			"wrong1" : "Draco Malfoy",
			"wrong2" : "Nicholas Malfoy",
			"wrong3" : "Abraxas Malfoy"
		},

		{
			"_id" : "three",
			"question" : "Where was the graveyard located where Lord Voldemort made his return?",
			"correct" : "Little Hangleton",
			"wrong1" : "Godric's Hollow",
			"wrong2" : "Azkaban",
			"wrong3" : "Hogwarts"
		},

		{
			"_id" : "four",
			"question" : "What is the name of Britain's high court of law for wizarding matters?",
			"correct" : "Wizengamot",
			"wrong1" : " Department of Magical Law Enforcement",
			"wrong2" : "Ministry of Magic",
			"wrong3" : "Muggle Mystery"
		},

		{
			"_id" : "five",
			"question" : "Which chess piece does the Lovegood House resemble?",
			"correct" : "A Rook",
			"wrong1" : "A King",
			"wrong2" : "A Bishop",
			"wrong3" : "A Pawn"
		},

		{
			"_id" : "six",
			"question" : "What is the name of Albus Dumbledore's brother?",
			"correct" : "Aberforth",
			"wrong1" : "Percival",
			"wrong2" : "Ronald",
			"wrong3" : "Sam"
		},

		{
			"_id" : "seven",
			"question" : "Who hosts the Potterwatch pirate radio show?",
			"correct" : "Lee Jordan",
			"wrong1" : " Fred Weasley",
			"wrong2" : "Remus Lupin",
			"wrong3" : "Kingsley Shacklebolt"
		},

		{
			"_id" : "eight",
			"question" : "What store in Diagon Alley sells ingredients for potion making?",
			"correct" : "Apothecary",
			"wrong1" : " Now You See Me",
			"wrong2" : "The Love Shack",
			"wrong3" : "Magic Plus"
		},

		{
			"_id" : "nine",
			"question" : "In what year was the first Harry Potter movie released?",
			"correct" : "2001",
			"wrong1" : " 1998",
			"wrong2" : "1999",
			"wrong3" : "2000"
		},

		{
			"_id" : "ten",
			"question" : "Which actor plays Neville Longbottom in the Harry Potter movies?",
			"correct" : "Matthew David Lewis",
			"wrong1" : "Robert Downey Jr.",
			"wrong2" : "Daniel Radcliffe",
			"wrong3" : "Michael Jai White"
		}


	];
	
	const result = await collection.insertMany(quizDocuments);
	console.log(result.insertedCount);
	client.close();
}
connectDB();










