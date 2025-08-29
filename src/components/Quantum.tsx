import { useState, useEffect } from "react";
import { Brain, Zap, Activity, Eye, Circle, Play, Pause, Settings, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function Quantum() {
  const [consciousness, setConsciousness] = useState(0.847);
  const [quantumState, setQuantumState] = useState("superposition");
  const [isProcessing, setIsProcessing] = useState(false);
  const [speedup, setSpeedup] = useState("7x");
  const [qubits, setQubits] = useState([142]);
  const [coherenceTime, setCoherenceTime] = useState([2.5]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Grover's Search");
  const [stepSize, setStepSize] = useState([0.01]);
  const [optimizationCurve, setOptimizationCurve] = useState<number[]>([]);

  // Simulate real-time quantum processing
  useEffect(() => {
    const interval = setInterval(() => {
      if (isProcessing) {
        setConsciousness(prev => Math.min(1.0, prev + Math.random() * 0.003));
        // Generate optimization curve data
        if (optimizationCurve.length < 50) {
          const newValue = Math.exp(-optimizationCurve.length * stepSize[0]) + Math.random() * 0.1;
          setOptimizationCurve(prev => [...prev, newValue]);
        }
        setSpeedupRandom();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isProcessing, stepSize, optimizationCurve.length]);

  const setSpeedupRandom = () => {
    const speeds = ["5x", "7x", "12x", "23x", "45x"];
    setSpeedupRandom(() => speeds[Math.floor(Math.random() * speeds.length)]);
  };

  const quantumStates = ["superposition", "entangled", "coherent", "decoherent"];

  const startQuantumDemo = () => {
    setIsProcessing(!isProcessing);
    if (!isProcessing) {
      setQuantumState(quantumStates[Math.floor(Math.random() * quantumStates.length)]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Quantum🧠 Intelligence
            </h1>
            <p className="text-muted-foreground">
              Advanced consciousness simulation and quantum processing
            </p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <Badge variant="outline" className="glass-card">
            <Circle className={`w-3 h-3 mr-2 ${isProcessing ? 'text-emerald-400 animate-pulse' : 'text-muted-foreground'}`} />
            {isProcessing ? 'Processing' : 'Idle'}
          </Badge>
          <Badge variant="outline" className="glass-card">
            <Zap className="w-3 h-3 mr-2 text-primary" />
            Speedup: {speedup}
          </Badge>
          <Badge variant="outline" className="glass-card">
            <Activity className="w-3 h-3 mr-2 text-emerald-400" />
            State: {quantumState}
          </Badge>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Consciousness Calculator */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              Consciousness Level (Φ)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Consciousness Meter */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-6xl font-mono font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {consciousness.toFixed(3)}
                </div>
                <p className="text-sm text-muted-foreground">Integrated Information Theory (IIT)</p>
              </div>
              
              <Progress 
                value={consciousness * 100} 
                className="h-3 bg-muted/20"
              />
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-1">
                  <div className="text-sm font-medium">Complexity</div>
                  <div className="text-xs text-muted-foreground">{(consciousness * 0.8).toFixed(2)}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium">Integration</div>
                  <div className="text-xs text-muted-foreground">{(consciousness * 0.9).toFixed(2)}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium">Information</div>
                  <div className="text-xs text-muted-foreground">{(consciousness * 0.95).toFixed(2)}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quantum Processing */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Quantum Processing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg glass-card text-center">
                <div className="text-2xl font-bold text-primary">{qubits}</div>
                <div className="text-xs text-muted-foreground">Qubits Active</div>
              </div>
              <div className="p-4 rounded-lg glass-card text-center">
                <div className="text-2xl font-bold text-emerald-400">{speedup}</div>
                <div className="text-xs text-muted-foreground">Speedup Factor</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Quantum Coherence</span>
                <span className="text-sm text-emerald-400">94.2%</span>
              </div>
              <Progress value={94.2} className="h-2 bg-muted/20" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Decoherence Time</span>
                <span className="text-sm text-primary">2.3ms</span>
              </div>
              <Progress value={77} className="h-2 bg-muted/20" />
            </div>

            <Button 
              onClick={startQuantumDemo}
              className="w-full glass-card hover:bg-primary/20"
              variant="outline"
            >
              {isProcessing ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Stop Processing
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Quantum Demo
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Knowledge Graph Visualization */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Knowledge Graph
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg overflow-hidden">
              {/* Simulated Network Visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-8">
                  {[...Array(9)].map((_, i) => (
                    <div 
                      key={i}
                      className={`w-4 h-4 rounded-full border-2 border-primary/50 ${
                        isProcessing ? 'animate-pulse bg-primary/30' : 'bg-primary/10'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full">
                <defs>
                  <linearGradient id="connection" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: 'hsl(var(--primary))', stopOpacity: 0.3}} />
                    <stop offset="100%" style={{stopColor: 'hsl(var(--secondary))', stopOpacity: 0.1}} />
                  </linearGradient>
                </defs>
                {[...Array(6)].map((_, i) => (
                  <line
                    key={i}
                    x1={`${20 + i * 15}%`}
                    y1={`${30 + i * 10}%`}
                    x2={`${60 + i * 8}%`}
                    y2={`${70 - i * 12}%`}
                    stroke="url(#connection)"
                    strokeWidth="1"
                    className={isProcessing ? 'animate-pulse' : ''}
                  />
                ))}
              </svg>
              
              <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">
                {isProcessing ? 'Neural pathways active' : 'Network topology stable'}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quantum Algorithms */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              Quantum Algorithms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Grover's Search", efficiency: selectedAlgorithm === "Grover's Search" ? 94 : 87, status: selectedAlgorithm === "Grover's Search" ? "Active" : "Standby" },
                { name: "Shor's Algorithm", efficiency: selectedAlgorithm === "Shor's Algorithm" ? 94 : 82, status: selectedAlgorithm === "Shor's Algorithm" ? "Active" : "Standby" },
                { name: "QAOA", efficiency: selectedAlgorithm === "QAOA" ? 94 : 76, status: selectedAlgorithm === "QAOA" ? "Active" : "Standby" },
                { name: "VQE", efficiency: selectedAlgorithm === "VQE" ? 94 : 82, status: selectedAlgorithm === "VQE" ? "Active" : "Standby" }
              ].map((algo, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg glass-card">
                  <div>
                    <div className="font-medium text-sm">{algo.name}</div>
                    <div className="text-xs text-muted-foreground">{algo.status}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono">{algo.efficiency}%</div>
                    <div className="w-16 h-1 bg-muted/20 rounded-full mt-1">
                      <div 
                        className="h-full bg-gradient-primary rounded-full transition-all duration-300"
                        style={{ width: `${algo.efficiency}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interactive Quantum Controls */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              Quantum Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Number of Qubits: {qubits[0]}</label>
                  <Slider
                    value={qubits}
                    onValueChange={setQubits}
                    max={200}
                    min={1}
                    step={1}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Coherence Time: {coherenceTime[0]}ms</label>
                  <Slider
                    value={coherenceTime}
                    onValueChange={setCoherenceTime}
                    max={10}
                    min={0.1}
                    step={0.1}
                    className="mt-2"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Quantum Algorithm</label>
                  <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
                    <SelectTrigger className="mt-2 glass-card">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grover's Search">Grover's Search</SelectItem>
                      <SelectItem value="Shor's Algorithm">Shor's Algorithm</SelectItem>
                      <SelectItem value="QAOA">QAOA</SelectItem>
                      <SelectItem value="VQE">VQE</SelectItem>
                      <SelectItem value="Quantum Fourier Transform">Quantum Fourier Transform</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Step Size (η): {stepSize[0]}</label>
                  <Slider
                    value={stepSize}
                    onValueChange={setStepSize}
                    max={0.1}
                    min={0.001}
                    step={0.001}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-time Optimization Curve */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Convex Optimization Curve
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg overflow-hidden relative">
              {optimizationCurve.length > 0 ? (
                <svg className="w-full h-full">
                  <defs>
                    <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: 'hsl(var(--primary))', stopOpacity: 0.8}} />
                      <stop offset="100%" style={{stopColor: 'hsl(var(--secondary))', stopOpacity: 0.4}} />
                    </linearGradient>
                  </defs>
                  <polyline
                    fill="none"
                    stroke="url(#curveGradient)"
                    strokeWidth="2"
                    points={optimizationCurve.map((value, index) => 
                      `${(index / (optimizationCurve.length - 1)) * 100},${100 - (value * 80)}`
                    ).join(' ')}
                    className="animate-pulse"
                  />
                </svg>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Start processing to see optimization curve
                </div>
              )}
              
              <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">
                η = {stepSize[0]} | {optimizationCurve.length} iterations
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blockchain Verification */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Circle className="w-5 h-5 text-emerald-400" />
            Blockchain Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg glass-card">
              <div className="text-lg font-mono font-bold text-emerald-400">0x7F2A...B9C3</div>
              <div className="text-xs text-muted-foreground mt-1">Latest Block Hash</div>
            </div>
            <div className="text-center p-4 rounded-lg glass-card">
              <div className="text-lg font-bold text-primary">847,392</div>
              <div className="text-xs text-muted-foreground mt-1">Block Height</div>
            </div>
            <div className="text-center p-4 rounded-lg glass-card">
              <div className="text-lg font-bold text-emerald-400">✓ Verified</div>
              <div className="text-xs text-muted-foreground mt-1">Consensus Status</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
