import { Select as SelectAntd, SelectProps as SelectPropsAntd } from 'antd';

import { BoxSelect, TitleSelect } from './select.styles';

interface ISelectProps extends SelectPropsAntd {
  title?: string;
  margin?: string;
}

const Select = ({ title, margin, ...props }: ISelectProps) => {
  return (
    <BoxSelect style={{ margin }}>
      {title && <TitleSelect>{title}</TitleSelect>}
      <SelectAntd style={{ width: '100%' }} {...props} />
    </BoxSelect>
  );
};

export default Select;
