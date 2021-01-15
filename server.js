const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
var path = require('path');

const app = express();

app.use(fileUpload());

// Upload Endpoint

app.post("/upload", (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.image; //append içindeki 'file'
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if (err) {
            console.error(err)
            return res.status(500).send(err);
        }
        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
    })
})

app.get("/allphotos", (req, res) => {

    let x = [];
    fs.readdir(`${__dirname}/client/public/uploads`, (err, files) => {
        files.forEach(file => {
            x.push(`/uploads/${file}`);
        });

        res.send(x);
    });






})


app.listen(5000, () => console.log("Server Started..."))