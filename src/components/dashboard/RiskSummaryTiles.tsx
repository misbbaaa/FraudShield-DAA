import { Shield, Activity, AlertTriangle } from "lucide-react";

interface TileProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtext: string;
  variant: "default" | "alert" | "warning";
}

const variantStyles = {
  default: "border-primary/30 glow-green",
  alert: "border-alert-red/30 glow-red",
  warning: "border-alert-amber/30",
};

const Tile = ({ icon, label, value, subtext, variant }: TileProps) => (
  <div className={`rounded-lg border bg-card p-6 transition-all hover:scale-[1.02] ${variantStyles[variant]}`}>
    <div className="flex items-center gap-3 mb-4">
      {icon}
      <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
    </div>
    <div className="text-3xl font-bold font-mono tracking-tight text-foreground">{value}</div>
    <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
  </div>
);

interface RiskSummaryTilesProps {
  totalTransactions: number;
  anomalies: number;
  avgRiskScore: number;
}

const RiskSummaryTiles = ({ totalTransactions, anomalies, avgRiskScore }: RiskSummaryTilesProps) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <Tile
      icon={<Shield className="h-5 w-5 text-primary" />}
      label="Total Transactions"
      value={totalTransactions.toLocaleString()}
      subtext="Processed in last 24h"
      variant="default"
    />
    <Tile
      icon={<AlertTriangle className="h-5 w-5 text-alert-red" />}
      label="Anomalies Detected"
      value={anomalies}
      subtext="Flagged by Greedy Thresholding"
      variant="alert"
    />
    <Tile
      icon={<Activity className="h-5 w-5 text-alert-amber" />}
      label="Avg Risk Score"
      value={`${avgRiskScore}%`}
      subtext="Across all flagged transactions"
      variant="warning"
    />
  </div>
);

export default RiskSummaryTiles;
