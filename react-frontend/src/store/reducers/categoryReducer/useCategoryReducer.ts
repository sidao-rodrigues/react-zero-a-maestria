import { useDispatch } from 'react-redux';

import { ICategoryType } from '../../../shared/types/CategoryType';
import { useAppSelector } from '../../hooks';
import { setCategoriesAction } from '.';

export const useCategoryReducer = () => {
  const dispatch = useDispatch();
  const { categories } = useAppSelector((state) => state.categoryReducer);

  const setCategories = (categories: ICategoryType[]) => {
    dispatch(setCategoriesAction(categories));
  };

  return {
    categories,
    setCategories,
  };
};
