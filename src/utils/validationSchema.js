import Joi from 'joi';

export const postTaskSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Title is required.',
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Description is required.',
  }),
  budget: Joi.number().positive().required().messages({
    'number.base': 'Budget must be a number.',
    'number.positive': 'Budget must be greater than zero.',
  }),
  deadline: Joi.date().iso().required().messages({
    'date.base': 'Deadline must be a valid date.',
  }),
  category: Joi.string().required().messages({
    'string.empty': 'Category is required.',
  }),
});
