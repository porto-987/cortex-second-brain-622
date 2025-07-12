
import { Button } from "@/components/ui/button";
import { Bell, User, Search, MessageSquare, Menu, Star, Bot } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LanguageSelector } from "@/components/LanguageSelector";
import { NotificationDropdown } from "@/components/NotificationDropdown";
import { AccountDropdown } from "@/components/AccountDropdown";
import { MessagesDropdown } from "@/components/MessagesDropdown";
import { MainNavigation } from "@/components/MainNavigation";
import { EnhancedInput } from "@/components/common/EnhancedInput";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

interface MainHeaderProps {
  language: string;
  activeSection: string;
  onLanguageChange: (language: string) => void;
  onSectionChange: (section: string) => void;
}

export function MainHeader({ language, activeSection, onLanguageChange, onSectionChange }: MainHeaderProps) {
  const { t } = useTranslation();
  const [quickSearchValue, setQuickSearchValue] = useState('');

  const handleFavoritesClick = useCallback(() => {
    onSectionChange("favorites");
  }, [onSectionChange]);

  const handleAISearchClick = useCallback(() => {
    onSectionChange("ai-search");
  }, [onSectionChange]);

  const handleQuickSearchKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && quickSearchValue.trim()) {
      onSectionChange("search");
    }
  }, [quickSearchValue, onSectionChange]);

  const headerTexts = useMemo(() => ({
    title: t("header.title"),
    subtitle: t("header.subtitle"),
    searchPlaceholder: t("header.searchPlaceholder")
  }), [t]);

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-2 sticky top-0 z-50" role="banner">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-3">
              <div className="w-16 h-12 bg-white rounded flex items-center justify-center flex-shrink-0 border border-green-600">
                <img 
                  src="/lovable-uploads/cb1cbfba-f598-40da-acf6-b43632c703c6.png" 
                  alt="Logo dalil.dz" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{headerTexts.title}</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">{headerTexts.subtitle}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <EnhancedInput
              value={quickSearchValue}
              onChange={(e) => setQuickSearchValue(e.target.value)}
              placeholder={headerTexts.searchPlaceholder}
              context="general"
              onKeyPress={handleQuickSearchKeyPress}
              className="bg-gray-50 border-gray-200 text-sm"
              enableVoice={true}
            />
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="sm:hidden">
              <LanguageSelector onLanguageChange={onLanguageChange} />
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleFavoritesClick}
              className="relative hidden sm:flex p-2"
              title={t("common.favorites")}
              aria-label={t("accessibility.viewFavorites")}
            >
              <Star className="w-4 h-4" aria-hidden="true" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleAISearchClick}
              className="relative hidden sm:flex p-2"
              title={t("ai.title")}
              aria-label={t("accessibility.aiSearch")}
            >
              <Bot className="w-4 h-4" aria-hidden="true" />
            </Button>
            
            <MessagesDropdown />
            <NotificationDropdown />
            <AccountDropdown />
            
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm" aria-label={t("accessibility.openMenu")}>
                  <Menu className="w-5 h-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0" aria-label={t("accessibility.mobileNavigation")}>
                <div className="p-4">
                  <div className="relative mb-4">
                    <EnhancedInput
                      value={quickSearchValue}
                      onChange={(e) => setQuickSearchValue(e.target.value)}
                      placeholder={headerTexts.searchPlaceholder}
                      context="general"
                      onKeyPress={handleQuickSearchKeyPress}
                      className="bg-gray-50 border-gray-200"
                      enableVoice={true}
                    />
                  </div>
                  <MainNavigation 
                    onSectionChange={onSectionChange} 
                    activeSection={activeSection}
                    isMobile={true}
                    language={language}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
