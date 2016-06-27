var express = require("express");
var multer = require('multer')
var fs = require('fs')
var app = express();

app.get('/*', function (req, res) {
	res.sendFile(process.cwd() + req.path)
})

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		var dir = './uploads/' + req.body.folder
		fs.mkdir(dir, err => console.error(err))
		cb(null, dir)
	},
	filename: function (req, file, cb) {
		cb(null, req.body.filename)
	}
})

var upload = multer({ storage: storage })

app.post('/', upload.single('fragment'), function (req, res, next) {
	console.log(req.body)
	console.log(req.file)
	res.send('done')
})

app.listen(3000,function(){
	console.log("Listening on port 3000");
})
