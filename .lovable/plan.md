

## Plan: Kontaktformular in den Footer, Google Map als eigene Section

### Übersicht

Die aktuelle Contact Section wird durch eine Google Maps-Einbettung ersetzt. Das Kontaktformular und die Kontaktinformationen (Telefon, Mail, Adresse) wandern in den Footer.

### Änderungen

**1. ContactSection.tsx → MapSection.tsx umbauen**
- Kontaktformular und Kontaktinfos entfernen
- Durch einen eingebetteten Google Maps `<iframe>` ersetzen (Standort: Lillemosevej 6, 4070 Kirke Hyllinge)
- Section-Titel beibehalten (z.B. "Find Us" / übersetzt)
- Responsive: volle Breite, ca. 400-500px Höhe
- `id="contact"` beibehalten für Navigation

**2. Footer.tsx erweitern**
- Kontaktformular (Name, Email, Nachricht, Consent-Checkbox, Submit) in den Footer integrieren
- Kontaktinfos (Telefon, Mail, Adresse) links daneben anzeigen
- Layout: 3-Spalten auf Desktop (Firmeninfo | Kontaktinfos | Formular), gestapelt auf Mobil
- Bestehende Footer-Elemente (Logo, Copyright, Nav-Links, Status, Back-to-top) bleiben erhalten

**3. Index.tsx**
- Import von `ContactSection` durch neuen `MapSection`-Import ersetzen

**4. i18n**
- Ggf. neuen Key für Map-Section-Titel hinzufügen (z.B. `map.title`)

### Technische Details

- Google Maps Embed: kostenloser `<iframe>` mit `maps.google.com/maps?q=...&output=embed` — kein API-Key nötig
- Formular-State (`submitted`) wandert in den Footer
- Bestehende i18n-Keys für Kontaktformular werden wiederverwendet

