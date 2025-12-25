import express from 'express'
import type { User } from "../../types/user.js";
import userModel from "../../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

const router = express.Router();

/**
 * @route POST /api/auth/signup
 * @desc User Signup route
 */

const signupSchema = z.object({
    name: z.string().trim().min(3),
    email: z.string().trim().toLowerCase().email(),
    phone: z.string().trim().min(7),
    password: z.string().min(8)
});


router.post('/signup', async (req, res) => {


    try {
        const parsed = signupSchema.safeParse(req.body);
        if (!parsed.success) return res.status(400).json({ message: 'Invalid input' });
        const { name, email, phone, password } = parsed.data;
        // validation of req.body
        if (name == "" || email == "" || phone == "" || password == "") {

            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // hash password

        const hashedPassword = await bcrypt.hash(password, 3)

        const newUser = await userModel.create({
            name,
            email,
            phone,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "user registration successfull",

        });


    } catch (error) {
        console.error("User Creation Failed - Please try again");
        return res.status(500).json({
            message: "Internal server error"
        });

    }
});


/**
 * @route /api/auth/signin
 * @desc login route for the users
 * @todo - add rate limiting
 */

const loginSchema = z.object({
    email: z.email("invalid email"),
    password: z.string().min(1, 'Password is required')
});


router.post('/login', async (req, res) => {
    try {

        // sanitize input
        const parsed = loginSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                message: 'Invalid input',
                errors: parsed.error.flatten().fieldErrors
            });
        }

        const { email, password } = parsed.data;

        // check if user exists

        const user = await userModel.findOne({
            email
        }).select('+password');

        if (!user) {
            return res.status(401).json({
                message: "email or password is incorrect"
            });
        }

        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "email or password is incorrect"
            });
        }

        // user logged in successfully;

        // create jwt token

        const secret = process.env.JWT_SECRET as string;

        if (!secret) {
            console.error('JWT_SECRET_ERROR');
            return res.status(500).json({
                message: "Internal server error"
            });
        }

        const token = await jwt.sign({
            userId: String(user._id),
            email: user.email,
            name: user.name
        }, secret, { expiresIn: '7d' })

        return res.status(200).json({
            message: "user loggedin successfully",
            jwt: token
        });

    } catch (error) {

        return res.status(500).json({
            message: "Internal server error"
        })

    }
})

export default router
