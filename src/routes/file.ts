import { Request, Response, Router } from 'express'
import bcrypt from 'bcryptjs'

import { body, Result, ValidationError, validationResult } from 'express-validator'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { File, IFile } from '../models/File'
import { validateAdminToken, validateToken } from '../middleware/validateToken'

const fileRouter: Router = Router()


fileRouter.post('/file', validateToken, async (req: Request, res: Response) => {
    try {
        //console.log(req.body.filename)
        //console.log(validateToken)

        const file = await File.create({
            filename: req.body.filename,
            content: req.body.content,
            createdAt: Date.now()
        })

        return res.status(200).json(file)

    
    } catch (error: any){
        console.error(`Error during user login: ${error}`)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
})


fileRouter.get('/files', async (req: Request, res: Response) => {
    try {
        const files: IFile[] = await File.find()
        return res.status(200).json(files)
    } catch (error: any) {
        console.error(`Error during registration: ${error}`)
        return res.status(500).json({error: "Internal Server Error"})
    }
})


export default fileRouter