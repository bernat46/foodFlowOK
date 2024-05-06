import { appService } from "../axiosConfig.js";
export default {
    async findAll(token) {
        const url = "recipes";
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
    async getRecipe(id) {
        const url = `recipes/${id}`;
        try {
            const response = await appService.get(url);
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
    //ingredients like [{"id":"1","quantity":100}]
    async postRecipe(recipe, parent_recipe_id, token) {
        const url = "recipes";
        const data = new URLSearchParams({
            title: recipe.title,
            description: recipe.description,
            ingredients: JSON.stringify([{ id: "1", quantity: 100 }]),
            parent_recipe_id: 1, //Si no pot ser null que ha de ser
            allergens: JSON.stringify([1, 2, 3]),
            type_name: "Carbohidrats",
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
    async putRecipe(recipe, parent_recipe_id, token) {
        const url = "recipes";
        const data = new URLSearchParams({
            title: recipe.title,
            description: recipe.description,
            ingredients: JSON.stringify([{ id: "1", quantity: 100 }]),
            parent_recipe_id: 1, //Si no pot ser null que ha de ser
            allergens: JSON.stringify([1, 2, 3]),
            type_name: "Carbohidrats",
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
    async deleteRecipe(id, token) {
        const url = `recipes/${id}`;
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
