const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

app.use(express.static(path.resolve(__dirname, '..', 'public')))

app.get('*', (req, res)=> {
    res.redirect('/')
    // res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))

})

app.get('*/:id', (req, res)=> {
    console.log("Hit spesific")
    res.redirect("/")
})


app.listen(3000, ()=> {
  console.log("|===============|")
  console.log("| R U N N I N G |")
  console.log("|===============|")

})