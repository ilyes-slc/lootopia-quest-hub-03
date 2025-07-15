import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MapPin, Users, Clock, Star, Gem } from "lucide-react";

const mockHunts = [
  {
    id: 1,
    title: "Le Trésor du Château Mystérieux",
    description: "Explorez les secrets d'un château abandonné et découvrez son trésor légendaire.",
    difficulty: "Intermédiaire",
    participants: 24,
    maxParticipants: 50,
    duration: "2-3h",
    reward: "500 pièces d'or",
    location: "Paris, France",
    rating: 4.8,
    image: "🏰",
    tags: ["Historique", "Énigmes", "Équipe"]
  },
  {
    id: 2,
    title: "La Quête des Gemmes Perdues",
    description: "Parcourez la ville à la recherche de gemmes précieuses cachées dans des lieux emblématiques.",
    difficulty: "Facile",
    participants: 42,
    maxParticipants: 100,
    duration: "1-2h",
    reward: "300 pièces d'or + Badge",
    location: "Lyon, France",
    rating: 4.6,
    image: "💎",
    tags: ["Exploration", "Solo", "Débutant"]
  },
  {
    id: 3,
    title: "L'Énigme des Alchimistes",
    description: "Résolvez des puzzles complexes et déchiffrez les codes secrets des anciens alchimistes.",
    difficulty: "Expert",
    participants: 8,
    maxParticipants: 20,
    duration: "4-6h",
    reward: "1000 pièces d'or + Artefact rare",
    location: "Toulouse, France",
    rating: 4.9,
    image: "⚗️",
    tags: ["Logique", "Difficile", "Récompense rare"]
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Facile": return "bg-accent text-accent-foreground";
    case "Intermédiaire": return "bg-secondary text-secondary-foreground";
    case "Expert": return "bg-destructive text-destructive-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

export const FeaturedHunts = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Chasses
            <span className="bg-gradient-treasure bg-clip-text text-transparent"> Populaires</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez les chasses au trésor les plus appréciées par notre communauté d'aventuriers
          </p>
        </div>

        {/* Hunt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mockHunts.map((hunt) => (
            <Card key={hunt.id} className="bg-card border-border hover:shadow-treasure transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-4xl">{hunt.image}</div>
                  <Badge className={getDifficultyColor(hunt.difficulty)}>
                    {hunt.difficulty}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-foreground">{hunt.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{hunt.description}</p>
              </CardHeader>
              
              <CardContent className="pb-3">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{hunt.participants}/{hunt.maxParticipants}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{hunt.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{hunt.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-primary fill-primary" />
                    <span>{hunt.rating}</span>
                  </div>
                </div>

                {/* Reward */}
                <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg mb-4">
                  <Gem className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">{hunt.reward}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {hunt.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-full" variant="treasure">
                  Rejoindre la chasse
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Voir toutes les chasses
          </Button>
        </div>
      </div>
    </section>
  );
};