import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, User, Lock, Shield } from "lucide-react";

interface LoginFormProps {
  onLogin: (credentials: { email: string; password: string }) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onLogin({ email, password });
    setIsLoading(false);
  };

  const demoCredentials = [
    { role: "Médecin", email: "dr.dupont@medidoc.fr", password: "demo123" },
    { role: "Infirmier", email: "infirmier@medidoc.fr", password: "demo123" },
    { role: "Admin", email: "admin@medidoc.fr", password: "demo123" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-medical-light to-background p-4">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="text-center lg:text-left space-y-6">
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-medical-blue to-medical-dark rounded-xl flex items-center justify-center shadow-medical">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">MediDoc AI</h1>
              <p className="text-muted-foreground">Assistant Médical Intelligent</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Dématérialisation des dossiers médicaux
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Une solution complète basée sur l'intelligence artificielle pour la gestion 
              des dossiers patients, l'aide au diagnostic et la vérification des interactions médicamenteuses.
            </p>
          </div>

          <div className="grid gap-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <span>Conformité RGPD et sécurité médicale</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-success" />
              </div>
              <span>IA pour l'aide au diagnostic</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-warning" />
              </div>
              <span>Vérification des interactions médicamenteuses</span>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-medical">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Connexion Sécurisée</CardTitle>
              <p className="text-muted-foreground">
                Accédez à votre espace médical
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email professionnel</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre.email@etablissement.fr"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Connexion en cours..." : "Se connecter"}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground mb-3 text-center">
                  Comptes de démonstration:
                </p>
                <div className="space-y-2">
                  {demoCredentials.map((cred, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-xs"
                      onClick={() => {
                        setEmail(cred.email);
                        setPassword(cred.password);
                      }}
                    >
                      <User className="w-3 h-3 mr-2" />
                      {cred.role} - {cred.email}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};