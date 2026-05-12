import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Lead {
  id: string;
  whatsapp: string;
  preferred_days: string | null;
  lang: string | null;
  created_at: string;
}

export default function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setLeads(data as Lead[]);
      setLoading(false);
    })();
  }, []);

  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (leads.length === 0) return <p className="text-sm text-muted-foreground">No leads yet.</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>WhatsApp</TableHead>
          <TableHead>Preferred days</TableHead>
          <TableHead>Lang</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leads.map((l) => (
          <TableRow key={l.id}>
            <TableCell className="font-mono">{l.whatsapp}</TableCell>
            <TableCell>{l.preferred_days ?? "—"}</TableCell>
            <TableCell>{l.lang ?? "—"}</TableCell>
            <TableCell>{new Date(l.created_at).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}