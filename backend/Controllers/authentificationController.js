const db = require("../DB/database.js")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const signin = async(req,res)=>{
    // pass = bcrypt.decodeBase64(password , 12)
    console.log(req.body)
    db.query('SELECT matricule,role,password FROM account WHERE email = ?', [req.body.email], async function (err, rows, fields) {
      if (!err) {
        if (rows.length > 0) {
          const match = await bcrypt.compare(req.body.password, rows[0].password)
          if (match) {
            const data = JSON.stringify(rows[0])
            const token = jwt.sign(data, 'stil')
            res.json({ token })
          } else {
            res.json('mot de passe incorrect')
          }
        } else {
          res.json("utilisateur n'existe pas")
        }
      } else {
        console.log(err)
      }
    })
   }

const test = async (req,res)=>{
    console.log(req.data)
    res.json("test okay")
}

const verifytoken = (req,res,next) =>{   
    if(!req.headers.authorization) {
        return res.status(401).json('no autorization')
    }    
    const token = req.headers.authorization.substr(7)
    if(token!==''){
      const content =  jwt.verify(token,'stil')
      req.data = content
      next()
    }else{
         res.status(401).json('empty token')
    }
 }

 const getAllAccount = (req,res)=>{
    db.query('SELECT * FROM account',(err,rows)=>{
      if(!err){
        res.send(rows)
      }else{
        res.status(404).send(err)
      }
    } )
  } 
  
 const addAccount = (req,res)=>{
  account = {
    matricule:req.body.matricule,
    nomPrenom:req.body.nomPrenom,
    email:req.body.email,
    role:req.body.role,
    password: bcrypt.hashSync(req.body.password, 12)
  }
  db.query(
    "INSERT INTO account (matricule,nomPrenom,email,role,password) VALUES (?,?,?,?,?)",
    [
      account.matricule,account.nomPrenom, account.email, account.role, account.password 
    ],
    (err, rows) => {
      if (!err) {
        res.send(rows)
      } else {
        res.send({ error: err.message })
      }
    }
  )
  } 




  const updateUser = async (req, res) => {
    const { email, oldPassword, newPassword ,matricule} = req.body
    console.log(req.body)
    
    // Update email
    db.query(
      'UPDATE account SET email = ? WHERE matricule = ?',
      [email, matricule],
      async (err, emailRows) => {
        if (err) {
          return res.send({ error: err.message })
        }
        
        if (emailRows.affectedRows === 0) {
          return res.send("L'utilisateur n'existe pas")
        }
  
        // Update password
        db.query(
          'SELECT password FROM account WHERE matricule = ?',
          [matricule],
          async (err, passwordRows) => {
            if (err) {
              return res.send({ error: err.message })
            }
  
            if (passwordRows.length === 0) {
              return res.send("L'utilisateur n'existe pas")
            }
             console.log(oldPassword, passwordRows[0].password)
            const match = await  bcrypt.compare(oldPassword, passwordRows[0].password)
            
            console.log(match)
            if (!match) {
              return res.send('Mot de passe incorrect')
            }
  
            const newHashedPassword = bcrypt.hashSync(newPassword, 12)
            db.query(
              'UPDATE account SET password = ? WHERE matricule = ?',
              [newHashedPassword, matricule],
              (err, passwordRows) => {
                if (err) {
                  return res.send({ error: err.message })
                }
  
                if (passwordRows.affectedRows === 0) {
                  return res.send("L'utilisateur n'existe pas")
                }
  
                res.send('Adresse email et mot de passe mis à jour avec succès')
              }
            )
          }
        )
      }
    )
  }
  
  
  module.exports = { signin, test, verifytoken, getAllAccount, addAccount, updateUser }
  












