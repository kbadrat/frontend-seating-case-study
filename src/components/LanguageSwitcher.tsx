import { useLanguage } from "@/contexts/LanguageContext";
import { FC, useEffect } from "react";

const LanguageSwitcher: FC = () => {
    const { language, setLanguage } = useLanguage();

    useEffect(() => {
        const storedLanguage = localStorage.getItem("language");
        if (storedLanguage) {
            setLanguage(storedLanguage as "en" | "cz");
        }
    }, [setLanguage]);

    const handleToggle = () => {
        const newLanguage = language === "en" ? "cz" : "en";
        setLanguage(newLanguage);
        localStorage.setItem("language", newLanguage);
    };

    return (
        <div className="flex justify-center items-center mr-1 ">
            <div
                className="relative w-10 h-10 rounded-full p-2 cursor-pointer bg-zinc-100 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80"
                onClick={handleToggle}
            >
                <div
                    className={`absolute inset-0 flex items-center justify-center text-zinc-900 font-semibold text-sm font-medium transition-transform duration-500 ${
                        language === "en" ? "rotate-0" : "rotate-[360deg]"
                    }`}
                >
                    {language === "en" ? "EN" : "CZ"}
                </div>
            </div>
        </div>
    );
};

export default LanguageSwitcher;
