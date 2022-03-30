const express = require("express");
const router = express.Router();
const Category = require("../categories/Category")
const Article = require("./Articles.js");
const slugify = require("slugify");


router.get("/admin/articles", (req,res) =>{
  
  Article.findAll({

  	 include: [{model: Category}]

    }).then(articles =>{
        res.render("admin/artigos/index",{articles: articles});    
    })
})
router.get("/admin/articles/new",(req,res) => {

	//para selecionar a categoria na view
    Category.findAll().then(categories => {
        res.render("admin/artigos/new", {categories:categories});
    })
    
});
router.post("/article/save", (req,res)=>{
    
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() =>{
            res.redirect("/admin/articles")
       })

});

router.post("/articles/delete", (req,res)=>{
    var id = req.body.id;

    if(id != undefined){

       if(!isNaN(id)){
        Article.destroy({
            where :{
                id:id
            }
        }).then(() =>{

            res.redirect("/admin/articles")
        })


       }else{
         res.redirect("/admin/articles")
       }

    }else{
        res.redirect("/admin/articles")
    }
});


router.get("/articles/edit/:id", (req,res)=>{
    var id = req.params.id;

    if(id != undefined){

       if(!isNaN(id)){

        Article.findByPk(id).then(article => {

            if(article != undefined){

                Category.findAll().then(categories => {
                  res.render("admin/artigos/edit", {categories:categories, articles:article});
                });
            }else{
                res.redirect("/admin/articles")
            }
        }).catch(err =>{
            res.redirect("/admin/articles")
        })

       }else{
         res.redirect("/admin/articles")
       }

    }else{
        res.redirect("/admin/articles")
    }
});


module.exports = router;