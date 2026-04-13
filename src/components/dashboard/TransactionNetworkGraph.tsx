import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Network } from "lucide-react";
import type { Transaction } from "@/data/mockTransactions";

// Build node data from transactions
const buildNodeData = (transactions: Transaction[]) => {
  const userMap = new Map<string, { x: number; y: number; risk: number; id: string }>();
  let idx = 0;
  
  transactions.forEach((t) => {
    [t.userId, t.targetUserId].forEach((uid) => {
      if (!userMap.has(uid)) {
        const angle = (idx * 137.5 * Math.PI) / 180; // golden angle
        const r = 30 + idx * 8;
        userMap.set(uid, {
          id: uid,
          x: 50 + r * Math.cos(angle),
          y: 50 + r * Math.sin(angle),
          risk: t.riskScore,
        });
        idx++;
      }
    });
  });

  return Array.from(userMap.values());
};

interface Props {
  transactions: Transaction[];
}

const TransactionNetworkGraph = ({ transactions }: Props) => {
  const nodes = buildNodeData(transactions);

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Network className="h-5 w-5 text-primary" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
          Transaction Relationships
        </h3>
        <span className="ml-auto text-xs font-mono text-muted-foreground px-2 py-0.5 bg-muted rounded">
          Graph-Based Relation
        </span>
      </div>
      <div className="relative cyber-grid rounded-md overflow-hidden" style={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid stroke="hsl(220 15% 20% / 0.5)" strokeDasharray="3 3" />
            <XAxis type="number" dataKey="x" hide />
            <YAxis type="number" dataKey="y" hide />
            <Tooltip
              cursor={false}
              content={({ payload }) => {
                if (!payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-card border border-border rounded p-2 text-xs font-mono shadow-lg">
                    <div className="text-foreground">{d.id}</div>
                    <div className="text-muted-foreground">Risk: {d.risk}%</div>
                  </div>
                );
              }}
            />
            <Scatter data={nodes} fill="hsl(145 80% 42%)">
              {nodes.map((node, i) => (
                <Cell
                  key={i}
                  fill={node.risk > 70 ? "hsl(0 72% 51%)" : node.risk > 40 ? "hsl(38 92% 50%)" : "hsl(145 80% 42%)"}
                  stroke={node.risk > 70 ? "hsl(0 72% 51% / 0.5)" : "hsl(145 80% 42% / 0.3)"}
                  strokeWidth={2}
                  r={node.risk > 70 ? 8 : 6}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        {/* Circular Fraud label */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 text-xs font-mono text-alert-red bg-alert-red/10 border border-alert-red/20 rounded px-2 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-alert-red animate-pulse-neon" />
          Circular Fraud Detected
        </div>
      </div>
      <div className="flex gap-4 mt-3 text-xs text-muted-foreground font-mono">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-safe-green" /> Safe</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-alert-amber" /> Review</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-alert-red" /> Anomaly</span>
      </div>
    </div>
  );
};

export default TransactionNetworkGraph;
