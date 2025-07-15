import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Header } from "@/components/layout/Header";
import { 
  Users,
  Trophy,
  Star,
  MapPin,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Settings,
  MessageSquare,
  BarChart3,
  Calendar
} from "lucide-react";

const mockHuntData = {
  id: 1,
  title: "L'Énigme des Alchimistes",
  status: "Active",
  participants: 8,
  maxParticipants: 20,
  startDate: "2024-01-15",
  endDate: "2024-02-15",
  completionRate: 62,
  averageTime: "4.2h",
  rating: 4.9,
  reviews: 5,
  revenue: 1200,
  image: "⚗️"
};

const mockParticipants = [
  {
    id: 1,
    username: "MysticSolver",
    avatar: "",
    progress: 80,
    currentStep: "Cabinet de Curiosités",
    joinDate: "2024-01-16",
    timeSpent: "3.2h",
    status: "active"
  },
  {
    id: 2,
    username: "AlchemyFan",
    avatar: "",
    progress: 100,
    completedDate: "2024-01-18",
    timeSpent: "4.5h",
    finalRank: 1,
    status: "completed"
  },
  {
    id: 3,
    username: "PuzzleMaster",
    avatar: "",
    progress: 60,
    currentStep: "Salle des Formules",
    joinDate: "2024-01-17",
    timeSpent: "2.8h",
    status: "active"
  },
  {
    id: 4,
    username: "TreasureSeeker",
    avatar: "",
    progress: 40,
    currentStep: "L'Entrée Secrète",
    joinDate: "2024-01-19",
    timeSpent: "1.5h",
    status: "paused"
  }
];

const mockAnalytics = {
  dailyParticipants: [2, 1, 3, 0, 1, 2, 1],
  completionByStep: [
    { step: "Étape 1", completed: 8, total: 8 },
    { step: "Étape 2", completed: 6, total: 8 },
    { step: "Étape 3", completed: 4, total: 8 },
    { step: "Étape 4", completed: 2, total: 8 },
    { step: "Étape 5", completed: 1, total: 8 }
  ]
};

const mockFeedback = [
  {
    id: 1,
    username: "AlchemyFan",
    rating: 5,
    comment: "Excellente chasse ! Les énigmes sont bien pensées et l'histoire captivante.",
    date: "2024-01-18"
  },
  {
    id: 2,
    username: "PuzzleMaster",
    rating: 5,
    comment: "Très immersif, j'ai adoré l'ambiance mystique.",
    date: "2024-01-17"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-accent text-accent-foreground";
    case "completed":
      return "bg-primary text-primary-foreground";
    case "paused":
      return "bg-secondary text-secondary-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const HuntDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="text-4xl">{mockHuntData.image}</div>
          <div>
            <h1 className="text-3xl font-bold">{mockHuntData.title}</h1>
            <div className="flex items-center gap-4 mt-2">
              <Badge className={getStatusColor(mockHuntData.status)}>
                {mockHuntData.status}
              </Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Du {mockHuntData.startDate} au {mockHuntData.endDate}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{mockHuntData.participants}</div>
                  <div className="text-sm text-muted-foreground">Participants</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{mockHuntData.completionRate}%</div>
                  <div className="text-sm text-muted-foreground">Taux de completion</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Clock className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{mockHuntData.averageTime}</div>
                  <div className="text-sm text-muted-foreground">Temps moyen</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Star className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{mockHuntData.rating}</div>
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
                  <div className="text-2xl font-bold">{mockHuntData.revenue}</div>
                  <div className="text-sm text-muted-foreground">Revenus</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="analytics">Analyses</TabsTrigger>
            <TabsTrigger value="feedback">Retours</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Participation Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Progression des participants</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.completionByStep.map((step, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-2">
                          <span>{step.step}</span>
                          <span>{step.completed}/{step.total}</span>
                        </div>
                        <Progress value={(step.completed / step.total) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Activité récente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-accent" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">AlchemyFan a terminé la chasse</p>
                        <p className="text-xs text-muted-foreground">Il y a 2 heures</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">2 nouveaux participants</p>
                        <p className="text-xs text-muted-foreground">Il y a 6 heures</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-secondary" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">TreasureSeeker a mis en pause</p>
                        <p className="text-xs text-muted-foreground">Il y a 1 jour</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" asChild>
                    <Link to={`/hunt/${mockHuntData.id}/edit`}>
                      <Settings className="h-4 w-4 mr-2" />
                      Modifier la chasse
                    </Link>
                  </Button>
                  <Button variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Envoyer un message
                  </Button>
                  <Button variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Exporter les données
                  </Button>
                  <Button variant="destructive">
                    Clôturer la chasse
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Participants Tab */}
          <TabsContent value="participants" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Liste des participants</h3>
              <Button variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message groupé
              </Button>
            </div>

            <div className="grid gap-4">
              {mockParticipants.map((participant) => (
                <Card key={participant.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={participant.avatar} />
                        <AvatarFallback className="bg-gradient-treasure text-primary-foreground">
                          {participant.username.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{participant.username}</h4>
                          <Badge className={getStatusColor(participant.status)}>
                            {participant.status}
                          </Badge>
                          {participant.finalRank && (
                            <Badge variant="outline">#{participant.finalRank}</Badge>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Progression: </span>
                            <span className="font-medium">{participant.progress}%</span>
                            <Progress value={participant.progress} className="h-1 mt-1" />
                          </div>
                          
                          <div>
                            <span className="text-muted-foreground">Temps passé: </span>
                            <span className="font-medium">{participant.timeSpent}</span>
                          </div>
                          
                          <div>
                            {participant.currentStep ? (
                              <>
                                <span className="text-muted-foreground">Étape actuelle: </span>
                                <span className="font-medium">{participant.currentStep}</span>
                              </>
                            ) : (
                              <>
                                <span className="text-muted-foreground">Terminée le: </span>
                                <span className="font-medium">{participant.completedDate}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">Profil</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Participants par jour</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end gap-2">
                    {mockAnalytics.dailyParticipants.map((count, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-primary rounded-t-sm" 
                          style={{ height: `${(count / Math.max(...mockAnalytics.dailyParticipants)) * 200}px` }}
                        />
                        <span className="text-xs mt-2">J-{6-index}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Taux d'abandon par étape</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.completionByStep.map((step, index) => {
                      const dropoffRate = ((step.total - step.completed) / step.total) * 100;
                      return (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-2">
                            <span>{step.step}</span>
                            <span>{dropoffRate.toFixed(1)}% d'abandon</span>
                          </div>
                          <Progress value={100 - dropoffRate} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Retours des participants</h3>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary fill-primary" />
                <span className="font-medium">{mockHuntData.rating}/5</span>
                <span className="text-muted-foreground">({mockHuntData.reviews} avis)</span>
              </div>
            </div>

            <div className="grid gap-4">
              {mockFeedback.map((feedback) => (
                <Card key={feedback.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-treasure text-primary-foreground">
                          {feedback.username.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{feedback.username}</h4>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < feedback.rating ? 'text-primary fill-primary' : 'text-muted-foreground'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{feedback.date}</span>
                        </div>
                        
                        <p className="text-sm">{feedback.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HuntDashboard;