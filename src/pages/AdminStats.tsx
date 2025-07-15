import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Users, 
  MapPin, 
  TrendingUp, 
  ArrowLeft,
  Download,
  Calendar,
  DollarSign,
  Trophy
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminStats = () => {
  const overviewStats = [
    {
      title: "Utilisateurs Totaux",
      value: "2,847",
      change: "+18%",
      icon: Users,
      description: "Nouveaux utilisateurs ce mois",
    },
    {
      title: "Chasses Créées",
      value: "156",
      change: "+12%",
      icon: MapPin,
      description: "Nouvelles chasses ce mois",
    },
    {
      title: "Revenus Totaux",
      value: "€45,230",
      change: "+25%",
      icon: DollarSign,
      description: "Revenus générés ce mois",
    },
    {
      title: "Taux de Completion",
      value: "73%",
      change: "+5%",
      icon: Trophy,
      description: "Chasses terminées avec succès",
    },
  ];

  const popularHunts = [
    { name: "Mystères de Paris", completions: 234, rating: 4.8 },
    { name: "Secrets de Lyon", completions: 189, rating: 4.6 },
    { name: "Aventure Marseillaise", completions: 156, rating: 4.7 },
    { name: "Légendes de Bordeaux", completions: 134, rating: 4.5 },
    { name: "Trésors de Nice", completions: 98, rating: 4.9 },
  ];

  const recentActivity = [
    { 
      action: "Nouvelle chasse créée", 
      details: "Mystères de Toulouse", 
      time: "Il y a 2h",
      type: "hunt"
    },
    { 
      action: "Utilisateur inscrit", 
      details: "Marie Dubois", 
      time: "Il y a 4h",
      type: "user"
    },
    { 
      action: "Chasse complétée", 
      details: "Secrets de Lyon par Pierre Martin", 
      time: "Il y a 6h",
      type: "completion"
    },
    { 
      action: "Paiement reçu", 
      details: "€45 - Premium upgrade", 
      time: "Il y a 8h",
      type: "payment"
    },
  ];

  const getActivityIcon = (type: string) => {
    const icons = {
      hunt: MapPin,
      user: Users,
      completion: Trophy,
      payment: DollarSign,
    };
    const Icon = icons[type as keyof typeof icons] || MapPin;
    return <Icon className="h-4 w-4" />;
  };

  const getActivityColor = (type: string) => {
    const colors = {
      hunt: "text-blue-600",
      user: "text-green-600",
      completion: "text-purple-600",
      payment: "text-orange-600",
    };
    return colors[type as keyof typeof colors] || "text-gray-600";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/admin">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
          </Link>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Statistiques et Analyses
              </h1>
              <p className="text-muted-foreground">
                Visualisez les performances de votre plateforme
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Cette semaine
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="hunts">Chasses</TabsTrigger>
            <TabsTrigger value="revenue">Revenus</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {overviewStats.map((stat) => (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">{stat.change}</span> {stat.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Popular Hunts */}
              <Card>
                <CardHeader>
                  <CardTitle>Chasses Populaires</CardTitle>
                  <CardDescription>
                    Les chasses les plus complétées ce mois
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {popularHunts.map((hunt, index) => (
                      <div key={hunt.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{hunt.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Note: {hunt.rating}/5
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{hunt.completions}</div>
                          <div className="text-sm text-muted-foreground">complétions</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Activité Récente</CardTitle>
                  <CardDescription>
                    Les dernières actions sur la plateforme
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className={`mt-1 ${getActivityColor(activity.type)}`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{activity.action}</div>
                          <div className="text-sm text-muted-foreground">
                            {activity.details}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground whitespace-nowrap">
                          {activity.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Statistiques Utilisateurs</CardTitle>
                <CardDescription>
                  Analyses détaillées de l'activité des utilisateurs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Graphiques détaillés des utilisateurs à venir</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hunts">
            <Card>
              <CardHeader>
                <CardTitle>Statistiques des Chasses</CardTitle>
                <CardDescription>
                  Performance et analyse des chasses au trésor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Graphiques détaillés des chasses à venir</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>Statistiques de Revenus</CardTitle>
                <CardDescription>
                  Analyse financière et tendances de revenus
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Graphiques de revenus détaillés à venir</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminStats;