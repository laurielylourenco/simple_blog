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
	
	Articles.findAll({
		order:[
			['id','DESC']
		]
	}).then(articles =>{

		Category.findAll().then(cate =>{
			res.render("index", {articles:articles, categories: cate})
		})
		
	})
	
})

app.get('/:slug', (req,res) => {
	var slug  = req.params.slug;

	Articles.findOne({
		where:{
			slug:slug
		}	
	}).then(articles =>{
		if(articles != undefined){
			
			Category.findAll().then(cate =>{
				res.render("article", {articles:articles, categories: cate})
			})

		}else{
			res.redirect("/")
		}
	}).catch(err =>{
		res.redirect("/")
	})
	
})

app.get('/category/:slug', (req,res) => {
	var slug  = req.params.slug;

	Category.findOne({
		where:{
			slug:slug
		},
		include:[{model:Articles}]	
	}).then(category =>{
		if(category != undefined){
			
			Category.findAll().then(cate =>{
				res.render("index", {articles: category.articles, categories: cate})
			})

		}else{
			res.redirect("/")
		}
	}).catch(err =>{
		res.redirect("/")
	})
	
})



app.listen(4500, () =>{
	console.log('Run, run')	
})