const express = require("express");
const router = express.Router();
const Category = require("./Category.js")
const slugify = require("slugify")
const adminAuth = require("../middleware/admin.js")



router.get("/admin/categorias/new", adminAuth, (req,res) => {
    res.render("admin/categorias/new");
});

router.post("/categorias/save", adminAuth, (req,res)=>{
    var title = req.body.title;

    if(title != undefined){

        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() =>{
            res.redirect("/admin/categorias")
        })

    }else{
        res.redirect("/admin/categorias")
    }
});


router.get("/admin/categorias", adminAuth, (req,res) => {

    Category.findAll().then(categories =>{

    
    res.render("admin/categorias/index",{categories: categories});    
    })
    
});


router.post("/categorias/delete", adminAuth, (req,res)=>{
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


router.get("/admin/categorias/update/:id", adminAuth, (req,res)=>{
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



router.post("/categorias/update", adminAuth, (req,res)=>{
    var title = req.body.title;
    var id = req.body.id;

    if(title != undefined && id != undefined){

        Category.update({title: title, slug: slugify(title)},{
            where: {
                id: id
            }
        })
        .then(() =>{
            res.redirect("/admin/categorias")
        })

    }else{
        res.redirect("/admin/categorias")
    }
});

module.exports = router;