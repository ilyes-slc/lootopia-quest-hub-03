import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/layout/Header";
import { 
  Map,
  MessageSquare,
  Camera,
  CheckCircle,
  Clock,
  Target,
  Send,
  HelpCircle,
  Eye,
  Lightbulb,
  ArrowLeft,
  MapPin,
  Zap,
  PuzzleIcon as Puzzle
} from "lucide-react";

const mockHunt = {
  id: 1,
  title: "Le Trésor du Château Mystérieux",
  currentStep: 3,
  totalSteps: 5,
  timeElapsed: "1h 32m",
  teamMembers: ["Alice", "Bob", "Charlie"],
  organizerOnline: true
};

const mockSteps = [
  {
    id: 1,
    title: "L'Entrée Secrète",
    description: "Trouvez l'entrée cachée du château en déchiffrant l'inscription latine.",
    completed: true,
    clue: "Cherchez la pierre gravée près de la fontaine principale.",
    location: { lat: 48.8566, lng: 2.3522 },
    type: "riddle"
  },
  {
    id: 2,
    title: "La Salle des Armoiries",
    description: "Identifiez les blasons des familles alliées pour ouvrir le passage.",
    completed: true,
    clue: "Les trois familles nobles sont représentées par un lion, un aigle et une rose.",
    location: { lat: 48.8567, lng: 2.3523 },
    type: "visual"
  },
  {
    id: 3,
    title: "Le Cabinet de Curiosités",
    description: "Résolvez l'énigme des objets antiques pour obtenir la clé suivante.",
    completed: false,
    current: true,
    clue: "Observez attentivement les objets et trouvez celui qui ne date pas de la bonne époque.",
    riddle: "Je suis ancien mais pas d'époque, je brille mais ne suis pas or, qu'est-ce que je suis ?",
    location: { lat: 48.8568, lng: 2.3524 },
    type: "ar",
    arHint: "Utilisez votre caméra pour scanner les objets anciens"
  },
  {
    id: 4,
    title: "La Bibliothèque Secrète",
    description: "Trouvez le livre qui cache l'indice final du trésor.",
    completed: false,
    locked: true,
    location: { lat: 48.8569, lng: 2.3525 },
    type: "search"
  },
  {
    id: 5,
    title: "Le Trésor Final",
    description: "Utilisez tous vos indices pour localiser le trésor des Montclair.",
    completed: false,
    locked: true,
    location: { lat: 48.8570, lng: 2.3526 },
    type: "final"
  }
];

const mockChatMessages = [
  {
    id: 1,
    user: "Alice",
    message: "Je pense que l'objet anachronique est la montre !",
    timestamp: "14:23",
    isOrganizer: false
  },
  {
    id: 2,
    user: "Bob",
    message: "Bonne idée ! Mais regardez aussi le télescope...",
    timestamp: "14:25",
    isOrganizer: false
  },
  {
    id: 3,
    user: "Organisateur",
    message: "Vous êtes sur la bonne voie ! Pensez à la période historique du château.",
    timestamp: "14:27",
    isOrganizer: true
  }
];

