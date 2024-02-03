import { Tooltip as TooltipAntd } from 'antd';
import { TooltipPropsWithOverlay } from 'antd/es/tooltip';

import { ContainerExternal, ContainerTooltip } from './tooltip.styles';

interface TooltipProps extends TooltipPropsWithOverlay {
  children: React.ReactNode;
  tooltip: React.ReactNode;
}

const Tooltip = ({ children, tooltip, title }: TooltipProps) => {
  if (title) {
    return <TooltipAntd title={title}>{children}</TooltipAntd>;
  }

  return (
    <ContainerTooltip>
      <ContainerExternal>{tooltip}</ContainerExternal>
      {children}
    </ContainerTooltip>
  );
};

export default Tooltip;
