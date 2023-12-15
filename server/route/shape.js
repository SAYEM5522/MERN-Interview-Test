import express from "express"
import { createDrowing, deleteDrowing, getAllDrowing, getDrowing, updateDrowing } from "../controllers/shape.js"
const DrowingRouter=express.Router()

DrowingRouter.post("/drowing/createDrowing",createDrowing)
DrowingRouter.put("/drowing/updateDrowing/:id",updateDrowing)
DrowingRouter.delete("/drowing/deleteDrowing/:id",deleteDrowing)
DrowingRouter.get("/drowing/getAllDrowing",getAllDrowing)
DrowingRouter.get("/drowing/getDrowing/:id",getDrowing)


export {DrowingRouter}