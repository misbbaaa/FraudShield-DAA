import { useState, useMemo } from "react";
import { Shield } from "lucide-react";
import { transactions } from "@/data/mockTransactions";
import type { Transaction } from "@/data/mockTransactions";
import RiskSummaryTiles from "@/components/dashboard/RiskSummaryTiles";
import TransactionNetworkGraph from "@/components/dashboard/TransactionNetworkGraph";
import AnomalyDetectionTable from "@/components/dashboard/AnomalyDetectionTable";
import TransactionDetailsSidebar from "@/components/dashboard/TransactionDetailsSidebar";
import SearchFilters from "@/components/dashboard/SearchFilters";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch =
        !searchQuery ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.targetUserId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || t.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const anomalies = transactions.filter((t) => t.status === "anomaly").length;
  const avgRisk = Math.round(
    transactions.filter((t) => t.status === "anomaly").reduce((a, t) => a + t.riskScore, 0) / (anomalies || 1)
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <Shield className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-lg font-bold tracking-tight text-foreground">FraudShield</h1>
            <p className="text-xs text-muted-foreground font-mono">Scam Detection & Fraud Analytics</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-neon" />
            <span className="text-xs font-mono text-muted-foreground">LIVE MONITORING</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        <RiskSummaryTiles
          totalTransactions={transactions.length}
          anomalies={anomalies}
          avgRiskScore={avgRisk}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TransactionNetworkGraph transactions={transactions} />
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-semibold uppercase tracking-wider text-foreground">System Alerts</span>
            </div>
            <div className="space-y-2">
              {transactions
                .filter((t) => t.status === "anomaly")
                .map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center gap-3 p-3 rounded border border-alert-red/20 bg-alert-red/5 text-xs cursor-pointer hover:bg-alert-red/10 transition-colors"
                    onClick={() => setSelectedTransaction(t)}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-alert-red animate-pulse-neon" />
                    <span className="font-mono text-foreground">{t.id}</span>
                    <span className="text-muted-foreground">{t.type}</span>
                    <span className="ml-auto font-mono text-alert-red font-semibold">{t.riskScore}%</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <SearchFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        <AnomalyDetectionTable
          transactions={filtered}
          onSelect={setSelectedTransaction}
          selectedId={selectedTransaction?.id ?? null}
        />
      </main>

      {/* Details Sidebar */}
      {selectedTransaction && (
        <>
          <div
            className="fixed inset-0 bg-background/50 backdrop-blur-sm z-40"
            onClick={() => setSelectedTransaction(null)}
          />
          <TransactionDetailsSidebar
            transaction={selectedTransaction}
            onClose={() => setSelectedTransaction(null)}
          />
        </>
      )}
    </div>
  );
};

export default Index;
