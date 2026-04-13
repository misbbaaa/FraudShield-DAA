import { X, MapPin, Globe, Clock, CreditCard } from "lucide-react";
import type { Transaction } from "@/data/mockTransactions";

interface Props {
  transaction: Transaction | null;
  onClose: () => void;
}

const TransactionDetailsSidebar = ({ transaction, onClose }: Props) => {
  if (!transaction) return null;

  const t = transaction;

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-card border-l border-border shadow-2xl z-50 flex flex-col animate-in slide-in-from-right-5 duration-200">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Risk Breakdown</h3>
          <p className="text-xs font-mono text-muted-foreground mt-0.5">{t.id}</p>
        </div>
        <button onClick={onClose} className="p-1.5 rounded hover:bg-accent transition-colors">
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Overall Risk */}
        <div className="text-center py-4">
          <div className={`text-5xl font-bold font-mono ${
            t.riskScore > 70 ? "text-alert-red glow-text-red" : t.riskScore > 40 ? "text-alert-amber" : "text-safe-green glow-text-green"
          }`}>
            {t.riskScore}%
          </div>
          <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">Overall Risk Score</p>
        </div>

        {/* Risk Bars */}
        <div className="space-y-3">
          {t.riskBreakdown.map((r) => (
            <div key={r.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">{r.label}</span>
                <span className="font-mono text-foreground">{r.score}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    r.score > 70 ? "bg-alert-red" : r.score > 40 ? "bg-alert-amber" : "bg-safe-green"
                  }`}
                  style={{ width: `${r.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Details */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Transaction Details</h4>
          <Detail icon={<CreditCard className="h-3.5 w-3.5" />} label="Type" value={t.type} />
          <Detail icon={<Globe className="h-3.5 w-3.5" />} label="IP Address" value={t.ipAddress} />
          <Detail icon={<MapPin className="h-3.5 w-3.5" />} label="Location" value={t.location} />
          <Detail icon={<Clock className="h-3.5 w-3.5" />} label="Timestamp" value={new Date(t.timestamp).toLocaleString()} />
          <Detail
            icon={<CreditCard className="h-3.5 w-3.5" />}
            label="Amount"
            value={`$${t.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
          />
        </div>
      </div>
    </div>
  );
};

const Detail = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center gap-3 text-xs">
    <span className="text-muted-foreground">{icon}</span>
    <span className="text-muted-foreground w-20">{label}</span>
    <span className="font-mono text-foreground">{value}</span>
  </div>
);

export default TransactionDetailsSidebar;
