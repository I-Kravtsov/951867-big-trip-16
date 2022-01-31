const getRandomNumber = (from, to, precission) => {
  const getRandom = (min, max, decimal) => {
    const number = min + Math.random() * (max - min) ;
    return !decimal ?  Math.round(number) : number.toFixed(decimal);
  };
  return (from < to) ? getRandom(from, to, precission) : getRandom (to, from, precission);
};

const getRandomElement = (array) => {
  const randomElement = array[getRandomNumber(0, (array.length -1))];
  return randomElement;
};

const getRandomArray = (array) => {
  const randomArray = [];
  for (let i = 0; i < array.length; i++) {
    const element = getRandomElement(array);
    if (randomArray.includes(element)) {
      continue;
    }
    randomArray.push(element);
  }
  return randomArray;
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export {getRandomElement, getRandomNumber, getRandomArray, updateItem};