const GameExperience = () => {
  const [activeTab, setActiveTab] = useState("steps");
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState(mockChatMessages);
  const [showARCamera, setShowARCamera] = useState(false);
  const [riddleAnswer, setRiddleAnswer] = useState("");

  const currentStepData = mockSteps.find(step => step.current);
  const completedSteps = mockSteps.filter(step => step.completed).length;
  const progress = (completedSteps / mockSteps.length) * 100;

  const sendChatMessage = () => {
    if (chatMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        user: "Vous",
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOrganizer: false
      }]);
      setChatMessage("");
    }
  };

  const handleRiddleSubmit = () => {
    if (riddleAnswer.toLowerCase().includes("telescope") || riddleAnswer.toLowerCase().includes("télescope")) {
      // Marquer l'étape comme terminée
      alert("Bravo ! Vous avez trouvé la bonne réponse !");
      setRiddleAnswer("");
    } else {
      alert("Ce n'est pas la bonne réponse. Réfléchissez encore...");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header de la chasse */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quitter
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{mockHunt.title}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {mockHunt.timeElapsed}
              </div>
              <div className="flex items-center gap-1">
                <Target className="h-4 w-4" />
                Étape {mockHunt.currentStep}/{mockHunt.totalSteps}
              </div>
              <div className="flex items-center gap-1">
                <div className={`h-2 w-2 rounded-full ${mockHunt.organizerOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                Organisateur {mockHunt.organizerOnline ? 'en ligne' : 'hors ligne'}
              </div>
            </div>
          </div>
        </div>

        {/* Barre de progression */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Progression de la chasse</span>
              <span>{completedSteps}/{mockSteps.length} étapes</span>
            </div>
            <Progress value={progress} className="h-3" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="steps">Étapes</TabsTrigger>
                <TabsTrigger value="map">Carte</TabsTrigger>
                <TabsTrigger value="camera">RA</TabsTrigger>
              </TabsList>

              {/* Onglet Étapes */}
              <TabsContent value="steps" className="space-y-4">
                {mockSteps.map((step) => (
                  <Card key={step.id} className={`${step.current ? 'border-primary bg-primary/5' : ''} ${step.locked ? 'opacity-50' : ''}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed ? 'bg-green-500 text-white' : 
                          step.current ? 'bg-primary text-primary-foreground' : 
                          'bg-muted text-muted-foreground'
                        }`}>
                          {step.completed ? <CheckCircle className="h-4 w-4" /> : step.id}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{step.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                        <Badge variant={step.type === 'ar' ? 'default' : 'outline'}>
                          {step.type === 'ar' ? 'RA' : step.type === 'riddle' ? 'Énigme' : 'Recherche'}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    {(step.current || step.completed) && (
                      <CardContent>
                        {step.clue && (
                          <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Lightbulb className="h-4 w-4 text-primary" />
                              <span className="font-medium">Indice</span>
                            </div>
                            <p className="text-sm">{step.clue}</p>
                          </div>
                        )}
                        
                        {step.riddle && step.current && (
                          <div className="mb-4 p-3 bg-secondary/20 border border-secondary rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Puzzle className="h-4 w-4 text-secondary-foreground" />
                              <span className="font-medium">Énigme</span>
                            </div>
                            <p className="text-sm mb-3">{step.riddle}</p>
                            <div className="flex gap-2">
                              <Input 
                                placeholder="Votre réponse..." 
                                value={riddleAnswer}
                                onChange={(e) => setRiddleAnswer(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleRiddleSubmit()}
                              />
                              <Button onClick={handleRiddleSubmit}>
                                <Send className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                        
                        {step.arHint && step.current && (
                          <div className="mb-4">
                            <Button 
                              onClick={() => setShowARCamera(true)}
                              className="w-full"
                              variant="outline"
                            >
                              <Camera className="h-4 w-4 mr-2" />
                              {step.arHint}
                            </Button>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          Position: {step.location.lat.toFixed(4)}, {step.location.lng.toFixed(4)}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </TabsContent>

              {/* Onglet Carte */}
              <TabsContent value="map">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Map className="h-5 w-5" />
                      Carte interactive
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/30 rounded-lg p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
                      <Map className="h-16 w-16 text-muted-foreground mb-4" />
                      <h3 className="font-medium mb-2">Carte interactive</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Visualisez votre position et les points d'intérêt de la chasse
                      </p>
                      <div className="space-y-2 text-xs">
                        {mockSteps.filter(step => !step.locked).map((step) => (
                          <div key={step.id} className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${step.completed ? 'bg-green-500' : step.current ? 'bg-primary' : 'bg-muted-foreground'}`} />
                            <span>{step.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Onglet RA */}
              <TabsContent value="camera">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="h-5 w-5" />
                      Réalité Augmentée
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/30 rounded-lg p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
                      <Camera className="h-16 w-16 text-muted-foreground mb-4" />
                      <h3 className="font-medium mb-2">Scanner RA</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Utilisez votre caméra pour découvrir des indices cachés dans l'environnement
                      </p>
                      {currentStepData?.type === 'ar' ? (
                        <Button onClick={() => setShowARCamera(true)}>
                          <Camera className="h-4 w-4 mr-2" />
                          Activer la caméra
                        </Button>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          La RA n'est pas disponible pour cette étape
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Équipe */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Votre équipe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockHunt.teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{member.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{member}</span>
                      <div className="h-2 w-2 rounded-full bg-green-500 ml-auto" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat */}
            <Card className="flex flex-col h-96">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MessageSquare className="h-5 w-5" />
                  Chat d'équipe
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 px-4">
                  <div className="space-y-3 py-2">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex gap-2 ${msg.user === 'Vous' ? 'justify-end' : ''}`}>
                        <div className={`max-w-[80%] rounded-lg p-2 text-sm ${
                          msg.user === 'Vous' 
                            ? 'bg-primary text-primary-foreground' 
                            : msg.isOrganizer 
                              ? 'bg-secondary text-secondary-foreground'
                              : 'bg-muted'
                        }`}>
                          {msg.user !== 'Vous' && (
                            <div className="font-medium text-xs mb-1 flex items-center gap-1">
                              {msg.user}
                              {msg.isOrganizer && <Zap className="h-3 w-3" />}
                            </div>
                          )}
                          <div>{msg.message}</div>
                          <div className="text-xs opacity-70 mt-1">{msg.timestamp}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <Separator />
                <div className="p-4">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Tapez votre message..." 
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    />
                    <Button size="sm" onClick={sendChatMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Demander de l'aide
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="h-4 w-4 mr-2" />
                  Voir les règles
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  Abandonner la chasse
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal Caméra RA */}
      {showARCamera && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Caméra RA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 rounded-lg p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
                <Camera className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  Interface caméra RA simulée
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Pointez votre caméra vers les objets pour révéler des indices cachés
                </p>
                <Button onClick={() => setShowARCamera(false)} variant="outline">
                  Fermer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default GameExperience;