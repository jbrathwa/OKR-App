import express from 'express';
import {objectivesService} from "../services/objective.service.js";
import {objectivesController} from "../controllers/objectives.controller.js";
const router = express.Router();

const objectiveService = new objectivesService();
const objectiveController = new objectivesController(objectiveService);

router.get('/', (req, res) => {
    objectiveController.fetchAll(res);
})

export default router;