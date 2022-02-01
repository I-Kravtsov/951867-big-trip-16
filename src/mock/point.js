import { getRandomElement, getRandomNumber, getRandomArray} from '../utils/utils';
import { pointTypes, offersSet, destinations } from './data';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

const generatePointType = () => getRandomElement(pointTypes);
const generatePrice = () => getRandomNumber(100, 10000);


const generateDate = () => {
  const maxMinutGap = 6000;
  const minutGap = getRandomNumber(-maxMinutGap, maxMinutGap);
  return dayjs().add(minutGap, 'minute').toISOString();
};

const generateOffers = (type) => {
  for (const offer of offersSet) {
    if (offer.type === type) {
      return getRandomArray(offer.offers) ;
    }
  }
};


export const generatePoint = () => {
  const date = generateDate();
  const offerType = generatePointType();
  return {
    basePrice: generatePrice(),
    dateFrom: date,
    dateTo: dayjs(date).add(getRandomNumber(3, 270) * 10, 'minute').toISOString(),
    destination: destinations[getRandomNumber(0, destinations.length)],
    id: nanoid(),
    isFavorite: Boolean(getRandomNumber(0, 1)),
    type: offerType,
    offers: generateOffers(offerType),
  };
};
