import express from 'express';
import {createLead,getLeads,updateLead,deleteLead,searchLeads} from '../controllers/leadController.js';
const r=express.Router();
r.post('/',createLead);
r.get('/',getLeads);
r.get('/search',searchLeads);
r.put('/:id',updateLead);
r.delete('/:id',deleteLead);
export default r;