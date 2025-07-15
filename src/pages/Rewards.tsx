import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header } from "@/components/layout/Header";
import { 
  Trophy,
  Crown,
  Gift,
  Star,
  Calendar,
  Target,
  Settings,
  Plus,
  Filter,
  Download
} from "lucide-react";

const mockPlayerRewards = [
  {
    id: 1,
    name: "Pièces d'or",
    amount: 1500,
    type: "currency",
    icon: "🪙",
    category: "Monnaie",
    earned: "2024-01-18",
    source: "Le Trésor du Château"
  },
  {
    id: 2,
    name: "Badge Explorateur",
    type: "badge",
    icon: "🗺️",
    category: "Badge",
    earned: "2024-01-15",
    source: "Première chasse terminée",
    rarity: "Commun"
  },
  {
    id: 3,
    name: "Artefact Mystique",
    type: "item",
    icon: "🔮",
    category: "Objet",
    earned: "2024-01-10",
    source: "L'Énigme des Alchimistes",
    rarity: "Rare"
  },
  {
    id: 4,
    name: "Couronne de Maître",
    type: "item",
    icon: "👑",
    category: "Objet",
    earned: "2024-01-08",
    source: "Classement mensuel",
    rarity: "Légendaire"
  },
  {
    id: 5,
    name: "Points d'expérience",
    amount: 2500,
    type: "experience",
    icon: "⭐",
    category: "XP",
    earned: "2024-01-20",
    source: "Activités diverses"
  }
];

