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
    <p className={`w-full flex justify-between text-xs font-medium my-2 ${className}`}>
      <p className={`text-gray-700 ${className} bg-gray-200 px-2 rounded-full`}>{label}</p> 
      <p className="w-[100px] truncate text-right">{value}</p>
    </p>
  );
};

export default MetricsLabel;
