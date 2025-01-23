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
    <div className={`w-full flex justify-between text-xs font-medium my-2 ${className}`}>
      <p className={`text-gray-700 ${className} bg-white px-2 rounded-full`}>{label}</p> 
      <p className="w-[100px] truncate text-right">{value}</p>
    </div>
  );
};

export default MetricsLabel;
