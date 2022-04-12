import * as financialEventsService from "../services/financialEventsService.js"

export async function createEvent (req, res) {
    const { user } = res.locals;

    financialEventsService.createEvent({...req.body, userId: user.id})
    
    res.sendStatus(201);
}

export async function listUserEvents (req, res) {
    const { user } = res.locals

    const events = await financialEventsService.listUserEvents(user)
    
    res.send(events);
}

export async function getFinancialSum (req, res) {
    const { user } = res.locals;

    const sum = await financialEventsService.getFinancialSum(user)
    
    res.send({ sum });
}