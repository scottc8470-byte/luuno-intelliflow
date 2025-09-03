import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Atom, Zap, Network, Settings } from "lucide-react";

const quantumAlgorithms = [
  {
    name: "Grover's Search",
    status: "Active",
    efficiency: 94,
    description: "Quantum search algorithm for unstructured databases"
  },
  {
    name: "Shor's Algorithm",
    status: "Standby",
    efficiency: 82,
    description: "Quantum algorithm for integer factorization"
  },
  {
    name: "QAOA",
    status: "Standby",
    efficiency: 76,
    description: "Quantum Approximate Optimization Algorithm"
  },
  {
    name: "VQE",
    status: "Standby",
    efficiency: 82,
    description: "Variational Quantum Eigensolver"
  }
];

const quantumAdvantages = [
  "Exponential speedup for specific problems",
  "Parallel state exploration",
  "Cryptographic applications",
  "Machine learning acceleration",
  "Complex optimization solutions"
];

export default function Quantum() {
  const [qubits, setQubits] = useState([142]);
  const [coherenceTime, setCoherenceTime] = useState([2.5]);
  const [stepSize, setStepSize] = useState([0.01]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("grover");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quantum</h1>
          <p className="text-muted-foreground mt-1">
            Advanced quantum computing algorithms and optimization
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Knowledge Graph */}
        <Card className="glow-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5" />
              Knowledge Graph
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-muted/20 rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Quantum Network Visualization */}
              <div className="grid grid-cols-3 gap-8">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-accent border-2 border-accent glow animate-pulse"
                    style={{
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: "2s"
                    }}
                  />
                ))}
              </div>
              {/* Connection Lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mt-16">
                    Network topology stable
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quantum Algorithms */}
        <Card className="glow-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Atom className="h-5 w-5" />
              Quantum Algorithms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quantumAlgorithms.map((algo) => (
                <div key={algo.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{algo.name}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{algo.efficiency}%</span>
                        <div className={`w-2 h-2 rounded-full ${
                          algo.status === "Active" ? "bg-success" : "bg-muted-foreground"
                        }`} />
                        <span className="text-xs text-muted-foreground">{algo.status}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{algo.description}</p>
                    <Progress value={algo.efficiency} className="h-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quantum Parameters */}
      <Card className="glow-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Quantum Parameters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium">Number of Qubits: {qubits[0]}</label>
                </div>
                <Slider
                  value={qubits}
                  onValueChange={setQubits}
                  max={200}
                  min={50}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>50</span>
                  <span>200</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium">Coherence Time: {coherenceTime[0]}ms</label>
                </div>
                <Slider
                  value={coherenceTime}
                  onValueChange={setCoherenceTime}
                  max={5}
                  min={0.1}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0.1ms</span>
                  <span>5ms</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium">Step Size (η): {stepSize[0]}</label>
                </div>
                <Slider
                  value={stepSize}
                  onValueChange={setStepSize}
                  max={0.1}
                  min={0.001}
                  step={0.001}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0.001</span>
                  <span>0.1</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-3 block">Quantum Algorithm</label>
                <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select algorithm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grover">Grover's Search</SelectItem>
                    <SelectItem value="shor">Shor's Algorithm</SelectItem>
                    <SelectItem value="qaoa">QAOA</SelectItem>
                    <SelectItem value="vqe">VQE</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Quantum Advantages</h4>
                <div className="space-y-2">
                  {quantumAdvantages.map((advantage, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Zap className="h-3 w-3 text-accent" />
                      <span className="text-sm text-muted-foreground">{advantage}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Convex Optimization Curve */}
      <Card className="glow-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Convex Optimization Curve
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-muted/20 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Atom className="h-16 w-16 text-accent mx-auto mb-4 animate-glow-pulse" />
              <p className="text-muted-foreground">
                Start processing to see optimization curve
              </p>
              <Button className="mt-4 glow">
                Initialize Quantum Process
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}