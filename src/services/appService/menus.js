import { appService } from "../axiosConfig.js";
export default {
    async findAll(token) {
        const url = "menus";
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
    async getMenu(id, token) {
        const url = `menus/${id}`;
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
    async postMenu(date, first_course, second_course, dessert, token) {
        const url = "menus";
        const data = new URLSearchParams({
            date: date,
            first_course: first_course,
            second_course: second_course,
            dessert: dessert,
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
    async putMenu(date, first_course, second_course, dessert, token) {
        const url = "menus";
        const data = new URLSearchParams({
            date: date,
            first_course: first_course,
            second_course: second_course,
            dessert: dessert,
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
    async deleteMenu(id, token) {
        const url = `menus/${id}`;
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
