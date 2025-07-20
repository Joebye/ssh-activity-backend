import express from 'express';
import asyncHandler from 'express-async-handler';
import ActivityService from '../services/ActivityService.mjs';

export const loginEvents = express.Router();
export const loginEventsService = new ActivityService();

loginEvents.get('/all', asyncHandler(async (req:any, res:any) => {
    const allLoginEvents = await loginEventsService.getAllLoginEvents();
    res.send(allLoginEvents);
}));

