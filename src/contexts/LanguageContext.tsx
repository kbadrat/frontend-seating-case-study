import { createContext, useContext, useState, ReactNode } from "react";
import en from "../public/locales/en.json";
import cz from "../public/locales/cz.json";

interface LanguageContextType {
    language: "en" | "cz";
    setLanguage: (language: "en" | "cz") => void;
    messages: Record<string, Record<string, string>>;
}

const messages: Record<"en" | "cz", Record<string, Record<string, string>>> = {
    en,
    cz,
};

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<"en" | "cz">("en");

    const value = {
        language,
        setLanguage,
        messages: messages[language],
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
