import React from 'react';

import Tooltip from '../../../shared/components/tooltip/Tooltip';
import { IProductType } from '../../../shared/types/ProductType';
import { ImageProduct } from '../styles/tooltipImage.styles';

interface ITooltipImageProps {
  product: IProductType;
}

const TooltipImage: React.FC<ITooltipImageProps> = ({ product }: ITooltipImageProps) => {
  return (
    <Tooltip tooltip={<ImageProduct src={product.image} />}>
      <span>{product.id}</span>
    </Tooltip>
  );
};

export default TooltipImage;
