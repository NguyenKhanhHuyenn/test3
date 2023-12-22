const jwt = require("jsonwebtoken");
const Account = require("../models/Account")
const Student = require("../models/Student")
const Position = require("../models/Position")

const userController = {
    // GET PROFILE (ADMIN OR STUDENT)
    getProfile: async (req, res) => {
        try {
            const userId = req.params.id;
            const requestingUserId = req.account.id;
            const requestingUserRole = req.account.role;

            // Ensure only admin or the owner can view the profile
            if (requestingUserRole === "admin" || userId === requestingUserId) {
                const student = await Student.findById(userId);
                if (!student) {
                    return res.status(404).json("Student don't have profile");
                }
                // Return the full profile for admins or the account owner
                res.status(200).json(student);
            } else {
                return res.status(403).json("You're not allowed to view this profile");
            }
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error", details: err.message });
        }
    },

    // UPDATE PROFILE (ADMIN OR STUDENT)
    updateProfile: async (req, res) => {
        try {
            const userId = req.params.id;
            const requestingUserId = req.account.id;
            const requestingUserRole = req.account.role;

            const account = await Account.findById(userId);
            if (!account) {
                return res.status(404).json("Account not found");
            }

            // Ensure only admin or the owner can update the profile
            if (requestingUserRole !== "admin" && userId !== requestingUserId) {
                return res.status(403).json("You're not allowed to update this profile");
            }

            const studentId = account._id;
            const student = await Student.findById(studentId);
            if (!student) {
                return res.status(404).json("Student profile not found");
            }

            // Update profile information as requested
            if (req.body.firstname) student.firstname = req.body.firstname;
            if (req.body.lastname) student.lastname = req.body.lastname;
            if (req.body.address) student.address = req.body.address;
            if (req.body.major) student.major = req.body.major;
            if (req.body.gpa) student.gpa = req.body.gpa;

            await student.save();
            res.status(200).json("Profile updated successfully");
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error", details: err.message });
        }
    },

    // DELETE PROFILE (ADMIN)
    deleteProfile: async (req, res) => {
        try {
            const userId = req.params.id;

            // Find the student profile by ID
            const student = await Student.findById(userId);

            if (!student) {
                return res.status(404).json("Student not found");
            }

            // Delete the student profile
            await Student.findByIdAndDelete(userId);

            res.status(200).json("Profile deleted successfully");
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error", details: err.message });
        }
    },

    getAllProfiles: async (req, res) => {
        try {
            const students = await Student.find({}, 'firstname lastname major');
    
            return res.status(200).json(students);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error", details: err.message });
        }
    },

    createProfile: async (req, res) => {
        try {
            const userId = req.params.id;
            const requestingUserId = req.account.id;

            const account = await Account.findById(userId);
            if (!account) {
                return res.status(404).json("Account not found");
            }

            // Check if the user already has a profile
            if (account.profile) {
                return res.status(400).json("Account already has a profile");
            }

            // Create a new profile
            const newProfile = {
                fullName: req.body.fullName,
                studentId: req.body.studentId,
                dateOfBirth: req.body.dateOfBirth,
                gender: req.body.gender,
                faculty: req.body.faculty,
                major: req.body.major,
                gpa: req.body.gpa,
                advisor: req.body.advisor
            };

            account.profile = newProfile;
            await account.save();

            res.status(201).json("Profile created successfully");
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error", details: err.message });
        }
    },

    getAllPositions: async (req, res) => {
        try {
            const positions = await Position.find();
    
            return res.status(200).json(positions);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error", details: err.message });
        }
    }
};

module.exports = userController;
