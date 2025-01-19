// fiungsi-fungsi CRUD untuk tabel claim
const claimModel = require('../models/claim-model');// mengimpor claim model
//fungsi untuk membuat klaim baru
const createClaim = async (req, res) => {
    const data = req.body;

    try {
        const result = await claimModel.createClaim(data);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        res.status(201).json({ message: 'Claim created successfully'
            , claimId: result.insertId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
//fungsi untuk mendapatkan semua data klaim
const getAllClaims = async (req, res) => {
    try {
        const claims = await claimModel.getAllClaims();
        res.status(200).json(claims);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
//fungsi untuk mendapatkan data klaim berdasarkan ID
const getClaimById = async (req, res) => {
    const { id } = req.params;

    try {
        const claim = await claimModel.getClaimById(id);
        if (!claim) {
            return res.status(404).json({ message: 'Claim not found' });
        }

        res.status(200).json(claim);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
//fungsi untuk memperbarui data klaim
const updateClaim = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const result = await claimModel.updateClaim(id, data);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        res.status(200).json({ message: 'Claim updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
//fungsi untuk menghapus klaim
const deleteClaim = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await claimModel.deleteClaim(id);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        res.status(200).json({ message: 'Claim deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
//fungsi untuk mendapatkan statistik klaim
const getClaimStatistics = async (req, res) => {
    try {
        const statistics = await claimModel.getClaimStatistics();
        res.status(200).json(statistics);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
//export semua fungsi CRUD
module.exports = {
    createClaim,
    getAllClaims,
    getClaimById,
    updateClaim,
    deleteClaim,
    getClaimStatistics
};