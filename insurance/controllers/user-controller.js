const userModel = require('../models/user-model'); // Mengimpor model user untuk operasi database

// Fungsi untuk mendaftarkan pengguna baru
const register = async (req, res) => {
    const data = req.body;

    try {
        const addUser = await userModel.register(data); // Memanggil fungsi register dari userModel
        if(addUser){
            return res.status(200).json({id: addUser.id, hash: addUser.pass }); // Mengembalikan ID dan hash password pengguna
        }
        return res.status(400).send({msg: "Error Registration"}); // Respon jika pendaftaran gagal
    } catch (error) {
        console.log(error); // Log error ke konsol
    }
};

// Fungsi untuk login pengguna
const login = async (req, res) => {
    const data = req.body;

    try {
        const user = await userModel.login(data); // Memanggil fungsi login dari userModel
        if(user) {
            return res.status(200).json({id: user.id, token: user.token}); // Mengembalikan ID dan token pengguna
        }
        return res.status(400).json({msg: "Error Login"}); // Respon jika login gagal
    } catch (error) {
        console.log(error); // Log error ke konsol
    }
};

// Fungsi untuk mendapatkan semua data pengguna
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers(); // Memanggil fungsi untuk mendapatkan semua data pengguna
        return res.status(200).json(users); // Mengembalikan daftar pengguna
    } catch (error) {
        console.log(error); // Log error ke konsol
    }
};

// Fungsi untuk mendapatkan data pengguna berdasarkan ID
const getUserById = async (req, res) => {
    const id = req.params.id; // Mengambil parameter ID dari URL

    try {
        const user = await userModel.getUserById(id); // Memanggil fungsi untuk mendapatkan data pengguna berdasarkan ID
        if(user){
            return res.status(200).json(user); // Mengembalikan data pengguna
        }
        return res.status(400).json({msg: "User not found"}); // Respon jika pengguna tidak ditemukan
    } catch (error) {
        console.log(error); // Log error ke konsol
    }
};

// Fungsi untuk memperbarui data pengguna
const updateUser = async (req, res) => {
    const id = req.params.id; // Mengambil parameter ID dari URL
    const data = req.body; // Mengambil data baru dari body request

    try {
        const user = await userModel.updateUser(id, data); // Memanggil fungsi untuk memperbarui data pengguna
        if(user){
            return res.status(200).json({msg: "User updated"}); // Respon jika data berhasil diperbarui
        }
        return res.status(400).json({msg: "User not found"}); // Respon jika pengguna tidak ditemukan
    } catch (error) {
        console.log(error); // Log error ke konsol
    }
};

// Fungsi untuk menghapus pengguna
const deleteUser = async (req, res) => {
    const id = req.params.id; // Mengambil parameter ID dari URL

    try {
        const user = await userModel.deleteUser(id); // Memanggil fungsi untuk menghapus data pengguna
        if(user){
            return res.status(200).json({msg: "User deleted"}); // Respon jika data berhasil dihapus
        }
        return res.status(400).json({msg: "User not found"}); // Respon jika pengguna tidak ditemukan
    } catch (error) {
        console.log(error); // Log error ke konsol
    }
};

// Mengekspor semua fungsi controller untuk digunakan dalam route
module.exports = {register, login, getAllUsers, getUserById, updateUser, deleteUser};
