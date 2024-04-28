const express = require('express');

// handles multipart/form-data, which is primarily used for uploading files
const multer = require('multer');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
    const tempPath = req.file.path;
    const targetPath = 'uploads/' + req.file.originalname;

    fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
            .status(200)
            .contentType('text/plain')
            .end('File uploaded successfully');
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
