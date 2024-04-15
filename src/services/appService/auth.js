import { appService } from "../axiosConfig.js";
export default {
    async registerUser(newUser) {
        const url = "users/register";
        try {
            const response = await appService.post(url, newUser);
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
    async login(email, password) {
        const url = "users/login";
        try {
            const response = await appService.post(url, {
                email: email,
                password: password,
            });
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
};
