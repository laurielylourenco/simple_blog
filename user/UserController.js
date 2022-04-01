const express = require("express");
const router = express.Router();
const User = require('./User.js');
const bcryptjs = require("bcryptjs");

router.get("/admin/users",(req,res) =>{


		User.findAll()
		.then(users => {
			res.render("admin/users/index",{users: users})
		});
});


router.get("/admin/users/create",(req,res) =>{
	res.render("admin/users/create")
});

router.post("/user/create",(req,res) =>{
	var email = req.body.email;
	var password = req.body.password;

	User.findOne({where:{email:email}}).then(user => {
		if(user == undefined){
			var salt = bcryptjs.genSaltSync(10);
			var hash = bcryptjs.hashSync(password,salt);

			User.create({
	            email: email,
	            password: hash
	        }).then(() =>{
	            res.redirect("/")
	        }).catch((error) =>{
	        	res.redirect("/admin/users/create")
	        })
		}else{
			res.redirect("/admin/users/create")
		}
	})
});

router.get("/admin/login",(req,res) =>{
	res.render("admin/users/login")
});


router.post("/authenticate",(req,res) =>{
	var email = req.body.email;
	var password = req.body.password;

		User.findOne({where:{email:email}}).then(user => {
			if(user == undefined){
				//validar senha
				var correct  = bcryptjs.compareSync(password,user.password);

				if(correct){
					req.session.user = {
						id : user.id,
						email: user.email
					}

					res.redirect("/")
				}else{
					res.redirect("/login")
				}


			}else{
				res.redirect("/login")
			}
		})
});


module.exports = router;