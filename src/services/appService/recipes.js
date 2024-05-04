import { appService } from "../axiosConfig.js";
export default {
    async findAll() {
        const url = "recipes";
        try {
            const response = await appService.get(url);
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
    async postRecipe(nom, description, ingredients, parent_recipe_id) {
        const url = "recipes";
        try {
            const response = await appService.post(url, {
                title: nom,
                description: description,
                ingredients: ingredients,
                parent_recipe_id: parent_recipe_id,
            });
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
    async putRecipe(nom, description, ingredients, parent_recipe_id) {
        const url = "recipes";
        try {
            const response = await appService.put(url, {
                title: nom,
                description: description,
                ingredients: ingredients,
                parent_recipe_id: parent_recipe_id,
            });
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
    async deleteRecipe(id) {
        const url = `recipes/${id}`;
        try {
            const response = await appService.delete(url);
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
};
