import { Tag } from 'antd';
import React from 'react';

import { CategoryType } from '../../../shared/types/CategoryType';

interface ICategoryColumnsProps {
  category?: CategoryType;
}

const colors: string[] = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];

const CategoryColumn: React.FC<ICategoryColumnsProps> = ({ category }: ICategoryColumnsProps) => {
  if (!category) {
    return null;
  }
  const currentColor = colors[category.id - 1] || colors[0];

  return <Tag color={currentColor}>{category.name}</Tag>;
};

export default CategoryColumn;
