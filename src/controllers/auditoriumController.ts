import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Auditorium } from "../entities/Auditorium";

export class AuditoriumController {
    async create(req: Request, res: Response) {
        const repository = getRepository(Auditorium);
        const { name, capacity, location, has_projector, has_sound_system } = req.body;

        const auditorium = repository.create({ name, capacity, location, has_projector, has_sound_system });
        await repository.save(auditorium);

        return res.status(201).json(auditorium);
    }

    async getAll(req: Request, res: Response) {
        const repository = getRepository(Auditorium);
        const { name, capacity } = req.query;

        let query = repository.createQueryBuilder("auditorium");

        if (name) {
            query = query.andWhere("auditorium.name ILIKE :name", { name: `%${name}%` });
        }

        if (capacity) {
            query = query.andWhere("auditorium.capacity >= :capacity", { capacity });
        }

        const auditoriums = await query.getMany();
        return res.json(auditoriums);
    }

    async getById(req: Request, res: Response) {
        const repository = getRepository(Auditorium);
        const { id } = req.params;

        const auditorium = await repository.findOne(id);
        if (!auditorium) {
            return res.status(404).json({ message: "Auditório não encontrado" });
        }

        return res.json(auditorium);
    }

    async update(req: Request, res: Response) {
        const repository = getRepository(Auditorium);
        const { id } = req.params;
        const data = req.body;

        let auditorium = await repository.findOne(id);
        if (!auditorium) {
            return res.status(404).json({ message: "Auditório não encontrado" });
        }

        await repository.update(id, data);
        auditorium = await repository.findOne(id);
        
        return res.json(auditorium);
    }

    async delete(req: Request, res: Response) {
        const repository = getRepository(Auditorium);
        const { id } = req.params;

        const auditorium = await repository.findOne(id);
        if (!auditorium) {
            return res.status(404).json({ message: "Auditório não encontrado" });
        }

        await repository.delete(id);
        return res.status(204).send();
    }

    async getConceptAuditoriums(req: Request, res: Response) {
        const repository = getRepository(Auditorium);

        const auditoriums = await repository.find({
            where: {
                capacity: 300,
                has_projector: true,
                has_sound_system: true,
            },
        });

        return res.json(auditoriums);
    }
}
