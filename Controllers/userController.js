import { 
  validateUser, 
  getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
} from "../Models/userModel.js";

// Listar todos los usuarios
export const listUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.json(users);
  } catch (error) {
    console.error("Error al listar usuarios:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener usuario por ID
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    return res.json(user);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
// Actualizar usuario
export const editUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updated = await updateUser(id, req.body);
    if (!updated) return res.status(404).json({ message: "Usuario no encontrado" });

    return res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
// Eliminar usuario
export const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteUser(id);
    if (!deleted) return res.status(404).json({ message: "Usuario no encontrado" });

    return res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
