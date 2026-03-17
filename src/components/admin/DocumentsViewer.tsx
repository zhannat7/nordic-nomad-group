import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileText, Download, X } from 'lucide-react';
import type { Application } from './ApplicationsTable';

interface DocumentsViewerProps {
  application: Application | null;
  open: boolean;
  onClose: () => void;
}

interface DocFile {
  name: string;
  created_at: string;
}

const DocumentsViewer = ({ application, open, onClose }: DocumentsViewerProps) => {
  const [files, setFiles] = useState<DocFile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!application || !open) return;
    setLoading(true);
    supabase.storage
      .from('documents')
      .list(application.user_id, { limit: 100 })
      .then(({ data }) => {
        setFiles((data ?? []).map((f) => ({ name: f.name, created_at: f.created_at ?? '' })));
        setLoading(false);
      });
  }, [application, open]);

  const handleDownload = async (fileName: string) => {
    if (!application) return;
    const { data } = await supabase.storage
      .from('documents')
      .createSignedUrl(`${application.user_id}/${fileName}`, 300);
    if (data?.signedUrl) {
      window.open(data.signedUrl, '_blank');
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Dokumente — {application?.full_name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {loading && <p className="text-sm text-muted-foreground">Laden…</p>}
          {!loading && files.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">Keine Dokumente vorhanden.</p>
          )}
          {files.map((file) => (
            <Card key={file.name} className="flex items-center justify-between p-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{file.name}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleDownload(file.name)}>
                <Download className="h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentsViewer;
