import factory from 'factory-girl';
import faker from 'faker';

interface Issue {
  html_url: string;
}

factory.define('Repository', {}, () => {
  const userName = faker.internet.userName();
  const name = faker.lorem.word();
  return {
    full_name: () => {
      return `${userName}/${name}`;
    },
    name,
    description: faker.lorem.paragraph,
    owner: {
      avatar_url: faker.image.imageUrl,
      login: userName,
    },
  };
});

factory.define('Issue', {}, () => {
  const userName = faker.internet.userName();
  const name = faker.lorem.word();
  return {
    id: faker.random.number,
    user: {
      avatar_url: faker.image.imageUrl,
      login: userName,
    },
    html_url: `https://github.com/${userName}/${name}/issues/`,
    title: faker.name.title,
    labels: [
      {
        id: faker.random.number,
        name: faker.lorem.word,
      },
    ],
    state: 'open',
  };
});

export default factory;
