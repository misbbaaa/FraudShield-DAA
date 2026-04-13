import { Search, Filter } from "lucide-react";

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  statusFilter: string;
  onStatusFilterChange: (s: string) => void;
}

const SearchFilters = ({ searchQuery, onSearchChange, statusFilter, onStatusFilterChange }: Props) => (
  <div className="flex flex-col sm:flex-row gap-3">
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search Transaction ID or User ID..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-input text-foreground text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-colors"
      />
    </div>
    <div className="relative">
      <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value)}
        className="pl-10 pr-8 py-2.5 rounded-lg border border-border bg-input text-foreground text-sm font-mono appearance-none focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
      >
        <option value="all">All Status</option>
        <option value="safe">Safe</option>
        <option value="anomaly">Anomaly</option>
        <option value="review">Review</option>
      </select>
    </div>
  </div>
);

export default SearchFilters;
