import { useState, useEffect, FC } from 'react';
import { useAppSelector } from '../state/hooks';
import { RootState } from '../state/store';

interface StorageType {
  key: string;
  defaultValue: [];
}

const getStorageValue = (key: string, defaultValue: []) => {
  // getting stored value
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved || '[]');
  return initial || defaultValue;
};

const useLocalStorage = (key: string, defaultValue: []) => {
  const todoItemList = useAppSelector((state: RootState) => state.todos);

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(todoItemList));
  }, [todoItemList]);

  return todoItemList;
};

export default useLocalStorage;
