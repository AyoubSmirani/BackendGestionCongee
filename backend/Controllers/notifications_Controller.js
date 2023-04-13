const db = require("../DB/database.js")
const moment = require("moment")


const sendNotification = (req,res)=>{
    var dateToday = new Date()
    var date = moment();
    var currentDate = date.format('YYYY/MM/D');
     
    var notifications = {
     matricule : req.body.matricule,
     message : req.body.message,
     date : currentDate,
     temp:  dateToday.getHours() + ":" + dateToday.getMinutes() + ":" + dateToday.getSeconds(),
     vu:false
    }
 console.log(notifications.date)
     db.query("INSERT INTO notifications (matricule,message,date,temp,vu) VALUES (?,?,?,?,?)",[notifications.matricule,notifications.message,
         notifications.date,notifications.temp,notifications.vu],(err,rows,fields)=>{
          if(!err){
                 res.send({message:'notification is posted'})
          }else{
              res.send({error:err.message})
          }
     })
 }

const GetNotification = (req,res)=>{
    const matricule = req.params.matricule;
    console.log(matricule)
    db.query("SELECT * FROM notifications WHERE matricule=? ORDER BY date,temp DESC" ,[matricule] ,(err,rows,field)=>{
        if(!err){
            res.send(rows)
        }else{
            res.send("aucun notifications existe")
        }
    })
}


const putNotifications = (req,res)=>{
    const vu = req.body.vu;
    const id = req.body.id;
     
    db.query("UPDATE notifications SET vu=? WHERE id=? ",[vu,id],(err,rows,fields)=>{
        if(!err){
               res.send({message:'notifications is updated'})
        }else{
            res.send({error:err.message})
        }
   })

}


module.exports = {sendNotification,GetNotification,putNotifications }