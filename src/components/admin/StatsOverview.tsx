import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Clock, CheckCircle, XCircle } from 'lucide-react';

interface StatsOverviewProps {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

const StatsOverview = ({ total, pending, approved, rejected }: StatsOverviewProps) => {
  const stats = [
    { label: 'Praktikanten gesamt', value: total, icon: Users, color: 'text-primary' },
    { label: 'Ausstehend', value: pending, icon: Clock, color: 'text-amber-500' },
    { label: 'Genehmigt', value: approved, icon: CheckCircle, color: 'text-emerald-500' },
    { label: 'Abgelehnt', value: rejected, icon: XCircle, color: 'text-destructive' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsOverview;
