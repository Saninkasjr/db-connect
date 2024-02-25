const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/font-awesome', express.static(path.join(__dirname, 'font-awesome')));
app.use('/public', express.static(path.join(__dirname)));

const db = new sqlite3.Database('user.db', (err) => {
     if(err) {
          console.error('failed to connect to SQLite database ',err.message)
     } else {
          console.log('connection to SQLite database successful')
     }
});
app.get('/', (req, res)=> {
     res.sendFile('app.html', {root: __dirname})
     });
 app.post('/user', (req,res) => {

     const { name, password } = req.body;
     const query = 'SELECT * FROM accounts WHERE username = ? AND password =?';
     db.get(query,[name, password], (err, row) => {
          if(err) {
               console.error('error:' , err);
               res.status(500).send('internal server error');
          } else {
               if(row) {
               console.log("user found",row);
               res.status(200).json({message:'row.name logging..'});
               
               } else {
                    console.log('user not found');
                  res.status(404).send('user not found');
               }
          }
     });
 });
 app.post('/reg', (req, res) => {
      const {username , password} = req.body;
      query = 'SELECT * FROM accounts WHERE username = ? and password = ?'
      db.get(query,[username, password], (err,row) => {
           if(err) {
                console.error('error:',err)
                res.status(500).send('internal server error');
           } else {
                if(row) {
               console.log('user exist',row);
               res.status(409).json({message : ` the username ${row.username}  already exists`})
                } else {
                    res.status(200).send('accounts signed up');
          db.run("INSERT INTO accounts (username,password) VALUES (?,?)",[username, password], (err) => {
          if(err) {
               console.log(`failed to register ${username}`, err);
               res.status(500).send('internal server error')
          } else {
               console.log(`${username} registered! login to access account`);
               
          }
      
      });
               }
           }
      });
 });
 app.post('/MSG', (req, res) => {
      const { name , Mesg} = req.body;
     db.run('INSERT INTO usermsg (name , message) VALUES (?,?)',[name , Mesg], (err) => {
          if(err) {
               console.error('failed to insert message ', err);
          } else {
               console.log(`user ${name}"s message has been has been inserted successfully`)
          }
          });     
 });
app.listen(PORT, ()=> {
     console.log(`server:${PORT}`)
})