import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        lead: {type: String, required:true },
        headcount: {type:Number, required: true, default: 0},
        avgScore: {type: Number, required: true, default: 0},

        iconType: {type: String, default: 'layers'},
        bgColor: {type: String, default: 'bg-emerald-50'},
        border: {type: String, default: 'border-emerald-100'},

        topMembers: [{type:String}],
    },
    {timestamps: true}
);

export default mongoose.model('Department', departmentSchema);