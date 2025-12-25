import express from 'express'
import authMiddleware from '../../middlewares/authMiddleware.js';

const router = express.Router();


/**
 * @route /api/admin/create-event
 * @desc host new event
 * @roles Admin only
*/

// get the event details form user -> save the poster to cloudinary -> await for url and then insert in the databased, if the url is wrong then roll back the transaction ok

// middleware to check usertype

router.get('/is', authMiddleware, (req, res) => {
    return res.status(200).json("helloww");
});



export default router