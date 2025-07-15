import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Header } from "@/components/layout/Header";
import { 
  ChevronLeft,
  ChevronRight,
  MapPin,
  Target,
  Trophy,
  Settings,
  Plus,
  Trash2,
  Eye,
  EyeOff
} from "lucide-react";

const CreateHunt = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [huntData, setHuntData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "",
    duration: "",
    maxParticipants: "",
    location: "",
    requirements: [],
    steps: [{ title: "", description: "", hint: "" }],
    rewards: [],
    isPublic: true,
    startDate: "",
    endDate: ""
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { id: 1, title: "Informations générales", icon: Target },
    { id: 2, title: "Localisation", icon: MapPin },
    { id: 3, title: "Étapes de la chasse", icon: Target },
    { id: 4, title: "Récompenses", icon: Trophy },
    { id: 5, title: "Configuration finale", icon: Settings }
  ];

  const addStep = () => {
    setHuntData(prev => ({
      ...prev,
      steps: [...prev.steps, { title: "", description: "", hint: "" }]
    }));
  };

  const removeStep = (index: number) => {
    setHuntData(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }));
  };

  const addReward = () => {
    setHuntData(prev => ({
      ...prev,
      rewards: [...prev.rewards, { type: "coins", value: "", condition: "completion" }]
    }));
  };

  const removeReward = (index: number) => {
    setHuntData(prev => ({
      ...prev,
      rewards: prev.rewards.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Titre de la chasse *</Label>
              <Input 
                id="title"
                placeholder="Ex: Le Trésor du Château Mystérieux"
                value={huntData.title}
                onChange={(e) => setHuntData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea 
                id="description"
                placeholder="Décrivez votre chasse au trésor en détail..."
                className="min-h-[120px]"
                value={huntData.description}
                onChange={(e) => setHuntData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Catégorie *</Label>
                <Select value={huntData.category} onValueChange={(value) => setHuntData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="historique">Historique</SelectItem>
                    <SelectItem value="urbain">Urbain</SelectItem>
                    <SelectItem value="mystique">Mystique</SelectItem>
                    <SelectItem value="artistique">Artistique</SelectItem>
                    <SelectItem value="nature">Nature</SelectItem>
                    <SelectItem value="educatif">Éducatif</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Difficulté *</Label>
                <Select value={huntData.difficulty} onValueChange={(value) => setHuntData(prev => ({ ...prev, difficulty: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Niveau de difficulté" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="facile">Facile</SelectItem>
                    <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Durée estimée *</Label>
                <Input 
                  id="duration"
                  placeholder="Ex: 2-3h"
                  value={huntData.duration}
                  onChange={(e) => setHuntData(prev => ({ ...prev, duration: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxParticipants">Participants max *</Label>
                <Input 
                  id="maxParticipants"
                  type="number"
                  placeholder="Ex: 50"
                  value={huntData.maxParticipants}
                  onChange={(e) => setHuntData(prev => ({ ...prev, maxParticipants: e.target.value }))}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="location">Lieu principal *</Label>
              <Input 
                id="location"
                placeholder="Ex: Château de Vincennes, Paris, France"
                value={huntData.location}
                onChange={(e) => setHuntData(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>

            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium mb-2">Carte interactive</h4>
              <div className="bg-muted/50 rounded-lg p-8 text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  La carte interactive sera disponible après avoir défini les étapes de la chasse
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Prérequis (optionnel)</Label>
              <Textarea 
                placeholder="Ex: Smartphone avec GPS, chaussures confortables, équipe de 2-4 personnes..."
                className="min-h-[100px]"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Étapes de la chasse</h3>
              <Button onClick={addStep} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une étape
              </Button>
            </div>

            <div className="space-y-4">
              {huntData.steps.map((step, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Étape {index + 1}</CardTitle>
                      {huntData.steps.length > 1 && (
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => removeStep(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Titre de l'étape *</Label>
                      <Input 
                        placeholder="Ex: L'Entrée Secrète"
                        value={step.title}
                        onChange={(e) => {
                          const newSteps = [...huntData.steps];
                          newSteps[index].title = e.target.value;
                          setHuntData(prev => ({ ...prev, steps: newSteps }));
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Description *</Label>
                      <Textarea 
                        placeholder="Décrivez ce que les participants doivent faire..."
                        value={step.description}
                        onChange={(e) => {
                          const newSteps = [...huntData.steps];
                          newSteps[index].description = e.target.value;
                          setHuntData(prev => ({ ...prev, steps: newSteps }));
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Indice (optionnel)</Label>
                      <Input 
                        placeholder="Un indice pour aider les participants..."
                        value={step.hint}
                        onChange={(e) => {
                          const newSteps = [...huntData.steps];
                          newSteps[index].hint = e.target.value;
                          setHuntData(prev => ({ ...prev, steps: newSteps }));
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Système de récompenses</h3>
              <Button onClick={addReward} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une récompense
              </Button>
            </div>

            <div className="space-y-4">
              {huntData.rewards.map((reward, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Récompense {index + 1}</CardTitle>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => removeReward(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Type de récompense</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="coins">Pièces d'or</SelectItem>
                            <SelectItem value="badge">Badge</SelectItem>
                            <SelectItem value="item">Objet spécial</SelectItem>
                            <SelectItem value="experience">Expérience</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Valeur</Label>
                        <Input placeholder="Ex: 500" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Condition d'obtention</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="completion">Terminer la chasse</SelectItem>
                          <SelectItem value="rank1">1ère place</SelectItem>
                          <SelectItem value="rank3">Top 3</SelectItem>
                          <SelectItem value="rank10">Top 10</SelectItem>
                          <SelectItem value="participation">Participation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {huntData.rewards.length === 0 && (
                <Card className="border-dashed">
                  <CardContent className="pt-6 text-center">
                    <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Ajoutez des récompenses pour motiver les participants
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Date de début</Label>
                <Input 
                  id="startDate"
                  type="date"
                  value={huntData.startDate}
                  onChange={(e) => setHuntData(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">Date de fin</Label>
                <Input 
                  id="endDate"
                  type="date"
                  value={huntData.endDate}
                  onChange={(e) => setHuntData(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Chasse publique</h4>
                  <p className="text-sm text-muted-foreground">
                    Visible dans la liste des chasses disponibles
                  </p>
                </div>
                <Button
                  variant={huntData.isPublic ? "default" : "outline"}
                  size="sm"
                  onClick={() => setHuntData(prev => ({ ...prev, isPublic: !prev.isPublic }))}
                >
                  {huntData.isPublic ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Aperçu de votre chasse</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Titre:</strong> {huntData.title || "Non défini"}</p>
                  <p><strong>Catégorie:</strong> {huntData.category || "Non définie"}</p>
                  <p><strong>Difficulté:</strong> {huntData.difficulty || "Non définie"}</p>
                  <p><strong>Durée:</strong> {huntData.duration || "Non définie"}</p>
                  <p><strong>Participants max:</strong> {huntData.maxParticipants || "Non défini"}</p>
                  <p><strong>Étapes:</strong> {huntData.steps.length}</p>
                  <p><strong>Récompenses:</strong> {huntData.rewards.length}</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Créer une
              <span className="bg-gradient-treasure bg-clip-text text-transparent"> Chasse</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Assistant étape par étape pour créer votre aventure
            </p>
          </div>

          {/* Progress */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progression</span>
                  <span>{currentStep}/{totalSteps}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="flex justify-between">
                {steps.map((step) => (
                  <div 
                    key={step.id}
                    className={`flex flex-col items-center text-center ${
                      step.id <= currentStep ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2 ${
                      step.id <= currentStep ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'
                    }`}>
                      <step.icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-medium hidden sm:block">{step.title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step Content */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {steps.find(s => s.id === currentStep)?.icon && (
                  React.createElement(steps.find(s => s.id === currentStep)!.icon, { className: "h-5 w-5" })
                )}
                {steps.find(s => s.id === currentStep)?.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Précédent
            </Button>

            {currentStep === totalSteps ? (
              <Button variant="treasure">
                <Trophy className="h-4 w-4 mr-2" />
                Publier la chasse
              </Button>
            ) : (
              <Button 
                variant="treasure"
                onClick={nextStep}
              >
                Suivant
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateHunt;