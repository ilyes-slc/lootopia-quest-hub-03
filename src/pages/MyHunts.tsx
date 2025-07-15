import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Header } from "@/components/layout/Header";
import { 
  Play,
  Pause,
  Trophy,
  Users,
  Clock,
  Star,
  MapPin,
  Calendar,
  Settings,
  Eye,
  Plus
} from "lucide-react";

const mockPlayerHunts = [
  {
    id: 1,
    title: "Le Trésor du Château Mystérieux",
    status: "En cours",
    progress: 60,
    participants: 24,
    maxParticipants: 50,
    timeLeft: "2 jours",
    reward: "500 pièces d'or",
    image: "🏰",
    joinedDate: "2024-01-15",
    nextStep: "La Bibliothèque Secrète"
  },
  {
    id: 2,
    title: "La Quête des Gemmes Perdues",
    status: "Terminée",
    progress: 100,
    participants: 42,
    maxParticipants: 100,
    completedDate: "2024-01-10",
    reward: "300 pièces d'or + Badge",
    image: "💎",
    finalRank: 8,
    score: 2350
  },
  {
    id: 3,
    title: "Safari Photo Urbain",
    status: "En pause",
    progress: 25,
    participants: 35,
    maxParticipants: 60,
    timeLeft: "5 jours",
    reward: "250 pièces d'or",
    image: "📸",
    joinedDate: "2024-01-20",
    nextStep: "Art de rue moderne"
  }
];

const mockOrganizerHunts = [
  {
    id: 4,
    title: "L'Énigme des Alchimistes",
    status: "Active",
    participants: 8,
    maxParticipants: 20,
    views: 156,
    applicants: 12,
    createdDate: "2024-01-05",
    revenue: "1200 pièces",
    image: "⚗️",
    rating: 4.9
  },
  {
    id: 5,
    title: "Mystères de la Cathédrale",
    status: "Planifiée",
    participants: 0,
    maxParticipants: 30,
    views: 45,
    applicants: 3,
    startDate: "2024-02-15",
    estimatedRevenue: "800 pièces",
    image: "⛪",
    rating: 0
  },
  {
    id: 6,
    title: "Course aux Étoiles",
    status: "Terminée",
    participants: 25,
    maxParticipants: 25,
    completedDate: "2023-12-20",
    revenue: "2500 pièces",
    image: "⭐",
    rating: 4.7,
    feedback: 18
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "En cours":
    case "Active":
      return "bg-accent text-accent-foreground";
    case "Terminée":
      return "bg-primary text-primary-foreground";
    case "En pause":
      return "bg-secondary text-secondary-foreground";
    case "Planifiée":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const MyHunts = () => {
  const [activeTab, setActiveTab] = useState("player");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Mes
            <span className="bg-gradient-treasure bg-clip-text text-transparent"> Chasses</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Gérez vos participations et créations
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="player" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Mes Participations
            </TabsTrigger>
            <TabsTrigger value="organizer" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Mes Créations
            </TabsTrigger>
          </TabsList>

          {/* Player Tab */}
          <TabsContent value="player">
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Play className="h-8 w-8 text-primary" />
                      <div>
                        <div className="text-2xl font-bold">3</div>
                        <div className="text-sm text-muted-foreground">En cours</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-8 w-8 text-primary" />
                      <div>
                        <div className="text-2xl font-bold">15</div>
                        <div className="text-sm text-muted-foreground">Terminées</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Star className="h-8 w-8 text-primary" />
                      <div>
                        <div className="text-2xl font-bold">4.8</div>
                        <div className="text-sm text-muted-foreground">Note moyenne</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-8 w-8 text-primary" />
                      <div>
                        <div className="text-2xl font-bold">8500</div>
                        <div className="text-sm text-muted-foreground">Pièces gagnées</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Hunt Cards */}
              <div className="grid gap-6">
                {mockPlayerHunts.map((hunt) => (
                  <Card key={hunt.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{hunt.image}</div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold mb-1">{hunt.title}</h3>
                              <Badge className={getStatusColor(hunt.status)}>
                                {hunt.status}
                              </Badge>
                            </div>
                            
                            <div className="flex gap-2">
                              {hunt.status === "En cours" && (
                                <Button size="sm" variant="outline">
                                  <Pause className="h-4 w-4 mr-2" />
                                  Pause
                                </Button>
                              )}
                              <Button size="sm" variant="treasure" asChild>
                                <Link to={`/game/${hunt.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Voir
                                </Link>
                              </Button>
                            </div>
                          </div>

                          {/* Progress */}
                          {hunt.status !== "Terminée" && (
                            <div className="mb-4">
                              <div className="flex justify-between text-sm mb-2">
                                <span>Progression</span>
                                <span>{hunt.progress}%</span>
                              </div>
                              <Progress value={hunt.progress} className="h-2" />
                              {hunt.nextStep && (
                                <p className="text-sm text-muted-foreground mt-2">
                                  Prochaine étape: {hunt.nextStep}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Hunt Info */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-primary" />
                              <span>{hunt.participants}/{hunt.maxParticipants}</span>
                            </div>
                            
                            {hunt.timeLeft && (
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary" />
                                <span>{hunt.timeLeft}</span>
                              </div>
                            )}
                            
                            {hunt.completedDate && (
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-primary" />
                                <span>Terminée le {hunt.completedDate}</span>
                              </div>
                            )}
                            
                            {hunt.finalRank && (
                              <div className="flex items-center gap-2">
                                <Trophy className="h-4 w-4 text-primary" />
                                <span>Rang #{hunt.finalRank}</span>
                              </div>
                            )}
                          </div>

                          <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                            <p className="text-sm font-medium text-primary">{hunt.reward}</p>
                            {hunt.score && (
                              <p className="text-xs text-muted-foreground">Score: {hunt.score} points</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Organizer Tab */}
          <TabsContent value="organizer">
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Settings className="h-8 w-8 text-primary" />
                      <div>
                        <div className="text-2xl font-bold">3</div>
                        <div className="text-sm text-muted-foreground">Chasses créées</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Users className="h-8 w-8 text-primary" />
                      <div>
                        <div className="text-2xl font-bold">33</div>
                        <div className="text-sm text-muted-foreground">Participants totaux</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Star className="h-8 w-8 text-primary" />
                      <div>
                        <div className="text-2xl font-bold">4.8</div>
                        <div className="text-sm text-muted-foreground">Note moyenne</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-8 w-8 text-primary" />
                      <div>
                        <div className="text-2xl font-bold">3700</div>
                        <div className="text-sm text-muted-foreground">Revenus totaux</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Create Button */}
              <div className="flex justify-end mb-6">
                <Button variant="treasure" asChild>
                  <Link to="/create-hunt">
                    <Plus className="h-4 w-4 mr-2" />
                    Créer une nouvelle chasse
                  </Link>
                </Button>
              </div>

              {/* Hunt Cards */}
              <div className="grid gap-6">
                {mockOrganizerHunts.map((hunt) => (
                  <Card key={hunt.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{hunt.image}</div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold mb-1">{hunt.title}</h3>
                              <Badge className={getStatusColor(hunt.status)}>
                                {hunt.status}
                              </Badge>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" asChild>
                                <Link to={`/hunt/${hunt.id}`}>
                                  <Settings className="h-4 w-4 mr-2" />
                                  Gérer
                                </Link>
                              </Button>
                              <Button size="sm" variant="treasure" asChild>
                                <Link to={`/hunt-dashboard/${hunt.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Tableau de bord
                                </Link>
                              </Button>
                            </div>
                          </div>

                          {/* Hunt Stats */}
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-4">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-primary" />
                              <span>{hunt.participants}/{hunt.maxParticipants}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Eye className="h-4 w-4 text-primary" />
                              <span>{hunt.views} vues</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-primary" />
                              <span>{hunt.applicants} candidats</span>
                            </div>
                            
                            {hunt.rating > 0 && (
                              <div className="flex items-center gap-2">
                                <Star className="h-4 w-4 text-primary fill-primary" />
                                <span>{hunt.rating}</span>
                              </div>
                            )}
                            
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span>
                                {hunt.createdDate && `Créée le ${hunt.createdDate}`}
                                {hunt.startDate && `Début le ${hunt.startDate}`}
                                {hunt.completedDate && `Terminée le ${hunt.completedDate}`}
                              </span>
                            </div>
                          </div>

                          <div className="p-3 bg-primary/10 rounded-lg">
                            <p className="text-sm font-medium text-primary">
                              {hunt.revenue && `Revenus: ${hunt.revenue}`}
                              {hunt.estimatedRevenue && `Revenus estimés: ${hunt.estimatedRevenue}`}
                            </p>
                            {hunt.feedback && (
                              <p className="text-xs text-muted-foreground">{hunt.feedback} commentaires reçus</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyHunts;