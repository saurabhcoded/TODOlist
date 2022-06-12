const express=require('express');
const userController=require('../controllers/Item');
const Router=express.Router();


Router.post('/insert',userController.create);
Router.get('/',userController.findAll);
Router.delete('/delete/:id',userController.delete);
Router.put('/update/',userController.update);

module.exports=Router;