import { Router } from "express";
import { 
  listUsers, 
  getUser, 
  editUser, 
  removeUser 
} from "../Controllers/userController.js";

const router = Router();

router.get("/", listUsers);          
router.get("/:id", getUser);        
router.put("/:id", editUser);      
router.delete("/:id", removeUser);

export default router;
