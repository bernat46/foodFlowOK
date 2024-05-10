import { appService } from "../axiosConfig.js";
export default {
    async findAll(token) {
        const url = "allergens";
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
    async getAllergen(id, token) {
        const url = `allergens/${id}`;
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
    //ingredients like [{"id":"1","quantity":100}]
    async postAllergen(nom, icon_route, token) {
        const url = "allergens";
        const data = new URLSearchParams({
            name: nom,
            icon_route: icon_route,
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
    async putAllergen(allergenId, nom, icon_route, token) {
        const url = `allergens/${allergenId}`;
        const data = new URLSearchParams({
            name: nom,
            icon_route: icon_route,
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
    async deleteAllergen(id, token) {
        const url = `allergens/${id}`;
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
