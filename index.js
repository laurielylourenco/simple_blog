const express = require("express")
const app = express()
const bp = require("body-parser")
const connection = require("./database/database.js")
const categoriesController = require("./categories/CategoriesController.js")
const articlesController = require("./articles/ArticlesController.js")


const Category = require("./categories/Category.js");
const Articles = require("./articles/Articles.js");




app.set('view engine', 'ejs')
app.use(bp.urlencoded({extended: false}))
app.use(bp.json());
app.use(express.static('public'))


connection
	.authenticate()
	.then(() =>{

		console.log("connection feita com sucesso!!")
	})
	.catch((error) => {
		console.log(error)
	});

app.use("/", categoriesController);
app.use("/", articlesController);


app.get('/', (req,res) => {
	res.render("index")
})

app.listen(4500, () =>{
	console.log('Run, run')	
})