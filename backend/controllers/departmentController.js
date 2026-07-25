import Department from "../models/Department.js"

export const getAllDepartments = async (req,res) => {
        try{
            const departments = await Department.find();

            res.status(200).json(departments);
        } catch (err) {
            console.error("Error fetching departments", err);
            res.status(500).json({message: "Server error fetching departments"})
        }

}

