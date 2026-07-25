import User from "../models/User.js"

export const getUsersByDepartment = async (req, res) => {
    try{
        const {department} = req.params;
        const teamMembers = await User.find({department}).select('-password');

        res.status(200).json(teamMembers);
    }catch (error){
        console.error("Error Fetching Team", error);
        res.status(500).json({message: "Server error fetching team members"})
    }
};

export const getLeaderboard = async (req,res) => {
    try{
        const leaderboard = await User.find()
        .sort({'kpiMetrics.currentScore':-1})
        .select('name title department kpiMetrics avatarUrl');

        res.status(200).json(leaderboard)

    }catch (error){
        console.error("Error fetching leaderboard", error);
        res.status(500).json({message: "Server error fetching leaderboard"})
    }
}