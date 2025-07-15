import { Button } from "@/components/ui/button";
import { Compass, Search, User, Menu } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Compass className="h-8 w-8 text-primary animate-float" />
            <h1 className="text-2xl font-bold bg-gradient-treasure bg-clip-text text-transparent">
              Lootopia
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#hunts" className="text-foreground hover:text-primary transition-colors">
              Chasses
            </a>
            <a href="#leaderboard" className="text-foreground hover:text-primary transition-colors">
              Classements
            </a>
            <a href="#marketplace" className="text-foreground hover:text-primary transition-colors">
              Marché
            </a>
            <a href="#shop" className="text-foreground hover:text-primary transition-colors">
              Boutique
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="treasure" className="hidden sm:flex">
              Connexion
            </Button>
            
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
              <a href="#hunts" className="text-foreground hover:text-primary transition-colors py-2">
                Chasses
              </a>
              <a href="#leaderboard" className="text-foreground hover:text-primary transition-colors py-2">
                Classements
              </a>
              <a href="#marketplace" className="text-foreground hover:text-primary transition-colors py-2">
                Marché
              </a>
              <a href="#shop" className="text-foreground hover:text-primary transition-colors py-2">
                Boutique
              </a>
              <Button variant="treasure" className="w-full mt-2">
                Connexion
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};