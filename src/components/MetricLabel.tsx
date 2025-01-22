const MetricsLabel = ({
  label,
  value,
  className
}: {
  label: string;
  value: number | string;
  className?: string;
}) => {
  return (
    <p className={`w-full flex justify-between text-sm my-1 ${className}`}>
      <b className={`text-gray-700 ${className}`}>{label}</b> {value}
    </p>
  );
};

export default MetricsLabel;
