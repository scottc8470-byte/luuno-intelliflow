import { Brain } from "lucide-react";

export function Quantum() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center space-y-6">
        <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-3xl flex items-center justify-center">
          <Brain className="w-12 h-12 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Quantum Computing
          </h1>
          <p className="text-muted-foreground">
            Advanced quantum processing capabilities coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}