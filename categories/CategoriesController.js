const express = require("express");
const router = express.Router();
const Category = require("./Category.js")
const slugify = require("slugify")


router.get("/categories", (req,res) =>{
    res.send("ROTA DE CATEGORIAS")
})

router.get("/admin/categorias/new",(req,res) => {
    res.render("admin/categorias/new");
});

router.post("/categorias/save", (req,res)=>{
    var title = req.body.title;

    if(title != undefined){

        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() =>{
            res.redirect("/")
        })

    }else{
        res.redirect("/admin/categorias/new")
    }
});


router.get("/admin/categorias",(req,res) => {

    Category.findAll().then(categories =>{

    
    res.render("admin/categorias/index",{categories: categories});    
    })
    
});


router.post("/categorias/delete", (req,res)=>{
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


router.get("/admin/categorias/update/:id", (req,res)=>{
    var id = req.params.id;
    if(!isNaN(id)){
        Category.findByPk(id).then((categories) =>{
                if(categories != undefined){
                    res.render("admin/categorias/edit",{categories: categories});    
                }else{
                   res.redirect("/admin/categorias")
                }
        }).catch(erro =>{
                res.redirect("/admin/categorias")
        })
    }else{
        res.redirect("/admin/categorias")
    }
    
});

module.exports = router;