import { useState } from 'react';

export const useInsertCategory = () => {
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const insertCategory = () => {
    setLoading(true);
  };

  const handleOnChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return {
    name,
    handleOnChangeName,
    insertCategory,
    loading,
  };
};
