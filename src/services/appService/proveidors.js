import { appService } from "../axiosConfig.js";
export default {
    async findAll() {
        const url = "providers";
        try {
            const response = await appService.get(url);
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
    async getProvider(id) {
        const url = `providers/${id}`;
        try {
            const response = await appService.get(url);
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
    async postProvider(nom, id_company, phone, address) {
        const url = "providers";
        try {
            const response = await appService.post(url, {
                name: nom,
                company_identifier: id_company,
                phone: phone,
                address: address,
            });
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
    async putProvider(nom, id_company, phone, address) {
        const url = "provider";
        try {
            const response = await appService.put(url, {
                name: nom,
                company_identifier: id_company,
                phone: phone,
                address: address,
            });
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
    async deleteCentre(id) {
        const url = `providers/${id}`;
        try {
            const response = await appService.delete(url);
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
};
