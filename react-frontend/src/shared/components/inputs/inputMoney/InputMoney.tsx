import { useEffect, useState } from 'react';

import Input, { IInputProps } from '../input/input';

interface IInputMoneyProps extends IInputProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addonBefore?: string;
  decimalSize?: number;
}

const InputMoney: React.FC<IInputMoneyProps> = ({
  value,
  onChange,
  addonBefore = 'R$',
  decimalSize = 2,
  ...props
}: IInputMoneyProps) => {
  const [currentValue, setCurrentValue] = useState<string>(`${value}`);

  useEffect(() => {
    const valueString: string = `${value}`;

    if (!/\D/.test(valueString.replace('.', ''))) {
      setCurrentValue(value.toFixed(decimalSize).toString().replace('.', ','));
    }
  }, [value]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const valueRemoved: string = event.target.value.replace(',', '');

    const sizeSlice: number = valueRemoved.length - decimalSize;
    const newValue: string = [
      valueRemoved.slice(0, sizeSlice),
      '.',
      valueRemoved.slice(sizeSlice),
    ].join('');

    onChange({
      ...event,
      target: {
        ...event.target,
        value: newValue,
      },
    });
  };

  return (
    <Input addonBefore={addonBefore} value={currentValue} onChange={handleOnChange} {...props} />
  );
};

export default InputMoney;
