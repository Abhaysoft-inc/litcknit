import express, { type Request, type Response } from 'express'
import z from 'zod';
const router = express.Router()

/**
 * @route /api/events/host
 * @desc host an event like competetion, there are winners
 */

// zod schema here 

const eventSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    description: z.string().optional(),

    registrationType: z.enum(["individual", "team"]),

    teamMinSize: z.number().int().positive().optional(),
    teamMaxSize: z.number().int().positive().optional(),

    participantFields: z.array(z.any()).optional(),
    registrationFields: z.array(z.any()).optional(),

    winners: z.record(z.string(), z.any()).optional(),
    completed: z.boolean().default(false)



}).refine(
    (data) => {
        if (data.registrationType === "team") {
            return data.teamMinSize !== undefined && data.teamMaxSize !== undefined;
        }
        return true;
    },
    {
        message: "Team events must have teamMinSize and teamMaxSize defined"
    }
).refine(
    (data) => {
        if (data.teamMinSize && data.teamMaxSize) {
            return data.teamMinSize <= data.teamMaxSize;
        }
        return true;
    },
    {
        message: "teamMinSize must be less than or equal to teamMaxSize"
    }
);


router.post('/host', async (req: Request, res: Response) => {

    // ok host karte hai event

    const parsed = eventSchema.safeParse(req.body)
    





});

export default router;