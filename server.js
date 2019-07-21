const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs')

const db = require('./lib/connectdb');

const app = express();

app.get('/', async (req, res) => {

    const doc = new PDFDocument;
    const name = req.query.firstname;

    db.query(`SELECT * FROM user WHERE firstName='${name}'`, (err, result) => {
        if (err) console.error(err);

        if (result.length > 0) {
            let data = []

            doc.text(`${result[0].firstName} ${result[0].lastName}`);
            doc.image(result[0].image);
            doc.on('data', (chank) => {
                data.push(chank);
            })
            doc.on('end', () => {
                const BufferPdf = Buffer.concat(data);
                db.query(`UPDATE user SET pdf=? WHERE firstName='${name}'`, BufferPdf, (err) => {
                    if (err) console.error(err.stack);
                    res.json({ pdfIsSaved: true })
                })
            })
            doc.end();
        } else {
            res.json({
                pdfIsSaved: false,
                message: 'User is not found'
            })
        }
    });
})





app.listen(3000, (err) => {
    if (err) console.log(err);
    console.log('Server listening on port 3000!');
})


