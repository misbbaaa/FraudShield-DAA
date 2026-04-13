import { Activity } from "lucide-react";
import type { Transaction } from "@/data/mockTransactions";

const statusConfig = {
  safe: { label: "Safe", className: "bg-safe-green/15 text-safe-green border-safe-green/30" },
  anomaly: { label: "Anomaly", className: "bg-alert-red/15 text-alert-red border-alert-red/30" },
  review: { label: "Review", className: "bg-alert-amber/15 text-alert-amber border-alert-amber/30" },
};

interface Props {
  transactions: Transaction[];
  onSelect: (t: Transaction) => void;
  selectedId: string | null;
}

const AnomalyDetectionTable = ({ transactions, onSelect, selectedId }: Props) => (
  <div className="rounded-lg border border-border bg-card">
    <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
      <Activity className="h-5 w-5 text-primary" />
      <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
        Anomaly Detection Feed
      </h3>
      <span className="ml-auto text-xs font-mono text-muted-foreground">
        {transactions.length} records
      </span>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
            <th className="text-left px-5 py-3 font-medium">TX ID</th>
            <th className="text-left px-3 py-3 font-medium">From</th>
            <th className="text-left px-3 py-3 font-medium">To</th>
            <th className="text-right px-3 py-3 font-medium">Amount</th>
            <th className="text-center px-3 py-3 font-medium">Risk</th>
            <th className="text-center px-3 py-3 font-medium">Status</th>
            <th className="text-left px-5 py-3 font-medium">Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => {
            const s = statusConfig[t.status];
            const isSelected = t.id === selectedId;
            return (
              <tr
                key={t.id}
                onClick={() => onSelect(t)}
                className={`border-b border-border/50 cursor-pointer transition-colors hover:bg-accent/50 ${
                  isSelected ? "bg-accent/70" : ""
                }`}
              >
                <td className="px-5 py-3 font-mono text-xs text-foreground">{t.id}</td>
                <td className="px-3 py-3 font-mono text-xs text-muted-foreground">{t.userId}</td>
                <td className="px-3 py-3 font-mono text-xs text-muted-foreground">{t.targetUserId}</td>
                <td className="px-3 py-3 text-right font-mono text-xs text-foreground">
                  ${t.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </td>
                <td className="px-3 py-3 text-center">
                  <span className={`inline-block font-mono text-xs font-semibold ${
                    t.riskScore > 70 ? "text-alert-red glow-text-red" : t.riskScore > 40 ? "text-alert-amber" : "text-safe-green"
                  }`}>
                    {t.riskScore}%
                  </span>
                </td>
                <td className="px-3 py-3 text-center">
                  <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded border ${s.className}`}>
                    {s.label}
                  </span>
                </td>
                <td className="px-5 py-3 text-xs text-muted-foreground">
                  {new Date(t.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default AnomalyDetectionTable;
