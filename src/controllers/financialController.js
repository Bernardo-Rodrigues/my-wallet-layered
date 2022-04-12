import jwt from "jsonwebtoken";
import connection from "../database.js";
import * as financialEventsService from "../services/financialEventsService.js"

export async function createEvent (req, res) {
    const { user } = res.locals;

    try {
        financialEventsService.createEvent({...req.body, userId: user.id})
    
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function listUserEvents (req, res) {
    const { user } = res.locals

    try {
        const events = financialEventsService.listUserEvents(user)
    
        res.send(events);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function getFinancialSum (req, res) {
    const { user } = res.locals;

    try {
        const sum = financialEventsService.getFinancialSum(user)
    
        res.send({ sum });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}