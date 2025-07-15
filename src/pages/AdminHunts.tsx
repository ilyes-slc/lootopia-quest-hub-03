import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MapPin, Search, MoreVertical, Edit, Trash2, Eye, ArrowLeft, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const AdminHunts = () => {
  const hunts = [
    {
      id: 1,
      title: "Mystères de Paris",
      location: "Paris, France",
      status: "active",
      difficulty: "Intermédiaire",
      participants: 156,
      duration: "2h 30min",
      created: "10 Jan 2024",
      reward: "50€",
    },
    {
      id: 2,
      title: "Secrets de Lyon",
      location: "Lyon, France",
      status: "draft",
      difficulty: "Facile",
      participants: 0,
      duration: "1h 45min",
      created: "15 Jan 2024",
      reward: "30€",
    },
    {
      id: 3,
      title: "Aventure Marseillaise",
      location: "Marseille, France",
      status: "active",
      difficulty: "Difficile",
      participants: 89,
      duration: "3h 15min",
      created: "8 Fév 2024",
      reward: "75€",
    },
    {
      id: 4,
      title: "Légendes de Bordeaux",
      location: "Bordeaux, France",
      status: "completed",
      difficulty: "Intermédiaire",
      participants: 234,
      duration: "2h 00min",
      created: "20 Déc 2023",
      reward: "40€",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
      completed: "bg-blue-100 text-blue-800",
      archived: "bg-gray-100 text-gray-800",
    };
    return variants[status as keyof typeof variants] || variants.draft;
  };

  const getDifficultyBadge = (difficulty: string) => {
    const variants = {
      "Facile": "bg-green-100 text-green-800",
      "Intermédiaire": "bg-orange-100 text-orange-800",
      "Difficile": "bg-red-100 text-red-800",
    };
    return variants[difficulty as keyof typeof variants] || variants["Facile"];
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      active: "Active",
      draft: "Brouillon",
      completed: "Terminée",
      archived: "Archivée",
    };
    return labels[status as keyof typeof labels] || status;
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

        <div className="flex items-center gap-3 mb-8">
          <MapPin className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Gestion des Chasses
            </h1>
            <p className="text-muted-foreground">
              Créez et gérez les chasses au trésor de votre plateforme
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Liste des Chasses</CardTitle>
                <CardDescription>
                  Toutes les chasses au trésor disponibles sur la plateforme
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Rechercher une chasse..." 
                    className="pl-10 w-64"
                  />
                </div>
                <Link to="/create-hunt">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nouvelle Chasse
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Chasse</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Difficulté</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Durée</TableHead>
                  <TableHead>Récompense</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hunts.map((hunt) => (
                  <TableRow key={hunt.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-medium">{hunt.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {hunt.location}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(hunt.status)}>
                        {getStatusLabel(hunt.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getDifficultyBadge(hunt.difficulty)}>
                        {hunt.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell>{hunt.participants}</TableCell>
                    <TableCell>{hunt.duration}</TableCell>
                    <TableCell className="font-medium">{hunt.reward}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Voir les détails
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminHunts;