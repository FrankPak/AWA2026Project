import { Request, Response, Router } from 'express'
import bcrypt from 'bcryptjs'

import { body, Result, ValidationError, validationResult } from 'express-validator'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Topic, ITopic } from '../models/Topic'
import { usernameValidator, emailValidator, passValidator } from '../validators/inputValidation'
import { validateAdminToken, validateToken } from '../middleware/validateToken'


const topicRouter: Router = Router()


topicRouter.get('/topics', async (req: Request, res: Response) => {
    try {
        const topics: ITopic[] = await Topic.find()
        return res.status(200).json(topics)
    } catch (error: any) {
        console.error(`Error during registration: ${error}`)
        return res.status(500).json({error: "Internal Server Error"})
    }
})

topicRouter.post('/topic', validateToken,
    async (req: Request, res: Response) => {
    try {
        //console.log(req.body)
        //console.log(validateToken)
        const topic = await Topic.create({
            title: req.body.title,
            content: req.body.content,
            username: req.body.username,
            createdAt: Date.now()
        })

        return res.status(200).json(topic)

    
    } catch (error: any){
        console.error(`Error during user login: ${error}`)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})



topicRouter.delete('/topic/:id"',
    validateAdminToken,
    async (req: Request, res: Response) => {
    try {
    
        return res.status(200).json({message: "Topic deleted successfully."})
    } catch (error: any){
        console.error(`Error during user login: ${error}`)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})

export default topicRouter