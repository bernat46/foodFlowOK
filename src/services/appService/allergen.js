import { appService } from "../axiosConfig.js";
export default {
    async findAll() {
        const url = "allergens";
        try {
            const response = await appService.get(url);
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
    async getAllergen(id) {
        const url = `allergens/${id}`;
        try {
            const response = await appService.get(url);
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
    //ingredients like [{"id":"1","quantity":100}]
    async postAllergen(allergen) {
        const url = "allergens";
        try {
            const response = await appService.post(url, allergen);
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
    async putAllergen(allergen) {
        const url = "recipes";
        try {
            const response = await appService.put(url, allergen);
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
    async deleteAllergen(id) {
        const url = `allergens/${id}`;
        try {
            const response = await appService.delete(url);
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
};
