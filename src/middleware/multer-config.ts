import multer, {StorageEngine, Multer} from "multer"
import path from "path"

const storage: StorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const originalname: string = path.parse(file.originalname).name
    const extension: string = path.parse(file.originalname).ext
    
    const endFilename = `${originalname}_${extension}`

    cb(null, endFilename)
  }
})

const upload: Multer = multer({ storage: storage })

export default upload