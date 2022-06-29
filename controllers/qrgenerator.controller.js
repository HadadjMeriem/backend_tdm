const qr = require('qrcode');


exports.genererCode = (req, res) => {
    data = {
        id: req.body.id,
        email: req.body.email
    }
    let stringdata = JSON.stringify(data)
    qr.toString(stringdata, { type: 'terminal' }, function(err, url) {
            if (err) return console.log("error occurred")
            console.log(url)
        })
        // Get the base64 url
    qr.toDataURL(stringdata, function(err, url) {
        if (err) return console.log("error occurred")
        console.log(url)
        res.status(200).send(url)
    })

}