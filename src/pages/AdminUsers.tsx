import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Users, Search, MoreVertical, Shield, Ban, Edit, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AdminUsers = () => {
  const users = [
    {
      id: 1,
      name: "Alice Martin",
      email: "alice.martin@email.com",
      status: "actif",
      role: "utilisateur",
      joinDate: "15 Jan 2024",
      huntsCompleted: 12,
      avatar: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Pierre Dubois",
      email: "pierre.dubois@email.com",
      status: "actif",
      role: "premium",
      joinDate: "22 Fév 2024",
      huntsCompleted: 28,
      avatar: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Marie Leroy",
      email: "marie.leroy@email.com",
      status: "suspendu",
      role: "utilisateur",
      joinDate: "8 Mar 2024",
      huntsCompleted: 5,
      avatar: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Jean Moreau",
      email: "jean.moreau@email.com",
      status: "actif",
      role: "admin",
      joinDate: "1 Jan 2024",
      huntsCompleted: 45,
      avatar: "/placeholder.svg",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      actif: "bg-green-100 text-green-800",
      suspendu: "bg-red-100 text-red-800",
      inactif: "bg-gray-100 text-gray-800",
    };
    return variants[status as keyof typeof variants] || variants.inactif;
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: "bg-purple-100 text-purple-800",
      premium: "bg-gold-100 text-gold-800",
      utilisateur: "bg-blue-100 text-blue-800",
    };
    return variants[role as keyof typeof variants] || variants.utilisateur;
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
          <Users className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Gestion des Utilisateurs
            </h1>
            <p className="text-muted-foreground">
              Gérez les comptes utilisateurs de votre plateforme
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Liste des Utilisateurs</CardTitle>
                <CardDescription>
                  Tous les utilisateurs enregistrés sur la plateforme
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Rechercher un utilisateur..." 
                    className="pl-10 w-64"
                  />
                </div>
                <Button>
                  Nouvel Utilisateur
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Date d'inscription</TableHead>
                  <TableHead>Chasses Complétées</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleBadge(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell>{user.huntsCompleted}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className="h-4 w-4 mr-2" />
                            Changer le rôle
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Ban className="h-4 w-4 mr-2" />
                            Suspendre
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

export default AdminUsers;