const mockOrganizerRewards = [
  {
    id: 1,
    huntTitle: "L'Énigme des Alchimistes",
    rewardType: "Pièces d'or",
    amount: 500,
    condition: "Terminer la chasse",
    distributed: 5,
    total: 8,
    status: "active"
  },
  {
    id: 2,
    huntTitle: "L'Énigme des Alchimistes",
    rewardType: "Badge Alchimiste",
    condition: "1ère place",
    distributed: 1,
    total: 1,
    status: "completed"
  },
  {
    id: 3,
    huntTitle: "Mystères de la Cathédrale",
    rewardType: "Artefact Sacré",
    condition: "Top 3",
    distributed: 0,
    total: 3,
    status: "pending"
  },
  {
    id: 4,
    huntTitle: "Course aux Étoiles",
    rewardType: "Pièces d'or",
    amount: 300,
    condition: "Participation",
    distributed: 25,
    total: 25,
    status: "completed"
  }
];

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "Commun":
      return "bg-muted text-muted-foreground";
    case "Rare":
      return "bg-accent text-accent-foreground";
    case "Légendaire":
      return "bg-gradient-treasure text-primary-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-accent text-accent-foreground";
    case "completed":
      return "bg-primary text-primary-foreground";
    case "pending":
      return "bg-secondary text-secondary-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const Rewards = () => {
  const [activeTab, setActiveTab] = useState("player");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const filteredPlayerRewards = mockPlayerRewards.filter(reward => 
    filterCategory === "all" || reward.category === filterCategory
  );

  const sortedPlayerRewards = [...filteredPlayerRewards].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.earned).getTime() - new Date(a.earned).getTime();
    }
    if (sortBy === "type") {
      return a.type.localeCompare(b.type);
    }
    return 0;
  });

  const totalCoins = mockPlayerRewards
    .filter(r => r.type === "currency")
    .reduce((sum, r) => sum + (r.amount || 0), 0);

  const totalXP = mockPlayerRewards
    .filter(r => r.type === "experience")
    .reduce((sum, r) => sum + (r.amount || 0), 0);

  const totalBadges = mockPlayerRewards.filter(r => r.type === "badge").length;
  const totalItems = mockPlayerRewards.filter(r => r.type === "item").length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Mes
            <span className="bg-gradient-treasure bg-clip-text text-transparent"> Récompenses</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Gérez vos gains et récompenses
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="player" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Mes Gains
            </TabsTrigger>
            <TabsTrigger value="organizer" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Gestion des Récompenses
            </TabsTrigger>
          </TabsList>

          {/* Player Tab */}
          <TabsContent value="player">
            <div className="space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <div className="text-2xl">🪙</div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{totalCoins.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Pièces d'or</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <div className="text-2xl">⭐</div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{totalXP.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Points XP</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <div className="text-2xl">🏆</div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{totalBadges}</div>
                        <div className="text-sm text-muted-foreground">Badges</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <div className="text-2xl">🎁</div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{totalItems}</div>
                        <div className="text-sm text-muted-foreground">Objets</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Filters */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-4 items-center">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <span className="text-sm font-medium">Filtres:</span>
                    </div>
                    
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes</SelectItem>
                        <SelectItem value="Monnaie">Monnaie</SelectItem>
                        <SelectItem value="Badge">Badges</SelectItem>
                        <SelectItem value="Objet">Objets</SelectItem>
                        <SelectItem value="XP">Expérience</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Trier par" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="type">Type</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="outline" className="ml-auto">
                      <Download className="h-4 w-4 mr-2" />
                      Exporter
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Rewards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedPlayerRewards.map((reward) => (
                  <Card key={reward.id} className="overflow-hidden hover:shadow-treasure transition-all duration-300">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="text-3xl">{reward.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-bold mb-1">{reward.name}</h3>
                          {reward.amount && (
                            <p className="text-lg font-medium text-primary">
                              {reward.amount.toLocaleString()}
                            </p>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {reward.category}
                          </Badge>
                          {reward.rarity && (
                            <Badge className={`${getRarityColor(reward.rarity)} text-xs ml-2`}>
                              {reward.rarity}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>Obtenu le {reward.earned}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Target className="h-3 w-3" />
                          <span className="truncate">{reward.source}</span>
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
                      <Gift className="h-8 w-8 text-primary" />
                      <div>
                        <div className="text-2xl font-bold">8</div>
                        <div className="text-sm text-muted-foreground">Récompenses créées</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-8 w-8 text-primary" />
                      <div>
                        <div className="text-2xl font-bold">31</div>
                        <div className="text-sm text-muted-foreground">Récompenses distribuées</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Star className="h-8 w-8 text-primary" />
                      <div>
                        <div className="text-2xl font-bold">3</div>
                        <div className="text-sm text-muted-foreground">En attente</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Crown className="h-8 w-8 text-primary" />
                      <div>
                        <div className="text-2xl font-bold">7500</div>
                        <div className="text-sm text-muted-foreground">Valeur totale</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Create Button */}
              <div className="flex justify-end mb-6">
                <Button variant="treasure">
                  <Plus className="h-4 w-4 mr-2" />
                  Créer une récompense
                </Button>
              </div>

              {/* Rewards Management */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Gestion des récompenses</h3>
                
                {mockOrganizerRewards.map((reward) => (
                  <Card key={reward.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-bold mb-2">{reward.huntTitle}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Type: </span>
                              <span className="font-medium">{reward.rewardType}</span>
                              {reward.amount && (
                                <span className="text-primary"> ({reward.amount})</span>
                              )}
                            </div>
                            <div>
                              <span className="text-muted-foreground">Condition: </span>
                              <span className="font-medium">{reward.condition}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Distribution: </span>
                              <span className="font-medium">{reward.distributed}/{reward.total}</span>
                            </div>
                            <div>
                              <Badge className={getStatusColor(reward.status)}>
                                {reward.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4 mr-2" />
                            Configurer
                          </Button>
                          {reward.status === "active" && (
                            <Button size="sm" variant="treasure">
                              Distribuer
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      {reward.distributed < reward.total && (
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progression de distribution</span>
                            <span>{Math.round((reward.distributed / reward.total) * 100)}%</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-500" 
                              style={{ width: `${(reward.distributed / reward.total) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}
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

export default Rewards;