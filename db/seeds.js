const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const Game = require('../models/game');
const User = require('../models/user');

Game.collection.drop();
User.collection.drop();

User
  .create([{
    firstName: 'Gamer',
    lastName: 'Meeple',
    username: 'Gamer',
    email: 'gamer@meeplegamer.com',
    password: 'gamer'
  }, {
    firstName: 'Omar',
    lastName: 'Port',
    username: 'Omar',
    email: 'omar@meeplegamer.com',
    password: 'omar'
  }, {
    firstName: 'Brian',
    lastName: 'Port',
    username: 'Brian',
    email: 'brian@meeplegamer.com',
    password: 'brian'
  },{
    firstName: 'Robert',
    lastName: 'Port',
    username: 'Robert',
    email: 'robert@meeplegamer.com',
    password: 'robert'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Game
      .create([{
        title: 'Pandemic',
        image: 'https://images-cdn.zmangames.com/us-east-1/filer_public/e8/c8/e8c88415-26ed-4e43-96a7-978dd9853ad0/zm7101_box_front.png',
        description: 'Pandemic is a cooperative board game designed by Matt Leacock and published by Z-Man Games in 2007. Pandemic is based on the premise that four diseases have broken out in the world, each threatening to wipe out a region',
        playingTime: '45 Minutes',
        players: '2-4',
        genre: 'Medical',
        designer: 'Matt Leacock',
        illustrator: String,
        publisher: 'Z-Man',
        publisherURL: 'https://www.zmangames.com/en/index/',
        playerRating: '4',
        buy: 'https://www.amazon.co.uk/Z-Man-Games-ZMG71100-Pandemic-Board/dp/B00A2HD40E/ref=sr_1_1?s=kids&ie=UTF8&qid=1516062109&sr=1-1&keywords=pandemic'
      }, {
        title: 'Star Trek: Ascendency',
        image: 'https://www.flamesofwar.com/DesktopModules/Store/Thumbnail.aspx?IP=~/Portals/0/all_images/GF9/StarTrek/ST001.jpg&IW=710&IH=400',
        description: 'Boldly go where no one has gone before. In Star Trek: Ascendancy — a board game of exploration, expansion and conflict between the United Federation of Planets, the Klingon Empire, and the Romulan Star Empire — you control the great civilizations of the Galaxy, striking out from your home worlds to expand your influence and grow your civilization. Will you journey for peace and exploration, or will you travel the path of conquest and exploitation? Command starships, establish space lanes, construct starbases, and bring other systems under your banner. With more than 200 plastic miniatures and 30 star systems representing some of the Star Trek galaxy's most notable planets and locations, Star Trek: Ascendancy puts the fate of the galaxy in your hands. With an infinite combination of planets and interstellar phenomena, no two games of Star Trek: Ascendancy will ever play the same!',
        playingTime: '90 - 180 Minutes',
        players: '3-6',
        genre: 'Civilization',
        designer: 'Aaron Dill, John Kovaleski, Sean Sweigart',
        illustrator: 'Katie Dillon, Charles Woods',
        publisher: 'Gale Force Nine',
        publisherURL: 'http://startrek.gf9games.com/home.aspx',
        playerRating: '4',
        buy: 'https://www.amazon.co.uk/Gale-Force-Nine-GF9ST001-Ascendancy/dp/1940825911/ref=sr_1_1?ie=UTF8&qid=1516108669&sr=8-1&keywords=star+trek+ascendency'
      },{
        title: 'Catan',
        image: 'https://www.catan.com/files/styles/lightboxy/public/packshots/catan-5th-ed-cover-3d_150118.png?itok=cwb5ZrMU',
        description: 'In Catan (formerly The Settlers of Catan), players try to be the dominant force on the island of Catan by building settlements, cities, and roads. On each turn dice are rolled to determine what resources the island produces. Players collect these resources (cards)—wood, grain, brick, sheep, or stone—to build up their civilizations to get to 10 victory points and win the game.',
        playingTime: '60 - 120 Minutes',
        players: '3-4',
        genre: 'Negotiation',
        designer: 'Klaus Teuber',
        illustrator: 'Volkan Baga, Tanja Donner, Pete Fenlon ,Jason Hawkins, Michaela Kienle, Harald Lieske, Michael Menzel ,Marion Pott, Matt Schwabel, Franz Vohwinkel ,Stephen Graham Walsh',
        publisher: 'Catan Studios',
        publisherURL: 'https://www.catan.com/',
        playerRating: '4',
        buy: 'https://www.amazon.co.uk/Catan-Board-Game-2015-Edition/dp/B00U26V4VQ/ref=sr_1_1?s=kids&ie=UTF8&qid=1516108721&sr=1-1&keywords=catan'
      }]);
  })
  .then((games) => console.log(`${games.length} games created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
