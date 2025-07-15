import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  Smartphone, 
  Trophy, 
  Users, 
  Zap, 
  Shield, 
  MapPin,
  Crown,
  Target,
  Gamepad2
} from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Multi-plateforme",
    description: "Accessible sur mobile, tablette et ordinateur pour une expérience seamless"
  },
  {
    icon: Users,
    title: "Mode collaboratif",
    description: "Formez des équipes et relevez des défis ensemble ou en compétition"
  },
  {
    icon: MapPin,
    title: "Géolocalisation",
    description: "Chasses basées sur votre position réelle avec des indices géolocalisés"
  },
  {
    icon: Trophy,
    title: "Système de récompenses",
    description: "Gagnez des pièces, badges et objets rares en complétant les chasses"
  },
  {
    icon: Zap,
    title: "Temps réel",
    description: "Suivi en direct des participants et mise à jour instantanée des scores"
  },
  {
    icon: Target,
    title: "Défis personnalisés",
    description: "Créez vos propres chasses avec notre éditeur intuitif et puissant"
  },
  {
    icon: Crown,
    title: "Classements globaux",
    description: "Montez dans les rankings et devenez le maître chasseur de trésors"
  },
  {
    icon: Shield,
    title: "Sécurisé & fiable",
    description: "Protection des données et modération active pour une expérience saine"
  },
  {
    icon: Gamepad2,
    title: "Gamification avancée",
    description: "Système de niveaux, achievements et progression pour tous les profils"
  }
];

export const Features = () => {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Fonctionnalités
            <span className="bg-gradient-exploration bg-clip-text text-transparent"> Avancées</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une plateforme complète pensée pour offrir la meilleure expérience de chasse au trésor
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-card border-border hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              <CardHeader className="pb-3">
                <div className="w-12 h-12 bg-gradient-adventure rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};