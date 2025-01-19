const policyModel = require('../models/policy-model');
//fungsi untuk membuat polis baru/registrasi polis
const createPolicy = async (req, res) => {
    const data = req.body;

    try {
        const result 
        = await policyModel.createPolicy(data);// Memanggil fungsi createPolicy dari policyModel
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        res.status(201)
        .json({ message: 'Policy created successfully', policyId: result.insertId });// Mengembalikan pesan-
        // sukses dan ID polis yang baru dibuat
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });// Respon jika terjadi kesalahan server
    }
};
//fungsi untuk mendapatkan semua data polis
const getAllPolicies = async (req, res) => {
    try {
        const policies = await policyModel.getAllPolicies();// Memanggil fungsi getAllPolicies dari policyModel
        res.status(200).json(policies);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' })// Respon jika terjadi kesalahan server
    }
};
//fungsi untuk mendapatkan data polis berdasarkan ID
const getPolicyById = async (req, res) => {//Mengambil parameter ID dari URL
    const { id } = req.params;//Mengambil parameter ID dari URL

    try {
        const policy = await policyModel.getPolicyById(id);//Memanggil fungsi getPolicyById dari policyModel
        if (!policy) {
            return res.status(404).json({ message: 'Policy not found' });
        }

        res.status(200).json(policy);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
//fungsi untuk memperbarui data polis
const updatePolicy = async (req, res) => {
    const { id } = req.params;// Mengambil parameter ID dari URL
    const data = req.body;// Mengambil data polis yang dikirimkan melalui body request

    try {
        const result = await policyModel.updatePolicy(id, data);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        res.status(200).json({ message: 'Policy updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
//fungsi untuk menghapus data polis
const deletePolicy = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await policyModel.deletePolicy(id);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }

        res.status(200).json({ message: 'Policy deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createPolicy,
    getAllPolicies,
    getPolicyById,
    updatePolicy,
    deletePolicy
};