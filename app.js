const express = require('express');
const path = require('path');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(session({
    secret: 'B2A1C8',
    resave: false,
    saveUninitialized: true
}));
app.use('/font-awesome', express.static(path.join(__dirname, 'font-awesome')));
app.use('css', express.static(path.join(__dirname, 'view/css')));
app.use('/view', express.static(path.join(__dirname, 'view')));
app.use('/js', express.static(path.join(__dirname, 'view/js')));
app.use('/public', express.static(path.join(__dirname)));

const db = new sqlite3.Database('user.db', (err) => {
     if(err) {
          console.error('failed to connect to SQLite database ',err.message)
     } else {
          console.log('connection to SQLite database successful')
     }
});

app.get('/message', (req,res) => {
  query = 'SELECT name,message FROM messages ORDER BY id'
  try {
      db.all(query,[],(err,rows) => {
    if(err) {
      console.error('error:',err)
      res.status(500).send('internal server error');
    } else if(rows) {
 const Fdata = rows.map(({name, message, id}) => ({name, message, id}));
 return res.status(200).json(Fdata)
    } else {
       console.log('error: failed to find messages')
       res.status(300).send('unable to find');
    }
});

  } catch {
    return res.json({
        status: 500, 
        success: false,
        });
        console.error('unable to fetch');
  } });
app.get('/', (req, res)=> {
     res.sendFile('view/login.html', {root: __dirname})
     });
app.get('/login', (req, res)=> {
     res.sendFile('view/login.html', {root: __dirname})
     });
app.get('/signup', (req, res)=> {
     res.sendFile('view/signup.html', {root: __dirname})
     });
/*app.get('/app',(req,res) => {
     res.sendFile('view/app.html', {root: __dirname})
});*/
app.get('/username',(req,res) => {
    res.send(req.session.username || '');
});
app.get('*', (req, res)=> {
     res.send('path not found')
     });
 app.post('/user', (req,res) => {

     const { name, password } = req.body;
     const pathname = path.join(__dirname, 'view', 'app.html');
     const query = 'SELECT * FROM accounts WHERE username = ? AND password =?';
     db.get(query,[name, password], (err, row) => {
          if(err) {
               console.error('error:' , err);
               res.status(500).send('internal server error');
          } else if (row) {
             req.session.username = row.username;
             console.log("should work user found",row);
               res.sendFile('view/app.html', {root: __dirname})
               
               } else {
                    console.log('user not found');
                  res.status(404).send('user not found');
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
               res.status(404).json({message : ` the username ${row.username}  already exists`})
                } else {
          db.run("INSERT INTO accounts (username,password) VALUES (?,?)",[username, password], (err) => {
          if(err) {
               console.log(`failed to register ${username}`, err);
               
          } else {
               console.log(`${username} registered! login to access account`);
               res.status(200).json({message:`${username} registered! login to access account`})
          }
      
      });
               }
           }
      });
 });
 app.post('/MSG', (req, res) => {
      const { name , Mesg} = req.body;
     db.run('INSERT INTO messages (name , message) VALUES (?,?)',[name , Mesg], (err) => {
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