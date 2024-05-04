import { appService } from "../axiosConfig.js";
export default {
    async findAll() {
        const url = "menus";
        try {
            const response = await appService.get(url);
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
    async getMenu(id) {
        const url = `menus/${id}`;
        try {
            const response = await appService.get(url);
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
    //ingredients like [{"id":"1","quantity":100}]
    async postMenu(date, first_course, second_course, dessert) {
        const url = "menus";
        try {
            const response = await appService.post(url, {
                date: date,
                first_course: first_course,
                second_course: second_course,
                dessert: dessert,
            });
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
    async putMenu(date, first_course, second_course, dessert) {
        const url = "menus";
        try {
            const response = await appService.put(url, {
                date: date,
                first_course: first_course,
                second_course: second_course,
                dessert: dessert,
            });
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
    async deleteMenu(id) {
        const url = `menus/${id}`;
        try {
            const response = await appService.delete(url);
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
};
