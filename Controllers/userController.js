// Controllers/userController.js

import {
  validateUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
} from "../Models/userModel.js";

// GET ALL
export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

// GET BY ID
export const getSingleUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

// CREATE
export const createNewUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const existing = await getUserByEmail(req.body.email);
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

// UPDATE
export const updateExistingUser = async (req, res) => {
  try {
    const existing = await getUserById(req.params.id);
    if (!existing) return res.status(404).json({ error: "User not found" });

    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const updated = await updateUser(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
};

// DELETE
export const deleteUserById = async (req, res) => {
  try {
    const existing = await getUserById(req.params.id);
    if (!existing) return res.status(404).json({ error: "User not found" });

    await deleteUser(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};
