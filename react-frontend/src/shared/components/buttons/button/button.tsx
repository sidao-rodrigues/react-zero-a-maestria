import { ButtonProps } from 'antd';

import { ButtonAntd } from './button.styles';

interface IButtonCurrentProps extends ButtonProps {
  margin?: string;
}

const Button = ({ margin, ...props }: IButtonCurrentProps) => {
  return <ButtonAntd style={{ margin }} {...props} />;
};

export default Button;
