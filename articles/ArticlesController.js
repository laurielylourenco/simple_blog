const express = require("express");
const router = express.Router();


router.get("/articles", (req,res) =>{
    res.send("ROTA DE CATEGORIAS")
})
router.get("/admin/articles/new",(req,res) => {
    res.render("admin/categorias/new");
});
router.get("/articles/save", (req,res)=>{

});

module.exports = router;