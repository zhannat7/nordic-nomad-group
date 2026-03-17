import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileText, Download, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
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

interface ViewRecord {
  file_name: string;
  viewed_at: string;
}

const DocumentsViewer = ({ application, open, onClose }: DocumentsViewerProps) => {
  const { user } = useAuth();
  const [files, setFiles] = useState<DocFile[]>([]);
  const [views, setViews] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewName, setPreviewName] = useState('');

  useEffect(() => {
    if (!application || !open) return;
    setLoading(true);
    setPreviewUrl(null);

    const fetchData = async () => {
      const [filesRes, viewsRes] = await Promise.all([
        supabase.storage.from('documents').list(application.user_id, { limit: 100 }),
        supabase.from('document_views').select('file_name, viewed_at').eq('application_id', application.id),
      ]);

      setFiles((filesRes.data ?? []).map((f) => ({ name: f.name, created_at: f.created_at ?? '' })));

      const viewMap: Record<string, string> = {};
      (viewsRes.data ?? []).forEach((v: ViewRecord) => {
        viewMap[v.file_name] = v.viewed_at;
      });
      setViews(viewMap);
      setLoading(false);
    };

    fetchData();
  }, [application, open]);

  const markViewed = async (fileName: string) => {
    if (!application || !user) return;
    const now = new Date().toISOString();
    await supabase.from('document_views').upsert(
      { application_id: application.id, admin_id: user.id, file_name: fileName, viewed_at: now },
      { onConflict: 'application_id,admin_id,file_name' }
    );
    setViews((prev) => ({ ...prev, [fileName]: now }));
  };

  const getFullSignedUrl = (signedUrl: string) => {
    if (signedUrl.startsWith('http')) return signedUrl;
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    return `${supabaseUrl}/storage/v1${signedUrl}`;
  };

  const handlePreview = async (fileName: string) => {
    if (!application) return;
    const { data } = await supabase.storage
      .from('documents')
      .createSignedUrl(`${application.user_id}/${fileName}`, 3600);
    if (data?.signedUrl) {
      const fullUrl = getFullSignedUrl(data.signedUrl);
      setPreviewUrl(fullUrl);
      setPreviewName(fileName);
      await markViewed(fileName);
    }
  };

  const handleDownload = async (fileName: string) => {
    if (!application) return;
    const { data } = await supabase.storage
      .from('documents')
      .createSignedUrl(`${application.user_id}/${fileName}`, 3600);
    if (data?.signedUrl) {
      const a = document.createElement('a');
      a.href = data.signedUrl;
      a.download = fileName;
      a.click();
      await markViewed(fileName);
    }
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {previewUrl && (
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setPreviewUrl(null)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            {previewUrl ? previewName : `Dokumente — ${application?.full_name}`}
          </DialogTitle>
        </DialogHeader>

        {previewUrl ? (
          <div className="flex-1 min-h-[60vh] flex flex-col gap-2">
            <iframe
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(previewUrl)}&embedded=true`}
              className="h-full w-full rounded border border-border flex-1 min-h-[55vh]"
              title={previewName}
            />
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={() => handleDownload(previewName)}>
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {loading && <p className="text-sm text-muted-foreground">Laden…</p>}
            {!loading && files.length === 0 && (
              <p className="py-6 text-center text-sm text-muted-foreground">Keine Dokumente vorhanden.</p>
            )}
            {files.map((file) => {
              const viewedAt = views[file.name];
              return (
                <div key={file.name} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {viewedAt ? (
                          <span className="text-primary">✅ Gesehen — {formatDate(viewedAt)}</span>
                        ) : (
                          <span className="text-amber-500">👁 Nicht gesehen</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" title="Vorschau" onClick={() => handlePreview(file.name)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Download" onClick={() => handleDownload(file.name)}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DocumentsViewer;
