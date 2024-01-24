import { Input as InputAntd, InputProps as InputPropsAntd } from 'antd';

import { BoxInput, TitleInput } from './input.styles';

interface InputProps extends InputPropsAntd {
  //InputHTMLAttributes<HTMLInputElement> {
  //extende todas as funções do component input do html (existe dessa forma comentada)
  title?: string;
  margin?: string;
}

const Input = ({ title, margin, ...props }: InputProps) => {
  return (
    <BoxInput style={{ margin }}>
      {title && <TitleInput>{title}</TitleInput>}
      <InputAntd {...props} />
    </BoxInput>
  );
};

export default Input;
