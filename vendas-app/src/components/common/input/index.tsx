import { formatToBRL } from 'app/util/currency';
import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  onChange?: (value) => void;
  label: string;
  columnClasses?: string;
  currency?: boolean;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  currency,
  onChange,
  label,
  columnClasses,
  error,
  ...props
}: InputProps) => {
  const onInputChange = (event) => {
    let value = event.target.value;

    if (value && currency) {
      value = formatToBRL(value);
    }
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={`field column ${columnClasses}`}>
      <label className='label' htmlFor={id}>
        {label}
      </label>
      <div className='control'>
        <input className='input' id={id} {...props} onChange={onInputChange} />
        {error && <p className='help is-danger'>{error}</p>}
      </div>
    </div>
  );
};
