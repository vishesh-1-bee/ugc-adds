import { Express , Router } from "express";
import { protect } from "../middleware/auth.js";
import { getallprojects, getprojectbyId, getusercredit, publish } from "../controllers/userController.js";

const router = Router();

router.get('/credit' , protect , getusercredit)

router.get('/projects' , protect , getallprojects)

router.get('/projects/:projectId' , protect , getprojectbyId)

router.post('/publish/:projectId' , protect , publish)




export default router
