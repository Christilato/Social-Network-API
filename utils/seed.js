const connection = require('../config/connection');
const { User, Thought } = require('../models');
const {
  getRandomName,
  getRandomThoughts,
  getRandomPost,
  genRandomIndex,
} = require('./data');

// Start the seeding runtime timer
console.time('seeding');

// Creates a connection to mongodb
connection.once('open', async () => {
  // Delete the entries in the collection
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Empty arrays for randomly generated posts and comments
  const thoughts = [...getRandomThoughts(10)];
  const users = [];

  // Makes comments array
  const makePost = (text) => {
    posts.push({
      text,
      username: getRandomName().split(' ')[0],
      thoughts: [thoughts[genRandomIndex(thoughts)]._id],
    });
  };

  // Wait for the comments to be inserted into the database
  await Thoughts.collection.insertMany(thoughts);

  // For each of the comments that exist, make a random post of 10 words
  thoughts.forEach(() => makePost(getRandomPost(10)));

  // Wait for the posts array to be inserted into the database
  await User.collection.insertMany(users);

  // Log out a pretty table for comments and posts
  console.table(thoughts);
  console.table(users);
  console.timeEnd('seeding complete 🌱');
  process.exit(0);
});