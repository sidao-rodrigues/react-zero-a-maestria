import { useDispatch } from 'react-redux';

import { ICategoryType } from '../../../shared/types/CategoryType';
import { useAppSelector } from '../../hooks';
import { setCategoriesAction, setCategoryAction } from '.';

export const useCategoryReducer = () => {
  const dispatch = useDispatch();
  const { categories, category } = useAppSelector((state) => state.categoryReducer);

  const setCategories = (categories: ICategoryType[]) => {
    dispatch(setCategoriesAction(categories));
  };

  const setCategory = (category?: ICategoryType) => {
    dispatch(setCategoryAction(category));
  };

  return {
    category,
    categories,
    setCategory,
    setCategories,
  };
};
