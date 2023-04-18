const express = require('express');
const path = require('path');


const port = process.env.PORT || 80;
const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({
    DATABASE_URL: "postgres://jjsuqhtz:lHNPXsI-KG9LYBVR04sT0nSdwVtjaR2i@john.db.elephantsql.com/jjsuqhtz"
  });
}

app.use(express.json())

const { Client, Pool } = require('pg');

console.log(process.env.DATABASE_URL,"URL")

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   // ssl: {rejectUnauthorized: false},
// })

const client = new Client({
  user: "jjsuqhtz",
  password: "lHNPXsI-KG9LYBVR04sT0nSdwVtjaR2i",
  host: "john.db.elephantsql.com",
  port: 5432,
  database: "jjsuqhtz",
})

async function readScores() {
  try {
    const results = await client.query("select * from score_board;");
    console.log(results);
    return results.rows;
  }
  catch(e){
    return [];
  }
}

async function addScore(score){

  
  const { player1, player2, winner, time } = score;
  const query = `insert into score_board (player1, player2, winner, time) values ('${player1}','${player2}','${winner}','${time}');`;
  try {
      await client.query(query);
      return true
      }
      catch(e){
          console.log(e);
          return false;
      }
}

app.use(express.static(__dirname + '/dist'));

app.get("/scoreboard", async (req, res) => {
  const rows = await readScores();
  
  res.setHeader("content-type", "application/json");
  res.send(JSON.stringify(rows));
})


app.post("/scoreboard", async (req, res) => {
  
  let result = {}
  try{
      const reqJson = req.body;

      await addScore(reqJson)
      result.success= true;
  }
  catch(e){
    console.log(e,"error")
      result.success=false;
  }
  finally{
      res.setHeader("content-type", "application/json")
      res.send(JSON.stringify(result))
  }
 
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '/dist/index.html'))
});

app.listen(port, ()=>console.log('Server started on port ' + port));

start()

async function start() {
    await connect();
    const createQuery = `CREATE TABLE IF NOT EXISTS score_board
  (
      id SERIAL PRIMARY KEY,
      player1 character varying NOT NULL,
      player2 character varying NOT NULL,
      winner character varying NOT NULL,
      time character varying,
      steps bigint
  );`
  try {
    await client.query(createQuery);
    return true
    }
    catch(e){
        console.log(e);
        return false;
    }

    /*
    const todos = await readTodos();
    console.log(todos)
    const successCreate = await createTodo("Go to trader joes")
    console.log(`Creating was ${successCreate}`)
    const successDelete = await deleteTodo(1)
    console.log(`Deleting was ${successDelete}`)
    */
}

async function connect() {
    try {
        await client.connect();
    }
    catch(e) {
        console.error(`Failed to connect ${e}`)
    }
}