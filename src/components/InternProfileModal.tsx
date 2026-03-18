import { useState, useEffect } from 'react';
import { differenceInYears } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { User, MapPin, Languages, PawPrint, Sprout } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface InternProfileModalProps {
  intern: {
    id: string;
    full_name: string;
    date_of_birth: string | null;
    english_level: string | null;
    animals: string | null;
    agriculture_interest: string | null;
    user_id: string;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected: boolean;
  onToggle: (id: string) => void;
}

const InternProfileModal = ({ intern, open, onOpenChange, selected, onToggle }: InternProfileModalProps) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!intern) return;
    setPhotoUrl(null);
    const fetchPhoto = async () => {
      for (const ext of ['jpg', 'jpeg', 'png', 'webp']) {
        const { data } = supabase.storage
          .from('documents')
          .getPublicUrl(`${intern.user_id}/profile_photo.${ext}`);
        if (data?.publicUrl) {
          try {
            const res = await fetch(data.publicUrl, { method: 'HEAD' });
            if (res.ok) { setPhotoUrl(data.publicUrl); return; }
          } catch {}
        }
      }
    };
    fetchPhoto();
  }, [intern?.user_id]);

  if (!intern) return null;

  const age = intern.date_of_birth
    ? differenceInYears(new Date(), new Date(intern.date_of_birth))
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="sr-only">{intern.full_name}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-5">
          {/* Photo */}
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={intern.full_name}
              className="h-32 w-32 rounded-full object-cover border-2 border-muted"
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-muted">
              <User className="h-14 w-14 text-muted-foreground" />
            </div>
          )}

          {/* Name */}
          <h2 className="font-display text-xl text-foreground">{intern.full_name}</h2>

          {/* Details */}
          <div className="w-full space-y-3 text-sm text-muted-foreground">
            {age !== null && (
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 shrink-0 text-primary" />
                <span>{age} years old</span>
              </div>
            )}

            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />
              <span>Kyrgyzstan</span>
            </div>

            {intern.english_level && (
              <div className="flex items-center gap-3">
                <Languages className="h-4 w-4 shrink-0 text-primary" />
                <span>English: {intern.english_level}</span>
              </div>
            )}

            {intern.animals && (
              <div className="flex items-center gap-3">
                <PawPrint className="h-4 w-4 shrink-0 text-primary" />
                <span>{intern.animals}</span>
              </div>
            )}

            {intern.agriculture_interest && (
              <div className="flex items-start gap-3 border-t border-border pt-3">
                <Sprout className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                <p className="italic leading-relaxed">"{intern.agriculture_interest}"</p>
              </div>
            )}
          </div>

          {/* Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer self-start mt-2">
            <Checkbox
              checked={selected}
              onCheckedChange={() => onToggle(intern.id)}
              className="h-5 w-5"
            />
            <span className="text-sm font-medium text-foreground">
              {selected ? 'Selected' : 'Select this intern'}
            </span>
          </label>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InternProfileModal;
