import express from 'express'

const router = express.Router();


/**
 * @route /api/admin/create-event
 * @desc host new event
 * @roles Admin only
*/

// get the event details form user -> save the poster to cloudinary -> await for url and then insert in the databased, if the url is wrong then roll back the transaction ok

// middleware to check usertype
