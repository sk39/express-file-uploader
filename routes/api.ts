import * as express from 'express'
import multer from "multer"
import fs from "fs"
import path from "path"

const router = express.Router()
const upload = multer({dest: './uploads/'});

function getExtension(imageUrl: string) {
    return imageUrl.split('.').pop()
}

router.post('/upload', upload.fields([{name: 'file'}]), (req: any, res, next) => {
    const file = req.files.file[0];
    const {path, filename, originalname} = file;
    const destFileName = `${filename}.${getExtension(originalname)}`
    const destFilePath = `./uploads/${destFileName}`
    fs.rename(path, destFilePath, err => {
        if (err) {
            throw err;
        }
        fs.unlink(path, () => {
            res.send({
                fileSize: file.size,
                fileName: destFileName
            });
        });
    });
});

router.get('/download/:filename', function (req, res, next) {
    const filePath = `./uploads/${req.params.filename}`
    const absPath = path.join(global["appRoot"], filePath);
    res.download(absPath);
});

export default router

