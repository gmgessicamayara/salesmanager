import { formatToBRL } from "app/util/formatCurrency";
import { ChangeEvent, InputHTMLAttributes } from "react";
import { formatCpf } from "app/util/formatCPF";
import { formatPhoneNumber } from "app/util/formatPhoneNumber";
import { formatData } from "app/util/formatDate";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  columnClasses?: string;
  error?: string;
  formatter?: (value: string) => string;
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  columnClasses,
  error,
  formatter,
  onChange,
  ...props
}: InputProps) => {
  const onInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    const formattedValue = (formatter && formatter(value as string)) || value;

    if (onChange) {
      onChange({
        ...event,
        target: {
          ...event.target,
          name,
          value: formattedValue,
        },
      } as ChangeEvent<HTMLInputElement>);
    }
  };
  return (
    <div className={`field column ${columnClasses}`}>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="control">
        <input className="input" id={id} {...props} onChange={onInputChange} />
        {error && <p className="help is-danger">{error}</p>}
      </div>
    </div>
  );
};

export const InputMoney: React.FC<InputProps> = (props: InputProps) => {
  return <Input {...props} formatter={formatToBRL}></Input>;
};

export const InputCPF: React.FC<InputProps> = (props: InputProps) => {
  return <Input {...props} formatter={formatCpf}></Input>;
};

export const InputPhoneNumber: React.FC<InputProps> = (props: InputProps) => {
  return <Input {...props} formatter={formatPhoneNumber}></Input>;
};

export const InputBirthday: React.FC<InputProps> = (props: InputProps) => {
  return <Input {...props} maxLength={10} formatter={formatData}></Input>;
};
