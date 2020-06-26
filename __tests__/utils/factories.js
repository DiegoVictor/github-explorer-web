import { factory } from 'factory-girl';
import faker from 'faker';

factory.define(
  'Repository',
  {},
  {
    full_name: () => {
      return `${faker.internet.userName()}/${faker.lorem.word()}`;
    },
    name: faker.lorem.word,
    description: faker.lorem.paragraph,
    owner: {
      avatar_url: faker.image.imageUrl,
      login: faker.internet.userName,
    },
  }
);

factory.define(
  'Issue',
  {},
  {
    id: faker.random.number,
    user: {
      avatar_url: faker.image.imageUrl,
      login: faker.internet.userName,
    },
    html_url: `https://github.com/<login>/<repository>/issues/`,
    title: faker.name.title,
    labels: [
      {
        id: faker.random.number,
        name: faker.lorem.word,
      },
    ],
    state: 'open',
  }
);

export default factory;
