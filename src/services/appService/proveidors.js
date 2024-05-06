import { appService } from "../axiosConfig.js";
export default {
    async findAll(token) {
        const url = "providers";
        try {
            const response = await appService.get(url, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${token}`,
                },
            });
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
    async postProvider(nom, id_company, phone, address, token) {
        const url = "providers";
        const data = new URLSearchParams({
            name: nom,
            company_identifier: id_company,
            address: address,
            phone: phone,
        });
        try {
            const response = await appService.post(url, data.toString(), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
    async putProvider(
        idProvider,
        nom,
        id_company,
        phone,
        address,
        token
    ) {
        const url = `provider/${idProvider}`;
        const data = new URLSearchParams({
            nom: nom,
            company_identifier: id_company,
            adreça: address,
            telefon: phone,
        });
        try {
            const response = await appService.put(url, data.toString(), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
    async deleteProvider(id, token) {
        const url = `providers/${id}`;
        try {
            const response = await appService.delete(url, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
};
