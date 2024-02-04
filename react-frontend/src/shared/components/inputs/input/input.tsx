import { Input as InputAntd, InputProps as InputPropsAntd } from 'antd';

import { BoxInput, TitleInput } from './input.styles';

export interface IInputProps extends InputPropsAntd {
  //InputHTMLAttributes<HTMLInputElement> {
  //extende todas as funções do component input do html (existe dessa forma comentada)
  title?: string;
  margin?: string;
}

const Input = ({ title, margin, ...props }: IInputProps) => {
  return (
    <BoxInput style={{ margin }}>
      {title && <TitleInput>{title}</TitleInput>}
      <InputAntd {...props} />
    </BoxInput>
  );
};

export default Input;
