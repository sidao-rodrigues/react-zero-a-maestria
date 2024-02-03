import { Tag } from 'antd';
import React from 'react';

import { ICategoryType } from '../../../shared/types/CategoryType';

interface ICategoryColumnsProps {
  category?: ICategoryType;
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
