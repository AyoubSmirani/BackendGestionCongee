const db = require("../DB/database.js")


const postFormation = (req,res)=>{  
    const formation = {
        title:req.body.title,
        start:req.body.start,
        end:req.body.end,
        color:req.body.color,
        nomCentre:req.body.nomCentre,
        duree:req.body.duree,
    } 
    console.log(formation)
    db.query("INSERT INTO formation (title,start,end,color,nomCentre,duree) VALUES (?,?,?,?,?,?)",[formation.title,formation.start,formation.end,
        formation.color,formation.nomCentre,formation.duree],(err,rows,fields)=>{
         if(!err){
                res.send({message:'formation is posted'})
                console.log('ooo')
             
         }else{
             res.send({error:err.message})
         }
    })   
}


const getAllFormation = (req,res)=>{
  
    db.query("SELECT * FROM formation",(err,rows,fields)=>{
        if(!err){
               res.send(rows)
        }else{
            res.send({error:err.message})
        }
   })
}

const affctedFormationByPoste = (req,res)=>{
    const formation = {
        idformation:req.body.idformation,
        poste:req.body.poste,
    }
    db.query("INSERT INTO gformation (idformation,poste) VALUES (?,?)",[formation.idformation,formation.poste],(err,rows,fields)=>{
        if(!err){
               res.send({message:'formation is affected'})
            
        }else{
            res.send({error:err.message})
        }
   })
}

const getListFormation = (req,res)=>{
    const matricule = req.params.matricule

db.query("SELECT  title,start,end,color,nomCentre,duree	 FROM gformation,employe,formation WHERE gformation.poste=employe.poste and formation.id=gformation.idformation and employe.matricule=?"
   ,[matricule]
   ,(err,rows,fields)=>{
       if(!err){
      if(rows.length > 0){
         let day1 = rows[0].start.getDate();
          let month1 = rows[0].start.getMonth() + 1;
          let year1 = rows[0].start.getFullYear();

          let day2 = rows[0].end.getDate();
          let month2 = rows[0].end.getMonth() + 1;
          let year2 = rows[0].end.getFullYear();

           rows[0].start = `${year1}-${month1}-${day1}`;
           rows[0].end = `${year2}-${month2}-${day2}`;
           console.log(rows[0].end)
       
              res.send(rows)
            }
            res.send(rows)
       }else{
           res.send({error:err.message})
       }
  })
}

const getListPoste = (req,res)=>{
    db.query("SELECT DISTINCT poste FROM employe",(err,rows,fields)=>{
        if(!err){
               res.send(rows)
        }else{
            res.send({error:err.message})
        }
   })
}


module.exports = { postFormation, getAllFormation,affctedFormationByPoste,getListFormation,getListPoste }