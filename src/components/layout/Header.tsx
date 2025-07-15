import { Button } from "@/components/ui/button";
import { Compass, Search, User, Menu, Shield } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Role-based navigation
  const isAdmin = user?.role === "ADMINISTRATEUR";
  const isOrga = user?.role === "ORGANISATEUR";
  const isJoueur = user?.role === "JOUEUR";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Compass className="h-8 w-8 text-primary animate-float" />
            <h1 className="text-2xl font-bold bg-gradient-treasure bg-clip-text text-transparent">
              Lootopia
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {(isJoueur || isOrga) && (
              <Link to="/hunts" className="text-foreground hover:text-primary transition-colors">
                Chasses
              </Link>
            )}
            {isJoueur || isOrga && (
              <Link to="/my-hunts" className="text-foreground hover:text-primary transition-colors">
                Mes Chasses
              </Link>
            )}
            {(isJoueur || isOrga) && (
              <Link to="/rewards" className="text-foreground hover:text-primary transition-colors">
                Récompenses
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin" className="text-foreground hover:text-primary transition-colors flex items-center gap-1">
                <Shield className="h-4 w-4" />
                Admin
              </Link>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-4 w-4" />
            </Button>
            {isAuthenticated ? (
              <>
                <span className="hidden md:inline text-sm font-medium mr-2">
                  {user?.firstName} {user?.lastName}
                </span>
                <Link to="/profile">
                  <Button variant="ghost" size="icon" title="Profil">
                    <User className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout} className="ml-2">
                  Déconnexion
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="treasure" className="hidden sm:flex">
                  Connexion
                </Button>
              </Link>
            )}
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-3">
              {(isJoueur || isOrga) && (
                <Link to="/hunts" className="text-foreground hover:text-primary transition-colors py-2">
                  Chasses
                </Link>
              )}
              {isJoueur && (
                <Link to="/my-hunts" className="text-foreground hover:text-primary transition-colors py-2">
                  Mes Chasses
                </Link>
              )}
              {(isJoueur || isOrga) && (
                <Link to="/rewards" className="text-foreground hover:text-primary transition-colors py-2">
                  Récompenses
                </Link>
              )}
              {isAdmin && (
                <Link to="/admin" className="text-foreground hover:text-primary transition-colors py-2 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Admin
                </Link>
              )}
              {isAuthenticated && (
                <>
                  <Link to="/profile" className="w-full mt-2">
                    <Button variant="ghost" className="w-full">
                      Profil
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full mt-2" onClick={handleLogout}>
                    Déconnexion
                  </Button>
                </>
              )}
              {!isAuthenticated && (
                <Link to="/login" className="w-full mt-2">
                  <Button variant="treasure" className="w-full">
                    Connexion
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};