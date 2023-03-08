const basejoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extention = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = basejoi.extend(extention);

module.exports.studentSchema = Joi.object({
    fullname: Joi.string().required().escapeHTML(),
    phone: Joi.number().required(),
    birthdate: Joi.string().required().escapeHTML(),
    gender: Joi.string().required().escapeHTML(),
    isTermOver: Joi.boolean().required(),
    isStudyInInstitute: Joi.string().escapeHTML(),
    classday: Joi.string().escapeHTML(),
    classtime: Joi.string().escapeHTML(),
    grade: Joi.string().escapeHTML(),
    teacher: Joi.string().escapeHTML()
});