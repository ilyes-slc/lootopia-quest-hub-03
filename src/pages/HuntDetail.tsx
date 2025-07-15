import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Header } from "@/components/layout/Header";
import { 
  ArrowLeft,
  MapPin, 
  Users, 
  Clock, 
  Star, 
  Gem,
  Calendar,
  Trophy,
  Target,
  CheckCircle,
  Share2
} from "lucide-react";

const mockHunt = {
  id: 1,
  title: "Le Trésor du Château Mystérieux",
  description: "Plongez dans une aventure extraordinaire au cœur d'un château abandonné du XVIe siècle. Cette chasse au trésor vous menera à travers des couloirs secrets, des salles mystérieuses et des énigmes complexes laissées par les anciens propriétaires. Découvrez l'histoire fascinante de la famille de Montclair et trouvez le trésor qu'ils ont caché avant de fuir pendant la Révolution française.",
  difficulty: "Intermédiaire",
  participants: 24,
  maxParticipants: 50,
  duration: "2-3h",
  reward: "500 pièces d'or + Badge Explorateur",
  location: "Château de Vincennes, Paris, France",
  rating: 4.8,
  reviews: 156,
  image: "🏰",
  tags: ["Historique", "Énigmes", "Équipe"],
  category: "Historique",
  startDate: "2024-01-20",
  endDate: "2024-02-20",
  organizer: {
    name: "ChâteauMaster",
    avatar: "",
    rating: 4.9,
    huntsCreated: 12
  },
  steps: [
    {
      id: 1,
      title: "L'Entrée Secrète",
      description: "Trouvez l'entrée cachée du château en déchiffrant l'inscription latine.",
      completed: false
    },
    {
      id: 2,
      title: "La Salle des Armoiries",
      description: "Identifiez les blasons des familles alliées pour ouvrir le passage.",
      completed: false
    },
    {
      id: 3,
      title: "Le Cabinet de Curiosités",
      description: "Résolvez l'énigme des objets antiques pour obtenir la clé suivante.",
      completed: false
    },
    {
      id: 4,
      title: "La Bibliothèque Secrète",
      description: "Trouvez le livre qui cache l'indice final du trésor.",
      completed: false
    },
    {
      id: 5,
      title: "Le Trésor Final",
      description: "Utilisez tous vos indices pour localiser le trésor des Montclair.",
      completed: false
    }
  ],
  requirements: [
    "Smartphone avec GPS",
    "Application Lootopia installée",
    "Équipe de 2-4 personnes recommandée",
    "Chaussures confortables"
  ],
  tips: [
    "Apportez une lampe de poche pour les zones sombres",
    "Prenez des notes tout au long de l'aventure",
    "Travaillez en équipe pour résoudre les énigmes",
    "Respectez les lieux historiques"
  ]
};

const HuntDetail = () => {
  const progressPercentage = (mockHunt.participants / mockHunt.maxParticipants) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Facile": return "bg-accent text-accent-foreground";
      case "Intermédiaire": return "bg-secondary text-secondary-foreground";
      case "Expert": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux chasses
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-6xl">{mockHunt.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getDifficultyColor(mockHunt.difficulty)}>
                        {mockHunt.difficulty}
                      </Badge>
                      <Badge variant="outline">{mockHunt.category}</Badge>
                    </div>
                    <h1 className="text-3xl font-bold mb-3">{mockHunt.title}</h1>
                    
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="h-4 w-4 text-primary fill-primary" />
                        <span>{mockHunt.rating} ({mockHunt.reviews})</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{mockHunt.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-primary" />
                        <span>{mockHunt.participants}/{mockHunt.maxParticipants}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>Paris</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {mockHunt.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="prose prose-sm max-w-none text-foreground">
                  <p>{mockHunt.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Étapes de la chasse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockHunt.steps.map((step, index) => (
                    <div key={step.id} className="flex gap-4 p-4 rounded-lg border">
                      <div className="flex-shrink-0">
                        {step.completed ? (
                          <CheckCircle className="h-6 w-6 text-accent" />
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-muted-foreground flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements & Tips */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Prérequis</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mockHunt.requirements.map((req, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conseils</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mockHunt.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Organizer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Organisateur</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={mockHunt.organizer.avatar} />
                    <AvatarFallback className="bg-gradient-treasure text-primary-foreground">
                      {mockHunt.organizer.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{mockHunt.organizer.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-3 w-3 fill-current" />
                      {mockHunt.organizer.rating} • {mockHunt.organizer.huntsCreated} chasses créées
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Voir le profil
                </Button>
              </CardContent>
            </Card>

            {/* Participation */}
            <Card>
              <CardHeader>
                <CardTitle>Participation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Participants</span>
                    <span>{mockHunt.participants}/{mockHunt.maxParticipants}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>

                {/* Dates */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Début: {new Date(mockHunt.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Fin: {new Date(mockHunt.endDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Reward */}
                <div className="p-3 bg-primary/10 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Gem className="h-4 w-4 text-primary" />
                    <span className="font-medium text-primary">Récompenses</span>
                  </div>
                  <p className="text-sm">{mockHunt.reward}</p>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Button variant="treasure" className="w-full" size="lg">
                    <Trophy className="h-4 w-4 mr-2" />
                    Rejoindre la chasse
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Partager
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Localisation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {mockHunt.location}
                </p>
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Carte interactive disponible après inscription
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HuntDetail;