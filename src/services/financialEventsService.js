import * as financialEventsRepository from "../repositories/financialEventsRepository.js"

export async function createEvent({ value, type, userId }){
    const result = await financialEventsRepository.insert(userId, value, type)   
    if(!result) throw new Error(); 
}

export async function listUserEvents(user){
    const events = await financialEventsRepository.list(user.id)
    return events
}

export async function getFinancialSum(user){
    const events = await financialEventsRepository.list(user.id)
    const sum = events.rows.reduce(
        (total, event) =>
        event.type === "INCOME" ? total + event.value : total - event.value,
        0
    );
    return sum
}