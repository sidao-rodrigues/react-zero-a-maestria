import { Tooltip } from 'antd';
import React from 'react';

import { IProductType } from '../../../shared/types/ProductType';

interface ITooltipImageProps {
  product: IProductType;
}

const TooltipImage: React.FC<ITooltipImageProps> = ({ product }: ITooltipImageProps) => {
  return (
    <Tooltip title={product.name} placement="left">
      <span>{product.id}</span>
    </Tooltip>
  );
};

export default TooltipImage;
