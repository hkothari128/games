// const express = require('express');
// const path = require('path');
// const React = require('react-dom')
// const { renderToString } = require('react-dom/server');
// const { App } = require('./src/app');
// const cors = require('cors');

import express from 'express';
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../app';
import cors from 'cors';
import { Client } from 'pg';

const port = process.env.PORT || 8080;
const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({
    DATABASE_URL: "postgres://postgres:root@localhost:5432/score_board"
  });
}

// const { Client, Pool } = require('pg');

console.log(process.env.DATABASE_URL,"URL")

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   // ssl: {rejectUnauthorized: false},
// })

const client = new Client({
  user: "postgres",
  password: "root",
  host: "127.0.0.1",
  port: 5432,
  database: "score_board",
})

async function readScores() {
  try {
    const results = await client.query("select * from score_board order by id desc;");
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

app.use(cors())
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

app.get("*", (req, res, next) => {
  const markup = renderToString(
    React.render(App)
  );

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SSR with RR</title>
      </head>

      <body>
        <div id="app">
${markup}</div>
      </body>
    </html>
  `
)
})

app.listen(port, ()=>console.log('Server started on port ' + port));

start()

async function start() {
    await connect();
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