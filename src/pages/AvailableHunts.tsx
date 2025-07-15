import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header } from "@/components/layout/Header";
import { 
  Search, 
  Filter, 
  MapPin, 
  Users, 
  Clock, 
  Star, 
  Gem,
  SlidersHorizontal
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const mockHunts = [
  {
    id: 1,
    title: "Le Trésor du Château Mystérieux",
    description: "Explorez les secrets d'un château abandonné et découvrez son trésor légendaire caché dans ses souterrains.",
    difficulty: "Intermédiaire",
    participants: 24,
    maxParticipants: 50,
    duration: "2-3h",
    reward: "500 pièces d'or",
    location: "Paris, France",
    rating: 4.8,
    image: "🏰",
    tags: ["Historique", "Énigmes", "Équipe"],
    category: "Historique",
    startDate: "2024-01-20",
    organizer: "ChâteauMaster"
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
    tags: ["Exploration", "Solo", "Débutant"],
    category: "Urbain",
    startDate: "2024-01-25",
    organizer: "GemHunter"
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
    tags: ["Logique", "Difficile", "Récompense rare"],
    category: "Mystique",
    startDate: "2024-01-30",
    organizer: "AlchemyMaster"
  },
  {
    id: 4,
    title: "Safari Photo Urbain",
    description: "Découvrez les street-arts cachés de la ville tout en résolvant des énigmes photographiques.",
    difficulty: "Facile",
    participants: 35,
    maxParticipants: 60,
    duration: "1-2h",
    reward: "250 pièces d'or",
    location: "Marseille, France",
    rating: 4.4,
    image: "📸",
    tags: ["Photo", "Art", "Créatif"],
    category: "Artistique",
    startDate: "2024-02-01",
    organizer: "StreetArtist"
  },
  {
    id: 5,
    title: "Les Secrets du Vieux Port",
    description: "Une aventure maritime pleine de mystères et de légendes de pirates.",
    difficulty: "Intermédiaire",
    participants: 18,
    maxParticipants: 40,
    duration: "3-4h",
    reward: "600 pièces d'or + Carte au trésor",
    location: "La Rochelle, France",
    rating: 4.7,
    image: "⚓",
    tags: ["Maritime", "Aventure", "Histoire"],
    category: "Historique",
    startDate: "2024-02-05",
    organizer: "CapitaineTrésor"
  },
  {
    id: 6,
    title: "Escape Game Nature",
    description: "Survivez en forêt en utilisant votre intelligence et les ressources naturelles.",
    difficulty: "Expert",
    participants: 12,
    maxParticipants: 25,
    duration: "5-7h",
    reward: "800 pièces d'or + Badge Survivant",
    location: "Fontainebleau, France",
    rating: 4.8,
    image: "🌲",
    tags: ["Nature", "Survie", "Équipe"],
    category: "Nature",
    startDate: "2024-02-10",
    organizer: "ForestMaster"
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

const AvailableHunts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const { user } = useAuth();
  const isOrga = user?.role === "ORGANISATEUR";

  const filteredHunts = mockHunts.filter(hunt => {
    const matchesSearch = hunt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hunt.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "all" || hunt.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === "all" || hunt.category === selectedCategory;
    const matchesLocation = selectedLocation === "all" || hunt.location.includes(selectedLocation);
    
    return matchesSearch && matchesDifficulty && matchesCategory && matchesLocation;
  });

  const sortedHunts = [...filteredHunts].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "participants":
        return b.participants - a.participants;
      case "date":
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      case "reward":
        return parseInt(b.reward.match(/\d+/)?.[0] || "0") - parseInt(a.reward.match(/\d+/)?.[0] || "0");
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Chasses
            <span className="bg-gradient-treasure bg-clip-text text-transparent"> Disponibles</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Découvrez et rejoignez les aventures créées par notre communauté
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher une chasse..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Difficulty Filter */}
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulté" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes difficultés</SelectItem>
                  <SelectItem value="Facile">Facile</SelectItem>
                  <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes catégories</SelectItem>
                  <SelectItem value="Historique">Historique</SelectItem>
                  <SelectItem value="Urbain">Urbain</SelectItem>
                  <SelectItem value="Mystique">Mystique</SelectItem>
                  <SelectItem value="Artistique">Artistique</SelectItem>
                  <SelectItem value="Nature">Nature</SelectItem>
                </SelectContent>
              </Select>

              {/* Location Filter */}
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Lieu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les lieux</SelectItem>
                  <SelectItem value="Paris">Paris</SelectItem>
                  <SelectItem value="Lyon">Lyon</SelectItem>
                  <SelectItem value="Toulouse">Toulouse</SelectItem>
                  <SelectItem value="Marseille">Marseille</SelectItem>
                  <SelectItem value="La Rochelle">La Rochelle</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Note</SelectItem>
                  <SelectItem value="participants">Participants</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="reward">Récompense</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {sortedHunts.length} chasse{sortedHunts.length > 1 ? 's' : ''} trouvée{sortedHunts.length > 1 ? 's' : ''}
          </p>
          {isOrga && (
            <Button variant="treasure" asChild>
              <Link to="/create-hunt">Créer une chasse</Link>
            </Button>
          )}
        </div>

        {/* Hunt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedHunts.map((hunt) => (
            <Card key={hunt.id} className="bg-card border-border hover:shadow-treasure transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-4xl">{hunt.image}</div>
                  <Badge className={getDifficultyColor(hunt.difficulty)}>
                    {hunt.difficulty}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-foreground line-clamp-1">{hunt.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{hunt.description}</p>
                <p className="text-xs text-muted-foreground">Par {hunt.organizer}</p>
              </CardHeader>
              
              <CardContent className="pb-3">
                {/* Stats Grid */}
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
                    <span className="truncate">{hunt.location}</span>
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
                  {hunt.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {hunt.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{hunt.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex gap-2">
                <Button className="flex-1" variant="outline" asChild>
                  <Link to={`/hunt/${hunt.id}`}>Voir détails</Link>
                </Button>
                <Button className="flex-1" variant="treasure" asChild>
                  <Link to={`/game/${hunt.id}`}>Rejoindre</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {sortedHunts.length === 0 && (
          <div className="text-center py-16">
            <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Aucune chasse trouvée</h3>
            <p className="text-muted-foreground mb-4">
              Essayez de modifier vos filtres{isOrga ? ' ou créez votre propre chasse !' : ' !'}
            </p>
            {isOrga && (
              <Button variant="treasure" asChild>
                <Link to="/create-hunt">Créer une chasse</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableHunts;