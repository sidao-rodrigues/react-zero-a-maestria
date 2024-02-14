import { Input as InputAntd, InputProps as InputPropsAntd } from 'antd';

import { InputTestIdEnum } from '../__tests__/inputTestIdEnum';
import { BoxInput, TitleInput } from './input.styles';

export interface IInputProps extends InputPropsAntd {
  //InputHTMLAttributes<HTMLInputElement> {
  //extende todas as funções do component input do html (existe dessa forma comentada)
  title?: string;
  margin?: string;
}

const Input = ({ title, margin, ...props }: IInputProps) => {
  return (
    <BoxInput data-testid={InputTestIdEnum.BOX_INPUT} style={{ margin }}>
      {title && <TitleInput data-testid={InputTestIdEnum.INPUT_TITLE}>{title}</TitleInput>}
      <InputAntd {...props} />
    </BoxInput>
  );
};

export default Input;
