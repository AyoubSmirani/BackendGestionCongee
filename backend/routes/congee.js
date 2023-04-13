const express = require("express");
const congeeController = require("../Controllers/congee_Controller.js");
const router = express.Router();
const multer = require('multer');

filename = ''

const mystorage = multer.diskStorage(
    {
        destination:(req,file,cb)=>{
            cb(null,'./images')
        },
        filename:( req , file , cb )=>{
            let date = Date.now();
            //53453535345.jpg
            // image/png
            // [ 'image', 'png' ]
            console.log(file)
            let fl = date + '.' + file.mimetype.split('/')[1];
            cb(null, fl);
            filename = fl;
        } 
    }
);

const upload = multer({ storage: mystorage })


router.post('/postCongee', upload.single('file'), congeeController.postCongee);

router.put('/UpdateCongee', congeeController.UpdateCongee);

router.put('/RhUpdateCongee', congeeController.RhUpdateCongee);

router.get('/getAllRhCongee', congeeController.getAllRhCongee);

router.get('/getAllCongee/:matricule', congeeController.getAllCongee);

router.get('/getAllChefCongee/:chefEM', congeeController.getAllChefCongee);








/*router.post('/postCongee', upload.single('file') ,(req,res)=>{
    var congee = {
        matricule:req.body.matricule,
         dateD:req.body.dateDepart,
        dateF:req.body.dateRetour,
        type:req.body.type,
        confirmation:req.body.confirmation,
        duree:req.body.duree,
        nomPrenom:req.body.nomPrenom,
        image:req.body.image,
        SchefEquipe:req.body.SchefEquipe,
        EnvoieRh:req.body.EnvoieRh
    } 
    req.body.file = filename
     console.log(congee)
    db.query("INSERT INTO congee (matricule,nomPrenom,image,dateD,dateF,type,justification,confirmation,duree,SchefEquipe,EnvoieRh) VALUES (?,?,?,?,?,?,?,?,?,?,?)",[congee.matricule,
        congee.nomPrenom,congee.image
        ,congee.dateD,congee.dateF
        ,congee.type,req.body.file,
        congee.confirmation,congee.duree,
        congee.SchefEquipe,congee.EnvoieRh],(err,rows,fields)=>{
         if(!err){
                res.send({message:'congee is posted'})
                filename = ''
         }else{
             res.send({error:err.message})
         }
    })
})

///////////////////////////////////////////////////////

*/




module.exports = router