import axios from "axios";

export const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export const appKey = import.meta.env.VITE_APP_KEY;
export const permissionId = "1";

// export function getHeaders(additionalHeaders) {
//     return {
//         AppKey: appKey,
//         permissionId: permissionId,
//         ...additionalHeaders,
//     };
// }

export const appService = axios.create({
    baseURL: BASE_URL + "appService/",
});

export const axiosImageService = axios.create({
    baseURL: BASE_URL + "imagesService/imagesNode/",
});

export const axiosVideoService = axios.create({
    baseURL: BASE_URL + "videosService/videosNode/",
});
