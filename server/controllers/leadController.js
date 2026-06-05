import Lead from '../models/Lead.js';
export const createLead=async(req,res)=>res.json(await Lead.create(req.body));
export const getLeads=async(req,res)=>res.json(await Lead.find().sort({createdAt:-1}));
export const updateLead=async(req,res)=>res.json(await Lead.findByIdAndUpdate(req.params.id,req.body,{new:true}));
export const deleteLead=async(req,res)=>res.json(await Lead.findByIdAndDelete(req.params.id));
export const searchLeads=async(req,res)=>{const q=req.query.q||'';res.json(await Lead.find({$or:[{name:new RegExp(q,'i')},{email:new RegExp(q,'i')},{company:new RegExp(q,'i')}]}));};