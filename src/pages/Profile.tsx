import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Mail, 
  Shield, 
  Camera, 
  Trophy, 
  MapPin, 
  Calendar, 
  Star,
  Eye,
  EyeOff,
  Lock,
  Smartphone,
  Bell,
  Globe,
  Activity,
  Award,
  Coins,
  Target,
  Settings,
  Download,
  Trash2
} from "lucide-react";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@email.com",
    role: "player",
    bio: "Passionné de chasses au trésor et d'aventures urbaines.",
    location: "Paris, France",
    phone: "+33 6 12 34 56 78",
    website: "https://jeandupont.fr",
    notifications: {
      email: true,
      push: true,
      marketing: false
    },
    privacy: {
      profilePublic: true,
      showStats: true,
      showLocation: false
    },
    security: {
      mfaEnabled: true,
      lastPasswordChange: "2024-01-15"
    }
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const { toast } = useToast();

  // Données simulées pour les statistiques
  const userStats = {
    level: 12,
    experience: 2847,
    nextLevelXP: 3000,
    huntsCompleted: 15,
    huntsCreated: 3,
    totalRewards: 12500,
    rank: 42,
    averageTime: "2h 15min"
  };

  const recentActivity = [
    { id: 1, type: "completed", hunt: "Le Mystère du Louvre", date: "2024-01-20", reward: 500 },
    { id: 2, type: "created", hunt: "Aventure Montmartre", date: "2024-01-18", reward: 0 },
    { id: 3, type: "joined", hunt: "Secrets de Notre-Dame", date: "2024-01-15", reward: 750 },
    { id: 4, type: "completed", hunt: "Trésors des Tuileries", date: "2024-01-12", reward: 300 }
  ];

  const achievements = [
    { id: 1, name: "Premier Pas", description: "Complétez votre première chasse", earned: true, rarity: "common" },
    { id: 2, name: "Explorateur Urbain", description: "Complétez 10 chasses en ville", earned: true, rarity: "rare" },
    { id: 3, name: "Maître Créateur", description: "Créez 5 chasses au trésor", earned: false, rarity: "epic" },
    { id: 4, name: "Légende", description: "Atteignez le niveau 20", earned: false, rarity: "legendary" }
  ];

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été sauvegardées avec succès.",
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) {
      toast({
        title: "Erreur",
        description: "Les nouveaux mots de passe ne correspondent pas.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Mot de passe modifié",
      description: "Votre mot de passe a été mis à jour avec succès.",
    });
    setPasswordForm({ current: "", new: "", confirm: "" });
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "bg-slate-500";
      case "rare": return "bg-blue-500";
      case "epic": return "bg-purple-500";
      case "legendary": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "completed": return <Trophy className="h-4 w-4" />;
      case "created": return <Target className="h-4 w-4" />;
      case "joined": return <MapPin className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* En-tête du profil */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" alt="Photo de profil" />
                  <AvatarFallback className="text-2xl">
                    {profileData.firstName[0]}{profileData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">
                    {profileData.firstName} {profileData.lastName}
                  </h1>
                  <Badge variant={profileData.role === "organizer" ? "default" : "secondary"}>
                    {profileData.role === "organizer" ? "🧭 Organisateur" : "🎮 Joueur"}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">{profileData.bio}</p>
                
                {/* Statistiques rapides */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{userStats.level}</div>
                    <div className="text-sm text-muted-foreground">Niveau</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{userStats.huntsCompleted}</div>
                    <div className="text-sm text-muted-foreground">Complétées</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{userStats.huntsCreated}</div>
                    <div className="text-sm text-muted-foreground">Créées</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{userStats.totalRewards}</div>
                    <div className="text-sm text-muted-foreground">Points</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Aperçu</TabsTrigger>
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="security">Sécurité</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Confidentialité</TabsTrigger>
              <TabsTrigger value="data">Données</TabsTrigger>
            </TabsList>

            {/* Aperçu */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Progression */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Progression
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Niveau {userStats.level}</span>
                        <span>{userStats.experience}/{userStats.nextLevelXP} XP</span>
                      </div>
                      <Progress value={(userStats.experience / userStats.nextLevelXP) * 100} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <Trophy className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
                        <div className="font-semibold">Rang #{userStats.rank}</div>
                        <div className="text-sm text-muted-foreground">Classement global</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <Target className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                        <div className="font-semibold">{userStats.averageTime}</div>
                        <div className="text-sm text-muted-foreground">Temps moyen</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Récompenses récentes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Coins className="h-5 w-5" />
                      Récompenses récentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivity.filter(a => a.reward > 0).slice(0, 3).map((activity) => (
                        <div key={activity.id} className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-sm">{activity.hunt}</div>
                            <div className="text-xs text-muted-foreground">{activity.date}</div>
                          </div>
                          <Badge variant="outline">+{activity.reward}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Activité récente */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Activité récente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                        <div className="p-2 bg-primary/10 rounded-full">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{activity.hunt}</div>
                          <div className="text-sm text-muted-foreground">
                            {activity.type === "completed" && "Chasse complétée"}
                            {activity.type === "created" && "Chasse créée"}
                            {activity.type === "joined" && "Chasse rejointe"}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">{activity.date}</div>
                          {activity.reward > 0 && (
                            <Badge variant="outline" className="mt-1">+{activity.reward} pts</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Succès & Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <div 
                        key={achievement.id} 
                        className={`p-4 rounded-lg border-2 ${
                          achievement.earned 
                            ? "border-primary/30 bg-primary/5" 
                            : "border-muted bg-muted/20 opacity-60"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${getRarityColor(achievement.rarity)}`}>
                            <Award className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{achievement.name}</div>
                            <div className="text-sm text-muted-foreground">{achievement.description}</div>
                            <Badge variant="outline" className="mt-1 capitalize">
                              {achievement.rarity}
                            </Badge>
                          </div>
                          {achievement.earned && (
                            <Trophy className="h-5 w-5 text-yellow-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profil */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>
                    Gérez vos informations de profil et préférences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          className="pl-10"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Biographie</Label>
                      <Textarea
                        id="bio"
                        placeholder="Parlez-nous de vous..."
                        value={profileData.bio}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Localisation</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="location"
                            className="pl-10"
                            value={profileData.location}
                            onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <div className="relative">
                          <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            className="pl-10"
                            value={profileData.phone}
                            onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Site web</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="website"
                          className="pl-10"
                          value={profileData.website}
                          onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                        />
                      </div>
                    </div>

                    <Button type="submit" variant="treasure">
                      Sauvegarder les modifications
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sécurité */}
            <TabsContent value="security" className="space-y-6">
              {/* Statut de sécurité */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Statut de sécurité
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-medium">Authentification à double facteur</div>
                          <div className="text-sm text-muted-foreground">Activée depuis le 15/01/2024</div>
                        </div>
                      </div>
                      <Badge variant="default" className="bg-green-600">Activé</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <div className="font-medium">Dernière modification du mot de passe</div>
                        <div className="text-sm text-muted-foreground">{profileData.security.lastPasswordChange}</div>
                      </div>
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Changer le mot de passe */}
              <Card>
                <CardHeader>
                  <CardTitle>Changer le mot de passe</CardTitle>
                  <CardDescription>
                    Assurez-vous que votre mot de passe est fort et unique
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          className="pl-10 pr-10"
                          value={passwordForm.current}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, current: e.target.value }))}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? 
                            <EyeOff className="h-4 w-4 text-muted-foreground" /> : 
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          }
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          className="pl-10 pr-10"
                          value={passwordForm.new}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, new: e.target.value }))}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? 
                            <EyeOff className="h-4 w-4 text-muted-foreground" /> : 
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          }
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          className="pl-10"
                          value={passwordForm.confirm}
                          onChange={(e) => setPasswordForm(prev => ({ ...prev, confirm: e.target.value }))}
                        />
                      </div>
                    </div>

                    <Button type="submit" variant="treasure">
                      Mettre à jour le mot de passe
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Gestion MFA */}
              <Card>
                <CardHeader>
                  <CardTitle>Authentification à double facteur (MFA)</CardTitle>
                  <CardDescription>
                    Ajoutez une couche de sécurité supplémentaire à votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Application d'authentification</div>
                      <div className="text-sm text-muted-foreground">Google Authenticator, Authy, etc.</div>
                    </div>
                    <Switch checked={profileData.security.mfaEnabled} />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      Télécharger les codes de récupération
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Gardez ces codes en sécurité. Ils vous permettront d'accéder à votre compte si vous perdez votre appareil.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Préférences de notification
                  </CardTitle>
                  <CardDescription>
                    Choisissez comment vous souhaitez être informé
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Notifications par email</div>
                        <div className="text-sm text-muted-foreground">Recevoir les notifications importantes par email</div>
                      </div>
                      <Switch 
                        checked={profileData.notifications.email}
                        onCheckedChange={(checked) => setProfileData(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, email: checked }
                        }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Notifications push</div>
                        <div className="text-sm text-muted-foreground">Recevoir des notifications dans le navigateur</div>
                      </div>
                      <Switch 
                        checked={profileData.notifications.push}
                        onCheckedChange={(checked) => setProfileData(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, push: checked }
                        }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Emails marketing</div>
                        <div className="text-sm text-muted-foreground">Recevoir des informations sur les nouvelles fonctionnalités</div>
                      </div>
                      <Switch 
                        checked={profileData.notifications.marketing}
                        onCheckedChange={(checked) => setProfileData(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, marketing: checked }
                        }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Confidentialité */}
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Paramètres de confidentialité
                  </CardTitle>
                  <CardDescription>
                    Contrôlez qui peut voir vos informations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Profil public</div>
                        <div className="text-sm text-muted-foreground">Votre profil est visible par les autres utilisateurs</div>
                      </div>
                      <Switch 
                        checked={profileData.privacy.profilePublic}
                        onCheckedChange={(checked) => setProfileData(prev => ({
                          ...prev,
                          privacy: { ...prev.privacy, profilePublic: checked }
                        }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Afficher les statistiques</div>
                        <div className="text-sm text-muted-foreground">Vos stats de jeu sont visibles sur votre profil</div>
                      </div>
                      <Switch 
                        checked={profileData.privacy.showStats}
                        onCheckedChange={(checked) => setProfileData(prev => ({
                          ...prev,
                          privacy: { ...prev.privacy, showStats: checked }
                        }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Afficher la localisation</div>
                        <div className="text-sm text-muted-foreground">Votre ville est visible sur votre profil</div>
                      </div>
                      <Switch 
                        checked={profileData.privacy.showLocation}
                        onCheckedChange={(checked) => setProfileData(prev => ({
                          ...prev,
                          privacy: { ...prev.privacy, showLocation: checked }
                        }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Données */}
            <TabsContent value="data" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des données</CardTitle>
                  <CardDescription>
                    Exportez ou supprimez vos données personnelles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium mb-2">Exporter mes données</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Téléchargez une copie de toutes vos données personnelles.
                    </p>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Exporter mes données
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-medium mb-2 text-red-800">Zone de danger</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Une fois supprimé, votre compte ne pourra pas être récupéré.
                    </p>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Supprimer mon compte
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;