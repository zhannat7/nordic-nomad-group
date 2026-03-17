import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface ApplicationFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  programFilter: string;
  onProgramChange: (value: string) => void;
  programs: string[];
}

const ApplicationFilters = ({
  search, onSearchChange,
  statusFilter, onStatusChange,
  programFilter, onProgramChange,
  programs,
}: ApplicationFiltersProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Name oder E-Mail suchen…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alle Status</SelectItem>
          <SelectItem value="pending">Ausstehend</SelectItem>
          <SelectItem value="approved">Genehmigt</SelectItem>
          <SelectItem value="rejected">Abgelehnt</SelectItem>
        </SelectContent>
      </Select>
      <Select value={programFilter} onValueChange={onProgramChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Programm" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alle Programme</SelectItem>
          {programs.map((p) => (
            <SelectItem key={p} value={p}>{p}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ApplicationFilters;
