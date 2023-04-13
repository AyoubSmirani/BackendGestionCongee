const db = require("../DB/database.js")
var filename = '';


 const postCongee = (req,res)=>{
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
 }


 const UpdateCongee = (req,res)=>{
    confirmation = req.body.confirmation;
    id = req.body.id;
    EnvoieRh = req.body.EnvoieRh
    console.log(confirmation,id,EnvoieRh)
    db.query("UPDATE congee SET confirmation=? ,EnvoieRh=?  WHERE id=? ",[confirmation,EnvoieRh,id],(err,rows,fields)=>{
        if(!err){
               res.send({message:'congee is updated'})
        }else{
            res.send({error:err.message})
        }
   })
}

const RhUpdateCongee = (req,res)=>{
    confirmation = req.body.confirmation;
    id = req.body.id;

    db.query("UPDATE congee SET confirmation=? WHERE id=? ",[confirmation,id],(err,rows,fields)=>{
        if(!err){
               res.send({message:'congee is updated'})
        }else{
            res.send({error:err.message})
        }
   })
}

//ORDER BY CASE WHEN confirmation LIKE 'en attente' THEN 'confirmé' ELSE 'refusé' END 

const getAllRhCongee = (req,res)=>{
    const condition = true
    db.query("SELECT * FROM congee where EnvoieRh=?",[condition],(err,rows,fields)=>{
        console.log(rows)
        if(!err){
               res.send(rows)
        }else{
            res.send({error:err.message})
        }
   })
}



const getAllCongee = (req,res)=>{
    const matricule = req.params.matricule
    db.query("SELECT * FROM congee  WHERE matricule=? ORDER BY CASE WHEN confirmation LIKE 'en attente' THEN 'confirmé' ELSE 'refusé' END ",[matricule],(err,rows,fields)=>{
        if(!err){
               res.send(rows)
        }else{
            res.send({error:err.message})
        }
   })
}

const getAllChefCongee = (req,res)=>{

    const SchefEquipe = req.params.chefEM;
    db.query('SELECT * FROM congee WHERE SchefEquipe=?',[SchefEquipe],(err,rows)=>{
        if(!err){
            console.log(rows)
            console.log(rows)
            res.send(rows)
        }else{
            res.send({error:err.message})
        }
    })
}



module.exports = {postCongee,UpdateCongee,RhUpdateCongee,getAllCongee,getAllChefCongee,getAllRhCongee}