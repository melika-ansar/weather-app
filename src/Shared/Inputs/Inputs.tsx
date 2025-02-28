interface InputProps {
  label?: string;
  name: string;
  type: string;
  value: string;
  placeholder?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  label,
  type,
  value,
  name,
  placeholder,
  className,
  onChange,
}: InputProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={className}
        onChange={onChange}
      />
    </div>
  );
}
