const db = require("../DB/database.js")

const Getemploye = (req,res)=>{ 
    const matricule = req.params.matricule;
    db.query("SELECT * FROM employe WHERE matricule=?",[matricule],(err,rows,fields)=>{
         if(!err){
            if(rows.length>0){
                res.send(rows[0])
            }
            else{
                res.send("user n'existe pas")
            }
         }else{
             res.send({error:err.message})
         }
    })
}

const Getemployees = (req,res)=>{
    db.query("SELECT * FROM employe" , (err,rows,field)=>{
        if(!err){
            res.send(rows);
        }else{
            res.send("aucun employé existe");
        }
    })
}


const getChefMatricule = (req,res)=>{
    const nomPrenom = req.params.nomPrenom;
    db.query("SELECT matricule FROM employe where nomPrenom=?",[nomPrenom] , (err,rows,field)=>{
        if(!err){
            res.send(rows);
        }else{
            res.send("aucun employé existe");
        }
    })
}


const DeleteEmployee = (req,res)=> {
  const matricule = req.params.matricule;
    db.query("DELETE fROM employe where matricule=?",[matricule] , (err,rows,field)=>{
        if(!err){
            res.send('deleted Employee');
        }else{
            res.send("aucun employé existe");
        }
    })
}



const UpdateEmployee = (req,res)=>{
    const matricule = req.params.matricule;
    const employee = {
        nomPrenom : req.body.nomPrenom,
        telephone : req.body.telephone,
        email : req.body.email,
        statue : req.body.statue,
        poste : req.body.poste,
      //  role : req.body.role,
        image : req.body.image,
        SchefEquipe : req.body.SchefEquipe
    }
    console.log(employee,' ',matricule,' ',filename)
    db.query("UPDATE employe SET nomPrenom=?,telephone=?,email=?,statue=?,poste=?,image=?,SchefEquipe=?  WHERE matricule=? ",[
       employee.nomPrenom,employee.telephone,employee.email,employee.statue,employee.statue,employee.poste,employee.image,employee.SchefEquipe,
       matricule 
    ],(err,rows,fields)=>{
        if(!err){
               res.send(rows)
        }else{
            res.send({error:err.message})
        }
   })
}

const  SetCompteToTrue = (req,res)=>{
    const matricule = req.body.matricule;
    const compteUpdated = req.body.compteUpdated
    console.log(req.body)
    db.query("UPDATE employe SET compte=? WHERE matricule=?",[compteUpdated,matricule],(err,rows)=>{
        if(!err){
           res.send('affected compte')
        }else{
            res.send({error:err.message})
        }
    })
}


const GetEmployeWithoutAccount = (req,res)=>{
    const compteValue = req.params.compteValue
    console.log(compteValue)
    db.query("SELECT role,matricule,nomPrenom FROM employe WHERE compte=?",[compteValue] , (err,rows,field)=>{
        if(!err){
            res.send(rows);
        }else{
            res.send("aucun employé existe");
        }
    })
}

const GetChefEmployee = (req,res)=>{
    const role = 'chef département'
    db.query("SELECT nomPrenom FROM employe WHERE role=?",[role] , (err,rows,field)=>{
        if(!err){
            res.send(rows);
        }else{
            res.send("aucun employé existe");
        }
    })

}





module.exports = { Getemploye, Getemployees, getChefMatricule,DeleteEmployee,UpdateEmployee,SetCompteToTrue,GetEmployeWithoutAccount,GetChefEmployee }