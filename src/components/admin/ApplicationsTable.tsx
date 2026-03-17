import { useState } from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Eye, CheckCircle, XCircle, MessageSquare } from 'lucide-react';

export interface Application {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  program: string;
  status: string;
  created_at: string;
}

interface ApplicationsTableProps {
  applications: Application[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onComment: (id: string, comment: string) => void;
  onViewProfile: (app: Application) => void;
}

const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  pending: { label: 'Ausstehend', variant: 'outline' },
  approved: { label: 'Genehmigt', variant: 'default' },
  rejected: { label: 'Abgelehnt', variant: 'destructive' },
};

const ApplicationsTable = ({ applications, onApprove, onReject, onComment, onViewProfile }: ApplicationsTableProps) => {
  const [commentDialog, setCommentDialog] = useState<{ open: boolean; appId: string }>({ open: false, appId: '' });
  const [commentText, setCommentText] = useState('');

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      onComment(commentDialog.appId, commentText.trim());
      setCommentText('');
      setCommentDialog({ open: false, appId: '' });
    }
  };

  if (applications.length === 0) {
    return <p className="py-8 text-center text-muted-foreground">Keine Bewerbungen gefunden.</p>;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>E-Mail</TableHead>
            <TableHead>Programm</TableHead>
            <TableHead>Datum</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Aktionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => {
            const s = statusMap[app.status] ?? statusMap.pending;
            return (
              <TableRow key={app.id}>
                <TableCell className="font-medium">{app.full_name}</TableCell>
                <TableCell>{app.email}</TableCell>
                <TableCell>{app.program}</TableCell>
                <TableCell>{format(new Date(app.created_at), 'dd.MM.yyyy', { locale: de })}</TableCell>
                <TableCell>
                  <Badge variant={s.variant}>{s.label}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" title="Profil ansehen" onClick={() => onViewProfile(app)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Genehmigen" onClick={() => onApprove(app.id)} disabled={app.status === 'approved'}>
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Ablehnen" onClick={() => onReject(app.id)} disabled={app.status === 'rejected'}>
                      <XCircle className="h-4 w-4 text-destructive" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Kommentar" onClick={() => setCommentDialog({ open: true, appId: app.id })}>
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Dialog open={commentDialog.open} onOpenChange={(open) => setCommentDialog({ open, appId: open ? commentDialog.appId : '' })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kommentar hinzufügen</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Kommentar eingeben…"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setCommentDialog({ open: false, appId: '' })}>Abbrechen</Button>
            <Button onClick={handleSubmitComment} disabled={!commentText.trim()}>Speichern</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApplicationsTable;
