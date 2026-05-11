interface SectionHeaderProps {
  label: string;
  marker: string;
}

export default function SectionHeader({ label, marker }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="section-label font-manrope font-medium text-xs uppercase tracking-[0.08em] text-accent-blue">
        {label}
      </span>
      <span className="section-marker font-manrope font-medium text-xs tracking-[0.08em] text-accent-blue">
        ({marker})
      </span>
    </div>
  );
}
