import { getRandomElement, getRandomNumber, getRandomArray} from '../utils/utils';
import { pointTypes, cities, offersSet } from './data';
import { LoremIpsum } from 'lorem-ipsum';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';


const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

const generatePointType = () => getRandomElement(pointTypes);
const generatePrice = () => getRandomNumber(100, 10000);
const generatePictures = () => {
  const isPictures = Boolean(getRandomNumber(0,1));
  if (!isPictures) {
    return null;
  }
  const generatePicture = () => ({
    src:  `http://picsum.photos/300/200?r=${Math.random()}`,
    description: lorem.generateSentences(1),
  });
  return Array.from({length: getRandomNumber(0, 5)}, generatePicture);
};

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
    destination: {
      description: getRandomNumber(0, 1) ? null : lorem.generateSentences(getRandomNumber(0, 5)),
      name: getRandomElement(cities),
      pictures: generatePictures(),
    },
    id: nanoid(),
    isFavorite: Boolean(getRandomNumber(0, 1)),
    type: offerType,
    offers: generateOffers(offerType),
  };
};
