import mongoose from "mongoose";
import dotenv from 'dotenv';
import dns from 'dns';
import Department from "./models/Department.js";
import { assert } from "console";

dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config()

const seedDepartments = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connected to DB. Clearing old department data')
        await Department.deleteMany({});

        const departmentsData = [
            {
                name: 'Engineering',
                lead: 'Sunny Suwalka',
                headcount: 22,
                avgScore: 4.6,
                iconType: 'code',
                bgColor: 'bg-emerald-50',
                borderColor: 'border-emerald-200',
                topMembers: ['SS', 'RK', 'AM']
            },
            {
                name: 'Design',
                lead: 'Priya Verma',
                headcount: '12',
                avgScore: 4.8,
                iconType: 'pen-tool',
                bgColor: 'bg-emerald-50',
                borderColor: 'border-gray-200',
                topMembers: ['PV', 'NK']
            },
            {
                name: 'Product',
                lead: 'Rahul Kumar',
                headcount: 8,
                avgScore: 4.5,
                iconType: 'layers',
                bgColor: 'bg-emerald-50',
                borderColor: 'border-emerald-200',
                topMembers: ['RK', 'SM']
            },
            {
                name: 'Marketing',
                lead: 'Neha Gupta',
                headcount: 5,
                avgScore: 4.2,
                iconType: 'trending-up',
                bgColor: 'bg-gray-50',
                borderColor: 'border-gray-200',
                topMembers: ['NG', 'VJ']
            },
            {
                name: 'QA',
                lead: 'Amit Singh',
                headcount: 3,
                avgScore: 4.4,
                iconType: 'shield',
                bgColor: 'bg-emerald-50',
                borderColor: 'border-emerald-200',
                topMembers: ['AS', 'PD']
            }

        ];

        await Department.insertMany(departmentsData);
        console.log(`Successfully seeded ${departmentsData.length} departments into the database!`);

        process.exit();
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedDepartments();