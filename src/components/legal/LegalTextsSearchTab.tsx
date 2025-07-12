
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  History,
  Zap
} from "lucide-react";
import { SavedSearchesEnhanced } from "../SavedSearchesEnhanced";
import { LegalTextsSearchHistoryTab } from "./LegalTextsSearchHistoryTab";
import { LegalTextsPopularSearchesTab } from "./LegalTextsPopularSearchesTab";
import { NextGenSearchSection } from "../search/NextGenSearchSection";

export function LegalTextsSearchTab() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="search" className="text-sm">
            Recherche
          </TabsTrigger>
          <TabsTrigger value="nextgen" className="text-sm">
            <Zap className="w-4 h-4 mr-1" />
            Nouvelle Génération
          </TabsTrigger>
          <TabsTrigger value="history" className="text-sm">
            Historique des recherches
          </TabsTrigger>
          <TabsTrigger value="saved-searches" className="text-sm">
            Recherches sauvegardées
          </TabsTrigger>
          <TabsTrigger value="popular-searches" className="text-sm">
            Recherches juridiques populaires
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="search" className="mt-6">
          {/* Onglet de recherche simple maintenant vide ou avec nouvelle fonctionnalité */}
          <div className="text-center py-12">
            <p className="text-gray-600">Utilisez les autres onglets pour accéder aux fonctionnalités de recherche</p>
          </div>
        </TabsContent>

        <TabsContent value="nextgen" className="mt-6">
          <NextGenSearchSection />
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <LegalTextsSearchHistoryTab />
        </TabsContent>
        
        <TabsContent value="saved-searches" className="mt-6">
          <SavedSearchesEnhanced />
        </TabsContent>

        <TabsContent value="popular-searches" className="mt-6">
          <LegalTextsPopularSearchesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
