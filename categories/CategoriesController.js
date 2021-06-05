const express = require('express');
const router = express.Router();
const Category = require("./Category")
const slugify = require("slugify")

//RENDERIZAR TELA PARA CADASTRAR NOVA CATEGORIA:
router.get('/admin/categories/new', (req, res)=>{
    res.render('admin/categories/new')
})


//CRIANDO UMA ROTA POST PARA PEGAR OS DADOS DA NOVA CATEGORIA, TÍTULO E O SLUG:
router.post("/categories/save", (req, res)=>{
    let title = req.body.title;
    if(title != undefined){

        Category.create({
            title: title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect("/admin/categories")
        })

    }else {
        res.redirect('/admin/categories/new')
    }
});

//CRIANDO UMA ROTA PARA RENDERIZAR TELA DE CATEGORIAS:
router.get("/admin/categories", (req, res)=>{
    Category.findAll().then(categories => { 
        res.render("admin/categories/index", {categories: categories})
    })
    
})

//CRIANDO ROTA POST PARA PEGAR OS DADOS DA CATEGORIA QUE SERÁ DELETADA:
router.post("/categories/delete", (req, res)=>{
    var id = req.body.id
    if(id != undefined){
        if(!isNaN(id)){
            Category.destroy({
                where: {
                    id: id
                }
            }).then(()=>{
                res.redirect("/admin/categories")
            })
        }else {
            res.redirect("/admin/categories")
        }
    }else {
        res.redirect("/admin/categories")
    }
})

//CRIANDO ROTA PARA RENDERIZAR TELA DE EDIÇÃO DE CATEGORIAS:
router.get("/admin/categories/edit/:id", (req, res)=>{
    var id = req.params.id;
    if(isNaN(id)){
        res.redirect("/admin/categories");
    }
    Category.findByPk(id).then(category => {
        if(category != undefined){

            res.render("admin/categories/edit", {category: category})

        }else {
            req.redirect("/admin/categories")
        }
    }).catch(err => {
        res.redirect("/admin/categories")
    })
})


//CRIANDO ROTA POST PARA PEGAR OS DADOS DE UMA CATEGORIA E ATUALIZARA CONFORME O USUÁRIO DESEJAR
router.post("/categories/update", (req,res)=>{
    let id = req.body.id;
    let title = req.body.title;

    Category.update({title: title, slug: slugify(title)}, {
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect("/admin/categories")
    })
})

module.exports = router;