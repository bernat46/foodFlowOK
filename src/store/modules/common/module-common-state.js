import flagUk from "@/assets/images/flags/uk.png";
import flagCatalan from "@/assets/images/flags/catalan.png";
import flagSpain from "@/assets/images/flags/spain.png";

export default {
    languageList: [
        { name: "Español", value: "es", ascii_code: "es-ES", flag: flagSpain },
        { name: "English", value: "en", ascii_code: "en-GB", flag: flagUk },
        { name: "Catalán", value: "ca", ascii_code: "ca-ES", flag: flagCatalan },
    ],
    currentLocale: { name: "Español", value: "es", ascii_code: "es-ES", flag: flagSpain },
    userToken:localStorage.getItem("userToken") !== "undefined"
    ? JSON.parse(localStorage.getItem("userToken"))
    : null,
};
