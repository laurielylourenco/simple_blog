const express = require("express");
const router = express.Router();
const Category = require("../categories/Category")
const Article = require("./Articles.js");
const slugify = require("slugify");
const adminAuth = require("../middleware/admin.js")

router.get("/admin/articles",adminAuth, (req,res) =>{
  
  console.log(req.session.user);
  Article.findAll({

  	 include: [{model: Category}]

    }).then(articles =>{
        res.render("admin/artigos/index",{articles: articles});    
    })
})
router.get("/admin/articles/new",adminAuth,(req,res) => {
  console.log(req.session.user);
	//para selecionar a categoria na view
    Category.findAll().then(categories => {
        res.render("admin/artigos/new", {categories:categories});
    })
    
});
router.post("/article/save", adminAuth, (req,res)=>{
    
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

router.post("/articles/delete", adminAuth, (req,res)=>{
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


router.get("/articles/edit/:id", adminAuth, (req,res)=>{
    var id = req.params.id;

    if(id != undefined){

       if(!isNaN(id)){

        Article.findByPk(id).then(article => {

            if(article != undefined){

                Category.findAll().then(categories => {
                  res.render("admin/artigos/edit", {categories:categories, article:article});
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


router.post("/article/update", adminAuth, (req,res)=>{
    var title = req.body.title;
    var id = req.body.id;
    var body = req.body.body;
    var cat = req.body.category;

    

        Article.update({title: title, body: body, categoryId: cat,slug: slugify(title)},{
            where: {
                id: id
            }
        })
        .then(() =>{
            res.redirect("/admin/articles")
        }).catch((erro) =>{
            res.redirect("/")
        })

});


module.exports = router;