import { Router } from "express";
import { AuditoriumController } from "../controllers/AuditoriumController";

const routes = Router();
const controller = new AuditoriumController();

routes.post("/auditoriums", controller.create);
routes.get("/auditoriums", controller.getAll);
routes.get("/auditoriums/:id", controller.getById);
routes.put("/auditoriums/:id", controller.update);
routes.delete("/auditoriums/:id", controller.delete);
routes.get("/auditoriums/concepts", controller.getConceptAuditoriums);

export default routes;
