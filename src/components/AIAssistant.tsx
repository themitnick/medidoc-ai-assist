import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Search, Lightbulb, FileText, AlertTriangle } from "lucide-react";
import { mockDiagnosticSuggestions } from "@/data/mockData";

export const AIAssistant = () => {
  const [symptoms, setSymptoms] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI response based on symptoms
    const symptomsList = symptoms.toLowerCase().split(',').map(s => s.trim());
    let matchedAnalysis = null;
    
    for (const suggestion of mockDiagnosticSuggestions) {
      const matches = suggestion.symptomes.filter(symptom => 
        symptomsList.some(inputSymptom => 
          symptom.toLowerCase().includes(inputSymptom) || 
          inputSymptom.includes(symptom.toLowerCase())
        )
      );
      
      if (matches.length > 0) {
        matchedAnalysis = suggestion;
        break;
      }
    }
    
    if (!matchedAnalysis) {
      // Default analysis for unmatched symptoms
      matchedAnalysis = {
        symptomes: symptomsList,
        diagnostics: [
          { nom: "Syndrome viral", probabilite: 65, examens: ["NFS", "CRP"] },
          { nom: "Affection bénigne", probabilite: 45, examens: ["Examen clinique approfondi"] },
          { nom: "Consultation spécialisée recommandée", probabilite: 30, examens: ["Selon orientation"] }
        ]
      };
    }
    
    setAnalysis(matchedAnalysis);
    setIsAnalyzing(false);
  };

  const getSeverityColor = (probability: number): "destructive" | "secondary" | "default" | "outline" => {
    if (probability >= 70) return "destructive";
    if (probability >= 50) return "default";
    return "secondary";
  };

  const getSeverityText = (probability: number) => {
    if (probability >= 70) return "Haute";
    if (probability >= 50) return "Modérée";
    return "Faible";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Assistant IA Diagnostic</h2>
          <p className="text-muted-foreground">
            Analyse intelligente des symptômes et suggestions diagnostiques
          </p>
        </div>
        <Badge variant="outline" className="gap-2">
          <Brain className="w-4 h-4" />
          IA Médicale v2.1
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Symptom Input */}
        <div className="lg:col-span-1">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                Analyse des Symptômes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Décrivez les symptômes du patient
                </label>
                <Textarea
                  placeholder="Ex: fièvre, toux, fatigue, douleur thoracique..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
              
              <Button 
                onClick={handleAnalyze}
                disabled={!symptoms.trim() || isAnalyzing}
                className="w-full gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <Brain className="w-4 h-4 animate-pulse" />
                    Analyse en cours...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4" />
                    Analyser avec l'IA
                  </>
                )}
              </Button>

              {isAnalyzing && (
                <div className="space-y-2">
                  <Progress value={75} />
                  <p className="text-sm text-muted-foreground text-center">
                    Analyse des patterns médicaux...
                  </p>
                </div>
              )}

              <div className="p-3 bg-medical-light rounded-lg">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Conseil IA</p>
                    <p className="text-muted-foreground">
                      Soyez précis dans la description des symptômes pour une analyse plus pertinente.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Results */}
        <div className="lg:col-span-2">
          {analysis ? (
            <div className="space-y-6">
              {/* Diagnostic Suggestions */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    Suggestions Diagnostiques
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysis.diagnostics.map((diagnostic: any, index: number) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-lg">{diagnostic.nom}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant={getSeverityColor(diagnostic.probabilite)}>
                              {getSeverityText(diagnostic.probabilite)}
                            </Badge>
                            <span className="text-sm font-medium">
                              {diagnostic.probabilite}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <Progress 
                            value={diagnostic.probabilite} 
                            className="h-2"
                          />
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Examens recommandés:</p>
                          <div className="flex flex-wrap gap-2">
                            {diagnostic.examens.map((examen: string, examIndex: number) => (
                              <Badge key={examIndex} variant="outline">
                                {examen}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Recommandations Cliniques
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-5 h-5 text-success mt-0.5" />
                        <div>
                          <h4 className="font-medium text-success mb-1">Démarche diagnostique</h4>
                          <p className="text-sm">
                            Commencer par les examens les moins invasifs en fonction de la probabilité la plus élevée.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                        <div>
                          <h4 className="font-medium text-warning mb-1">Surveillance</h4>
                          <p className="text-sm">
                            Surveiller l'évolution des symptômes et réévaluer si aggravation.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Brain className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium text-primary mb-1">Analyse IA</h4>
                          <p className="text-sm">
                            Cette analyse est basée sur les dernières données médicales et doit toujours être validée par votre expertise clinique.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="shadow-card h-96 flex items-center justify-center">
              <CardContent>
                <div className="text-center">
                  <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium">En attente d'analyse</p>
                  <p className="text-muted-foreground">
                    Saisissez les symptômes du patient pour commencer l'analyse IA
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};