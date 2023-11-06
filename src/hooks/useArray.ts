import  { useState, useCallback } from 'react';

const useArray = <T extends {id : number}>(initialArray: T[] = []) => {
  const [state, setState] = useState(initialArray);

  const updateById = useCallback((id: number, newData: T) => {
    setState((prevArray) =>
      prevArray.map((item) => (item.id === id ? { ...item, ...newData } : item))
    );
  }, []);

  const deleteById = useCallback((id: number) => {
    setState((prevArray) => prevArray.filter((item) => item.id !== id));
  }, []);

  const push = useCallback((newItem: T) => {
    setState((prevArray) => [...prevArray, newItem]);
  }, []);

  return { state, updateById, deleteById, push };
};

export default useArray;
