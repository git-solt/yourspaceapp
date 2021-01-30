const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

app.use(express.static(path.resolve(__dirname, '..', 'public')))

app.get('*', (req, res)=> {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))

})




app.listen(3000, ()=> {
  console.log("|===============|")
  console.log("| R U N N I N G |")
  console.log("|===============|")

})