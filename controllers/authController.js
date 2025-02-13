import jwt from 'jsonwebtoken'
import {Employee} from '../models/Employees.js'
import bcrypt from 'bcrypt'
import 'dotenv/config'

export const login = async(req,res) => {
    const {Email, Password} = req.body

    try {
        const user = await Employee.findOne({email: Email})
        if(!user) return res.status(404).json({error: 'User not found'})

        const isMatch = await bcrypt.compare(Password, user.password)
        if(!isMatch) return res.status(400).json({error: 'Invalid credentials'})

        const accessToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '15m'})
        const refreshToken = jwt.sign({id: user._id}, process.env.JWT_REFRESH, {expiresIn: '7d'})

        res.cookie('accessToken', accessToken, {
            httpOnly: true, secure: true, maxAge: 15 * 60 * 1000,  //15 minutes
        sameSite: 'Strict'
        })

        const authorizationHeader = `Bearer ${refreshToken}`
        res.setHeader('Authorization', authorizationHeader)
        res.status(200).json({accessToken :accessToken ,refreshToken: refreshToken})

    } catch (error) {
        res.json({error: error.message})
    }
}

export const authenticateToken = (req,res,next) => 
{
    const token = req.cookies.accessToken
    if(token)
    {
        try {
                const userToken = jwt.verify(token, process.env.JWT_SECRET)
                req.user = userToken
                return next()
             
            } catch (error) 
                {
                    res.clearCookie('accessToken')

                    const authHeader = req.headers['authorization']
                    const refreshToken = authHeader && authHeader.split(' ')[1]

                    if(refreshToken)
                    {
                        try 
                        {
                            const userRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH)
                            const newAccessToken = jwt.sign({id: userRefreshToken.id}, process.env.JWT_SECRET, {expiresIn: '15m'})
                    
                            res.cookie("accessToken",newAccessToken,{
                            httpOnly: true,
                            secure: true,
                            maxAge: 15 * 60 * 1000,
                            sameSite: 'Strict'
                            })
                    
                            req.user = userRefreshToken
                            next()
                        } catch (refreshtoken) { return res.status(403).json({ message: "Invalid refresh token" }).clearCookie('accessToken') }
                    }
                    else{ return res.status(401).json({ message: "Unauthorized: Token expired" });}        
                }
    } 
    else{ return res.status(401).json({ message: "Unauthorized: Token expired" }); }
}

export const logout = (req,res) => {
    res.clearCookie('accessToken', { httpOnly: true, secure: true, sameSite: 'Strict' })

    const authHeader = req.headers['authorization']
    const refreshToken = authHeader && authHeader.split(' ')[1]

    if(!refreshToken) return res.status(200).json({message: 'User logged out successfully'})

    res.status(200).json({message: 'User logged out, refresh token is still active'})
}

export const authorizeRols = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role))
        {
            return res.status(403).json({error: 'You are not authorized to access this route'})
        }
        next()
    }
}