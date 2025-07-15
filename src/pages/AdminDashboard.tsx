import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MapPin, BarChart3, Shield, TrendingUp, Award } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Utilisateurs Actifs",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Chasses en Cours",
      value: "45",
      change: "+8%",
      icon: MapPin,
      color: "text-green-600",
    },
    {
      title: "Revenus du Mois",
      value: "€15,678",
      change: "+23%",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Récompenses Distribuées",
      value: "892",
      change: "+15%",
      icon: Award,
      color: "text-orange-600",
    },
  ];

  const quickActions = [
    {
      title: "Gérer les Utilisateurs",
      description: "Voir, modifier et gérer les comptes utilisateurs",
      icon: Users,
      link: "/admin/users",
      color: "bg-blue-500",
    },
    {
      title: "Gérer les Chasses",
      description: "Créer, modifier et superviser les chasses au trésor",
      icon: MapPin,
      link: "/admin/hunts",
      color: "bg-green-500",
    },
    {
      title: "Statistiques",
      description: "Analyser les performances et les métriques",
      icon: BarChart3,
      link: "/admin/stats",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Tableau de Bord Administrateur
            </h1>
            <p className="text-muted-foreground">
              Gérez votre plateforme Lootopia
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> par rapport au mois dernier
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action) => (
            <Card key={action.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle>{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to={action.link}>
                  <Button className="w-full">
                    Accéder
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;