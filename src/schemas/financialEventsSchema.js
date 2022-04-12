import joi from "joi"

const financialEventsSchema = joi.object({
    value: joi.number().min(0).allow("INCOME","OUTCOME").required(),
    type: joi.string().required()
});

export default financialEventsSchema;