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

router.post("/artigos/delete", (req,res)=>{
    var id = req.body.id;

    if(id != undefined){

       if(!isNaN(id)){
        Category.destroy({
            where :{
                id:id
            }
        }).then(() =>{

            res.redirect("/admin/categorias")
        })


       }else{
         res.redirect("/admin/categorias")
       }

    }else{
        res.redirect("/admin/categorias")
    }
});

module.exports = router;