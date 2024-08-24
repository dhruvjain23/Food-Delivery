import expresss from 'express'
import {addFoodItems, listFood, removeFood} from '../controllers/foodControllers.js'
import multer from 'multer'

const foodRouter = expresss.Router();


//Image storage function
const storage=multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload =multer({storage:storage})


foodRouter.post('/add',upload.single('image'),addFoodItems)
foodRouter.get('/list',listFood)
foodRouter.post('/remove',removeFood)



export default foodRouter;