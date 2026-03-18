import { useState, useEffect } from 'react';
import { differenceInYears } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import { User, MapPin, Languages, PawPrint } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface InternCardProps {
  intern: {
    id: string;
    full_name: string;
    date_of_birth: string | null;
    english_level: string | null;
    animals: string | null;
    agriculture_interest: string | null;
    user_id: string;
  };
  selected: boolean;
  onToggle: (id: string) => void;
}

const InternCard = ({ intern, selected, onToggle }: InternCardProps) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      // Try common image extensions
      for (const ext of ['jpg', 'jpeg', 'png', 'webp']) {
        const { data } = supabase.storage
          .from('documents')
          .getPublicUrl(`${intern.user_id}/profile_photo.${ext}`);
        if (data?.publicUrl) {
          // Check if exists by trying to fetch
          try {
            const res = await fetch(data.publicUrl, { method: 'HEAD' });
            if (res.ok) {
              setPhotoUrl(data.publicUrl);
              return;
            }
          } catch {}
        }
      }
    };
    fetchPhoto();
  }, [intern.user_id]);

  const age = intern.date_of_birth
    ? differenceInYears(new Date(), new Date(intern.date_of_birth))
    : null;

  return (
    <div
      className={`relative rounded-xl border bg-card p-5 transition-all duration-200 ${
        selected
          ? 'border-primary ring-2 ring-primary/20 shadow-md'
          : 'border-border hover:border-primary/30 hover:shadow-sm'
      }`}
    >
      {/* Checkbox */}
      <div className="absolute top-4 right-4">
        <Checkbox
          checked={selected}
          onCheckedChange={() => onToggle(intern.id)}
          className="h-5 w-5"
        />
      </div>

      {/* Photo */}
      <div className="mb-4 flex justify-center">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={intern.full_name}
            className="h-24 w-24 rounded-full object-cover border-2 border-muted"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <User className="h-10 w-10 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Name */}
      <h3 className="text-center font-display text-lg text-foreground">
        {intern.full_name}
      </h3>

      {/* Details */}
      <div className="mt-3 space-y-2 text-sm text-muted-foreground">
        {age !== null && (
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 shrink-0" />
            <span>{age} years old</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0" />
          <span>Kyrgyzstan</span>
        </div>

        {intern.english_level && (
          <div className="flex items-center gap-2">
            <Languages className="h-4 w-4 shrink-0" />
            <span>English: {intern.english_level}</span>
          </div>
        )}

        {intern.animals && (
          <div className="flex items-center gap-2">
            <PawPrint className="h-4 w-4 shrink-0" />
            <span>{intern.animals}</span>
          </div>
        )}
      </div>

      {/* Agriculture interest */}
      {intern.agriculture_interest && (
        <p className="mt-3 text-sm italic text-muted-foreground leading-relaxed border-t border-border pt-3">
          "{intern.agriculture_interest}"
        </p>
      )}
    </div>
  );
};

export default InternCard;
