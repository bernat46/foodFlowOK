import { createI18n } from "vue-i18n";
import en from "@/locale/en";
import es from "@/locale/es";
import ca from "@/locale/ca";

const messages = {
    es,
    en,
    ca,
};

const i18n = createI18n({
    locale: "es",
    fallbackLocale: "es",
    legacy:false,
    messages,
});

export default i18n;
