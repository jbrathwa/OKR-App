export default function Input({
  type,
  placeholder,
  onChange,
  className,
}: {
  type: string;
  placeholder: string;
  onChange: (e: any) => any;
  className?: string;
}) {
  return (
    <input
      type={type}
      className={`border focus:outline-none focus:outline-blue-400 rounded-md px-4 py-2 ${className}`}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
