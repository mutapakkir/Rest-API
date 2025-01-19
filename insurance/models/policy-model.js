const db = require('../config/db');//mengambil koneksi database
//fungsi untuk register user
const createPolicy = async (data) => {
    const { policy_number, policy_type, premium, start_date, end_date, user_id } = data;

    if (!policy_number || !policy_type || !premium || !start_date || !end_date || !user_id) {
        return { error: "policy_number, policy_type, premium, start_date, end_date, and user_id are required" };
    }

    try {
        // Periksa apakah user_id ada di tabel users
        const [users] = await db.query("SELECT id FROM users WHERE id = ?", [user_id]);
        if (users.length === 0) {
            return { error: "User ID not found" };
        }

        // Masukkan data ke tabel policies
        const [result] =
        await db.query("INSERT INTO policies (policy_number, policy_type, premium, start_date, end_date, user_id) VALUES (?, ?, ?, ?, ?, ?)",
        [policy_number, policy_type, premium, start_date, end_date, user_id]
        );
        return result;
    } catch (error) {
        console.log(error);
        return { error: "Database Error" };
    }
};
//fungsi untuk mendapatkan semua data user
const getAllPolicies = async () => {
    try {
        const [policies] = await db.query('SELECT * FROM policies');//query untuk mengambil semua data polis
        return policies;
    } catch (error) {
        console.log(error);
        return [];
    }
};
//fungsi untuk mendapatkan data user berdasarkan ID
const getPolicyById = async (id) => {
    try {
        const [policies] = 
        await db.query('SELECT * FROM policies WHERE id = ?', [id])//query untuk mengambil data polis berdasarkan ID
        return policies[0];
    } catch (error) {
        console.log(error);
        return null;
    }
};
//fungsi untuk memperbarui data polis
const updatePolicy = async (id, data) => {
    const { policy_number, policy_type, premium, start_date, end_date, user_id } = data//mengambil data polis yang dikirimkan melalui body request

    if (!policy_number || !policy_type || !premium || !start_date || !end_date || !user_id) {
        return { error: "policy_number, policy_type, premium, start_date, end_date, and user_id are required" };
    }
//
    try {
        const [result] = await db.query(//query untuk update data polis
            "UPDATE policies SET policy_number = ?, policy_type = ?, premium = ?, start_date = ?, end_date = ?, user_id = ? WHERE id = ?",
            [policy_number, policy_type, premium, start_date, end_date, user_id, id]
        );
        return result;
    } catch (error) {
        console.log(error);
        return { error: "Database Error" };
    }
};
//fungsi untuk menghapus data polis
const deletePolicy = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM policies WHERE id = ?', [id]);//query untuk menghapus data polis
        return result;
    } catch (error) {
        console.log(error);
        return { error: "Database Error" };
    }
};

module.exports = {
    createPolicy,
    getAllPolicies,
    getPolicyById,
    updatePolicy,
    deletePolicy
};