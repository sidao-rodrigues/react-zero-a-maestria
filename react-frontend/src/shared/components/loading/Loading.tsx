import { Spin, SpinProps } from 'antd';

const Loading: React.FC<SpinProps> = ({ ...props }: SpinProps) => {
  return <Spin {...props} />;
};

export default Loading;
