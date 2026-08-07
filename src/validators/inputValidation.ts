import { body } from "express-validator"

const usernameValidator = (username :string) => (
    body(username).trim().escape().isLength({min: 3, max:25})
)

const emailValidator = (email: string) => (
    body(email).trim().escape().isEmail()
)

const passValidator = (password : string) => (
    body(password).trim().escape().isStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1
    })
)

export {usernameValidator, emailValidator, passValidator}