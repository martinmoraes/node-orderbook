import { body } from 'express-validator';

export const userCreateValidate = [
  body('first_name')
    .escape()
    .not()
    .isEmpty()
    .withMessage('Primeiro nome é obrigatório'),
  body('last_name')
    .escape()
    .not()
    .isEmpty()
    .withMessage('Último nome é obrigatório'),
  body('password')
    .escape()
    .isString()
    .isLength({ min: 8, max: 25 })
    .withMessage('min character 8 nad max character 25')
    .not()
    .isLowercase()
    .withMessage('need uppercase ')
    .not()
    .isUppercase()
    .withMessage('need lowercase')
    .not()
    .isNumeric()
    .withMessage('need number')
    .not()
    .isAlpha()
    .withMessage('need alpha'),
  body('email').escape().isEmail().withMessage('É requerido e-mail válido'),
];
