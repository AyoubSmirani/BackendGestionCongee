const express = require("express");
const router = express.Router();
const employeController = require("../Controllers/employe_controller")
const multer = require('multer');
const db = require("../DB/database.js")

var filename = ''

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


router.get('/Getemploye/:matricule',employeController.Getemploye)
router.get('/Getemployees',employeController.Getemployees)
router.get('/getChefMatricule/:nomPrenom',employeController.getChefMatricule)
router.delete('/DeleteEmployee/:matricule',employeController.DeleteEmployee)
router.put('/SetCompteToTrue',employeController.SetCompteToTrue)
router.get('/GetEmployeWithoutAccount/:compteValue',employeController.GetEmployeWithoutAccount)
router.get('/GetChefEmployee',employeController.GetChefEmployee)

router.post('/addEmployee',upload.single('file'),(req,res)=>{
  const matricule = req.body.matricule;
  const employee = {
    matricule : req.body.matricule,
    nomPrenom: req.body.nomPrenom,
    telephone: req.body.telephone,
    email: req.body.email,
    statue: req.body.statue,
    poste: req.body.poste,
    SchefEquipe: req.body.SchefEquipe,
    role:req.body.role,
    sexe:req.body.sexe,
    compte:req.body.compte
  }
  req.body.file = filename
  console.log(employee, req.body, filename)
  	

  db.query(
    "INSERT INTO employe (matricule,nomPrenom,telephone,email,statue,poste,role,SchefEquipe,image,sexe,compte) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
    [
      employee.matricule,employee.nomPrenom, employee.telephone, employee.email, employee.statue, employee.poste,employee.role ,employee.SchefEquipe,
       req.body.file,employee.sexe , employee.compte
      
    ],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows)
        filename = ''
      } else {
        res.send({ error: err.message })
      }
    }
  )
})


router.put('/UpdateEmployee', upload.single('file'), (req, res) => {
    const matricule = req.body.matricule;
    const employee = {
      nomPrenom: req.body.nomPrenom,
      telephone: req.body.telephone,
      email: req.body.email,
      statue: req.body.statue,
      poste: req.body.poste,
      SchefEquipe: req.body.SchefEquipe,
      
    }
    req.body.file = filename
    console.log(employee, ' ', matricule, ' ', filename)
    db.query(
      "UPDATE employe SET nomPrenom=?, telephone=?, email=?, statue=?, poste=?, SchefEquipe=?, image=? WHERE matricule=?",
      [
        employee.nomPrenom, employee.telephone, employee.email, employee.statue, employee.poste, employee.SchefEquipe, req.body.file,
        matricule
      ],
      (err, rows, fields) => {
        if (!err) {
          res.send(rows)
          filename = ''
        } else {
          res.send({ error: err.message })
        }
      }
    )
  })
  



module.exports = router