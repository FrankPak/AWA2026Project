import { Request, Response, Router } from "express"
import bcrypt from 'bcryptjs'
import { body, Result, ValidationError, validationResult } from 'express-validator'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { validateToken } from '../middleware/validateToken'

const router: Router = Router()


router.get('/api/private', validateToken , async (req: Request, res: Response) => {
  try {
    return res.status(200).json({message: "This is protected secure route!"})
    
  } catch (error: any) {
      console.error(`Error while saving offer: ${error}`)
      return res.status(500).json({ error: "Internal server error" })
  }
})



export default router