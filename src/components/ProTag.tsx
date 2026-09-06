/** Small sand pill marking a control that belongs to Pranayama Pro. */
const ProTag = ({ className = '' }: { className?: string }) => (
  <span
    className={`inline-flex items-center rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-sans font-semibold uppercase tracking-wider text-primary ${className}`}
  >
    Pro
  </span>
);

export default ProTag;
