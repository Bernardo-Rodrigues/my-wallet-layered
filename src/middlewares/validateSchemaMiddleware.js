import { stripHtml } from "string-strip-html"
import trim from "trim"
import authSchema from "../schemas/authSchema"
import financialEventsSchema from "../schemas/financialEventsSchema"
import userSchema from "../schemas/userSchema"

function sanitizeString(string){
    return trim(stripHtml(string).result)
}

const schemas = {
    "/sign-up": userSchema,
    "/sign-in": authSchema,
    "/financial-events": financialEventsSchema
}

export default async function validateSchemaMiddleware(req, res, next){
    const { body } = req
    const schema = schemas["/"+req.path.split("/")[1]]
    
    Object.keys(body).forEach( key => {
        if(typeof(body[key]) === "string") body[key] = sanitizeString(body[key])
    })

    const validation = schema.validate(body, { abortEarly: false })
    if(validation.error) return res.status(422).send(validation.error.message)

    next()
}