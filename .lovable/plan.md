

## Plan: Reduce Hero Section Height to 130px

### Change
In `src/components/HeroSection.tsx`, update the section's min-height and reduce padding to fit within 130px:

- Change `min-h-[250px] md:min-h-[300px]` → `min-h-[130px]` (fixed on all screens)
- Reduce padding to `py-3 md:py-4`
- Hide the stats row (the 50+, 2+, 100% bar) since it won't fit in 130px
- Reduce heading size and margins to keep text readable in the compact space
- Hide the subtitle text on smaller screens if needed

### Files Modified
- `src/components/HeroSection.tsx`

