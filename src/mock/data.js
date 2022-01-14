import { nanoid } from 'nanoid';
export const pointTypes = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const citiesNames = 'Абаза, Абакан, Абдулино, Абинск, Агидель, Агрыз, Адыгейск, Азнакаево, Азов, Ак-Довурак, Аксай, Алагир, Алапаевск, Алатырь, Алдан, Алейск, Александров, Александровск, Александровск-Сахалинский, Алексеевка, Алексин, Алзамай, Алупка, Алушта, Альметьевск, Амурск, Анадырь, Анапа, Ангарск, Андреаполь, Анжеро-Судженск, Анива, Апатиты, Апрелевка, Апшеронск, Арамиль, Аргун, Ардатов, Ардон, Арзамас, Аркадак, Армавир, Армянск, Арсеньев, Арск, Артём, Артёмовск, Артёмовский, Архангельск, Асбест, Асино, Астрахань, Аткарск, Ахтубинск, Ачинск, Аша';
export const cities = citiesNames.split(', ');

export const offersSet = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': nanoid(),
        'title': 'Upgrade to a business class',
        'price': 120
      },
      {
        'id': nanoid(),
        'title': 'Choose the radio station',
        'price': 60
      },
      {
        'id': nanoid(),
        'title': 'Order Uber',
        'price': 20
      }
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': nanoid(),
        'title': 'Add luggage',
        'price': 30
      },
      {
        'id': nanoid(),
        'title': 'Switch to comfort class',
        'price': 100
      },
      {
        'id': nanoid(),
        'title': 'Add meal',
        'price': 15
      },
      {
        'id': nanoid(),
        'title': 'Choose seats',
        'price': 5
      },
      {
        'id': nanoid(),
        'title': 'Travel by train',
        'price': 40
      }
    ]
  },
  {
    'type': 'drive',
    'offers': [
      {
        'id': nanoid(),
        'title': 'Rent a car',
        'price': 200
      },
    ]
  },
  {
    'type': 'check-in',
    'offers': [
      {
        'id': nanoid(),
        'title': 'Add breakfast',
        'price': 50
      },
    ]
  },
  {
    'type': 'sightseeing',
    'offers': [
      {
        'id': nanoid(),
        'title': 'Book tickets',
        'price': 40
      }, {
        'id': nanoid(),
        'title': 'Lunch in city',
        'price': 30
      }
    ]
  }
];
