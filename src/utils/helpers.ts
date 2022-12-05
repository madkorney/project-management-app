import { TasksSetType } from 'types';

export const isEqualArrays = (firstArray: TasksSetType, secondArray: TasksSetType) => {
  return (
    firstArray.length === firstArray.length &&
    firstArray.every((task, index) => task === secondArray[index])
  );
};
