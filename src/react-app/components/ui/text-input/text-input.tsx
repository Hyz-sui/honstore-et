import styles from "./text-input.module.css";

export const TextInput = ({
  label,
  value,
  name,
  hasFloatingLabel = true,
  onChange,
  labelClassName,
  inputClassName,
  labelTextClassName,
  inputRef,
}: {
  label: string;
  value: string;
  name: string;
  hasFloatingLabel?: boolean;
  onChange?: (value: string) => void;
  labelClassName?: string;
  inputClassName?: string;
  labelTextClassName?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <label className={[styles.label, labelClassName].filter(Boolean).join(" ")}>
      <div className={[
        styles.labelText,
        hasFloatingLabel ? styles.floatingLabel : "",
        labelTextClassName
      ].filter(Boolean).join(" ")}>
        {label}
      </div>
      <input
        ref={inputRef}
        type="search"
        placeholder=" "
        className={[
          styles.input,
          inputClassName
        ].filter(Boolean).join(" ")}
        value={value}
        onChange={handleChange}
        name={name}
      />
    </label>
  );
}
