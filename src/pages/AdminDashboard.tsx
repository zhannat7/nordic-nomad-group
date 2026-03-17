import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import StatsOverview from '@/components/admin/StatsOverview';
import ApplicationFilters from '@/components/admin/ApplicationFilters';
import ApplicationsTable, { type Application } from '@/components/admin/ApplicationsTable';
import DocumentsViewer from '@/components/admin/DocumentsViewer';

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [programFilter, setProgramFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [docsOpen, setDocsOpen] = useState(false);

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setApplications(data as Application[]);
    setLoading(false);
  };

  useEffect(() => { fetchApplications(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('applications')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (error) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: status === 'approved' ? 'Genehmigt' : 'Abgelehnt' });
      fetchApplications();
    }
  };

  const addComment = async (appId: string, comment: string) => {
    const { error } = await supabase
      .from('application_comments')
      .insert({ application_id: appId, admin_id: user!.id, comment });
    if (error) {
      toast({ title: 'Fehler', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Kommentar gespeichert' });
    }
  };

  const programs = useMemo(() => [...new Set(applications.map((a) => a.program))], [applications]);

  const filtered = useMemo(() => {
    return applications.filter((a) => {
      const matchSearch = !search || a.full_name.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || a.status === statusFilter;
      const matchProgram = programFilter === 'all' || a.program === programFilter;
      return matchSearch && matchStatus && matchProgram;
    });
  }, [applications, search, statusFilter, programFilter]);

  const stats = useMemo(() => ({
    total: applications.length,
    pending: applications.filter((a) => a.status === 'pending').length,
    approved: applications.filter((a) => a.status === 'approved').length,
    rejected: applications.filter((a) => a.status === 'rejected').length,
  }), [applications]);

  const handleViewProfile = (app: Application) => {
    setSelectedApp(app);
    setDocsOpen(true);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-xl font-semibold text-foreground font-sans">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" /> Abmelden
            </Button>
          </div>
        </div>
      </header>

      <main className="container space-y-6 py-8">
        <StatsOverview {...stats} />

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground font-sans">Bewerbungen</h2>
          <ApplicationFilters
            search={search}
            onSearchChange={setSearch}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            programFilter={programFilter}
            onProgramChange={setProgramFilter}
            programs={programs}
          />
          {loading ? (
            <p className="py-8 text-center text-muted-foreground">Laden…</p>
          ) : (
            <ApplicationsTable
              applications={filtered}
              onApprove={(id) => updateStatus(id, 'approved')}
              onReject={(id) => updateStatus(id, 'rejected')}
              onComment={addComment}
              onViewProfile={handleViewProfile}
            />
          )}
        </div>
      </main>

      <DocumentsViewer application={selectedApp} open={docsOpen} onClose={() => setDocsOpen(false)} />
    </div>
  );
};

export default AdminDashboard;
