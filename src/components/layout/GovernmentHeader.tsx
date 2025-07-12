
import { LanguageSelector } from "@/components/LanguageSelector";
import { useTranslation } from "react-i18next";

interface GovernmentHeaderProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

export function GovernmentHeader({ language, onLanguageChange }: GovernmentHeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="text-white px-4 sm:px-6 py-2" style={{ backgroundColor: '#40915d' }}>
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Texte centré sur toute la largeur de la page */}
          <div className="absolute left-0 right-0 flex justify-center items-center pointer-events-none">
            <div className="text-center max-w-4xl">
              <div 
                className="text-sm sm:text-base font-medium font-changa leading-tight text-center" 
                dir="rtl"
                style={{ letterSpacing: '0.5px' }}
              >
                {t("header.republicAr")}
              </div>
              <div className="text-[9px] sm:text-[11px] font-normal opacity-90 mt-1 leading-tight tracking-[0.1em] text-center">
                {t("header.republicFr")}
              </div>
            </div>
          </div>
          
          <div className="hidden sm:block ml-auto pointer-events-auto">
            <LanguageSelector onLanguageChange={onLanguageChange} />
          </div>
        </div>
      </div>
    </header>
  );
}
