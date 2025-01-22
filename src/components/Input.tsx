export default function Input({
  type,
  placeholder,
  onChange,
  className,
  value
}: {
  type: string;
  placeholder: string;
  onChange: (e: any) => any;
  className?: string;
  value: string | number
}) {
  return (
    <input
    value={value}
      type={type}
      className={`border focus:outline-none focus:outline-blue-400 rounded-md px-4 py-2 ${className}`}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
