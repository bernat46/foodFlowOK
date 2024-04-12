import { appService } from "../axiosConfig.js";
export default {
    async findAll() {
        const url = "centres/index";
        try {
            const response = await appService.get(url);
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
    async getCentre(id) {
        const params = { id: id };
        const url = "centres/show";
        try {
            const response = await appService.get(url, {
                params: params,
            });
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
    async postCentre(
        nom,
        alias,
        adreca,
        comencalls,
        nom_encarregat,
        telefon,
        correu_electronic,
        imatge
    ) {
        const url = "centres/create";
        try {
            const response = await appService.post(url, {
                nom: nom,
                alias: alias,
                adreca: adreca,
                comencalls: comencalls,
                nom_encarregat: nom_encarregat,
                telefon: telefon,
                correu_electronic: correu_electronic,
                imatge: imatge,
            });
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
    async putCentre(
        id,
        nom,
        alias,
        adreca,
        comencalls,
        nom_encarregat,
        telefon,
        correu_electronic,
        imatge
    ) {
        const url = "centres/create";
        try {
            const response = await appService.put(url, {
                nom: nom,
                alias: alias,
                adreca: adreca,
                comencalls: comencalls,
                nom_encarregat: nom_encarregat,
                telefon: telefon,
                correu_electronic: correu_electronic,
                imatge: imatge,
                params: { id: id },
            });
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
    async deleteCentre(id) {
        const url = "centres/create";
        try {
            const response = await appService.put(url, {
                params: { id: id },
            });
            return response.data;
        } catch (error) {
            throw new Error("Respuesta no exitosa", error);
        }
    },
};
