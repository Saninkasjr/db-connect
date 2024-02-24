const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

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

     const { name } = req.body;
     const query = 'SELECT * FROM username WHERE name = ?';
     db.get(query,[name], (err, row) => {
          if(err) {
               console.error('error:' , err);
               res.status(500).send('internal server error');
          } else {
               if(row) {
               console.log("successfully found user",row);
               res.status(200).json(row);
               } else {
                    console.log('user not found');
                  res.status(404).send('user not found');
               }
          }
     });
 });
app.listen(PORT, ()=> {
     console.log(`server:${PORT}`)
})