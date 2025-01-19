const db = require('../config/db');//mengambil koneksi database
//fungsi untuk membuat klaim
const createClaim = async (data) => {
    const { policy_id, claim_amount, claim_date, status } = data;//mengambil data policy_id, claim_amount, claim_date,
    //  status dari parameter data

    if (!policy_id || !claim_amount || !claim_date || !status) {
        return { error: "policy_id, claim_amount, claim_date, and status are required" };
    }

    try {
        // Periksa apakah policy_id ada di tabel policies
        const [policies] = await db.query("SELECT id FROM policies WHERE id = ?", [policy_id]);
        if (policies.length === 0) {
            return { error: "Policy ID not found" };
        }

        // Masukkan data ke tabel claims
        const [result] = await db.query(
            "INSERT INTO claims (policy_id, claim_amount, claim_date, status) VALUES (?, ?, ?, ?)",
            [policy_id, claim_amount, claim_date, status]//query untuk insert data ke tabel claims
        );
        return result;
    } catch (error) {
        console.log(error);
        return { error: "Database Error" };
    }
};
//fungsi untuk mendapatkan semua data klaim
const getAllClaims = async () => {
    try {
        const [claims] = await db.query('SELECT * FROM claims');
        return claims;
    } catch (error) {
        console.log(error);
        return [];
    }
};
//fungsi untuk mendapatkan data klaim berdasarkan ID
const getClaimById = async (id) => {
    try {
        const [claims] = await db.query('SELECT * FROM claims WHERE id = ?', [id]);
        return claims[0];//query untuk mengambil data klaim berdasarkan ID
    } catch (error) {
        console.log(error);
        return null;
    }
};
//fungsi untuk memperbarui data klaim
const updateClaim = async (id, data) => {
    const { policy_id, claim_amount, claim_date, status } = data;

    if (!policy_id || !claim_amount || !claim_date || !status) {
        return { error: "policy_id, claim_amount, claim_date, and status are required" };
    }

    try {
        const [result] = await db.query(
            "UPDATE claims SET policy_id = ?, claim_amount = ?, claim_date = ?, status = ? WHERE id = ?",
            [policy_id, claim_amount, claim_date, status, id]//query untuk update data klaim
        );
        return result;
    } catch (error) {
        console.log(error);
        return { error: "Database Error" };
    }
};
//fungsi untuk menghapus klaim
const deleteClaim = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM claims WHERE id = ?', [id]);
        return result;//query untuk menghapus data klaim
    } catch (error) {
        console.log(error);
        return { error: "Database Error" };
    }
};
//fungsi untuk mendapatkan statistik klaim
const getclaimStatistics = async () => {
    try {
        const [statistics] = await db.query(`
            SELECT 
                status, 
                COUNT(*) as count, 
                SUM(claim_amount) as total_amount 
            FROM claims 
            GROUP BY status//
        `);//query untuk mendapatkan statistik klaim
        return statistics;
    } catch (error) {
        console.log(error);
        return { error: "Database Error" };
    }
};

module.exports = {
    createClaim,
    getAllClaims,
    getClaimById,
    updateClaim,
    deleteClaim,
    getclaimStatistics
};