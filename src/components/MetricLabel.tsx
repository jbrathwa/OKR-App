
const MetricsLabel = ({
    label,
    value,
  }: {
    label: string;
    value: number | string;
  }) => {
    return (
      <p className="w-full flex justify-between text-sm my-1">
        <b className="text-gray-700">{label}</b> {value}
      </p>
    );
  };

  export default MetricsLabel;