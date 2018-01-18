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
  },{
    firstName: 'Katuria',
    lastName: 'Rich',
    username: 'Katuria',
    email: 'Katuria@meeplegamer.com',
    password: 'katuria'
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
        description: 'Boldly go where no one has gone before. In Star Trek: Ascendancy — a board game of exploration, expansion and conflict between the United Federation of Planets, the Klingon Empire, and the Romulan Star Empire — you control the great civilizations of the Galaxy, striking out from your home worlds to expand your influence and grow your civilization. Will you journey for peace and exploration, or will you travel the path of conquest and exploitation? Command starships, establish space lanes, construct starbases, and bring other systems under your banner. With more than 200 plastic miniatures and 30 star systems representing some of the Star Trek galaxy\'s most notable planets and locations, Star Trek: Ascendancy puts the fate of the galaxy in your hands. With an infinite combination of planets and interstellar phenomena, no two games of Star Trek: Ascendancy will ever play the same!',
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
        title: 'Pandemic Legacy: Season 1',
        image: 'https://cf.geekdo-images.com/images/pic2452831.png',
        description: 'Pandemic Legacy: Season 1 is a unique and epic cooperative game where your decisions in one game carry over into future games. Over the course of the campaign, you will open sealed packets, reveal hidden information, and unlock secrets that will change your world in unexpected ways. Characters will gain scars, cities will panic, and diseases will mutate. Adapt to each new challenge and save humanity before it\'s too late. The world will never be the same again.',
        playingTime: '60-60 Minutes',
        players: '2-4',
        genre: 'Environmental, Medical',
        designer: 'Rob Daviau, Matt Leacock'
      },{
        title: 'Through the Ages: A New Story of Civilization',
        image: 'https://cf.geekdo-images.com/images/pic2663291.jpg',
        description: 'Through the Ages is a civilization building game. The goal is to develop your civilization, not to destroy other ones. Military strength is just one aspect of your nation, as well as population, production or science. It is up to you which aspect you will concentrate on, more or less, but you should not underestimate any of them while building your civilization. Victory is achieved by the player whose nation produces the most culture during the game. However, there are many ways to produce culture: through religion, literature or drama, by building wonders, by utilizing cultural persons etc. Considerable amount of culture can be gained even via wars or aggression.',
        playingTime: '180-240 Minutes',
        players: '2-4',
        genre: 'Card Game, Civilization, Economic',
        designer: 'Vlaada Chv·til'
      },{
        title: 'Twilight Struggle',
        image: 'https://cf.geekdo-images.com/images/pic361592.jpg',
        description: 'Twilight Struggle: The Cold War, 1945-1989 is a card-driven strategy game for two players, with its theme taken from the Cold War. One player plays the United States(US), and the other plays the Soviet Union (USSR).',
        playingTime: '180-180 Minutes',
        players: '2-2',
        genre: 'Modern Warfare, Political, Wargame',
        designer: 'Ananda Gupta, Jason Matthews'
      },{
        title: 'Terra Mystica',
        image: 'https://cf.geekdo-images.com/images/pic1356616.jpg',
        description: 'Terra Mystica is a German-style board game for two to five players designed by Helge Ostertag and Jens Drögemüller. The game was first published by Feuerland Spiele in Germany in 2012, and was later published in English and French by Zman Games and Filosofia Édition in 2013. Feuerland Spiele released a second German edition of the game in 2013.',
        playingTime: '60-150 Minutes',
        players: '2-5',
        genre: 'Civilization, Economic, Fantasy, Territory Building',
        designer: 'Jens Drˆgem¸ller, Helge Ostertag'
      },{
        title: 'Gloomhaven',
        image: 'https://cf.geekdo-images.com/images/pic2437871.jpg',
        description: 'Gloomhaven is a game of Euro-inspired tactical combat in a persistent world of shifting motives. Players will take on the role of a wandering adventurer with their own special set of skills and their own reasons for travelling to this dark corner of the world. Players must work together out of necessity to clear out menacing dungeons and forgotten ruins. In the process they will enhance their abilities with experience and loot, discover new locations to explore and plunder, and expand an ever-branching story fueled by the decisions they make. This is a game with a persistent and changing world that is ideally played over many game sessions. After a scenario, players will make decisions on what to do, which will determine how the story continues, kind of like a "Choose Your Own Adventure" book. Playing through a scenario is a cooperative affair where players will fight against automated monsters using an innovative card system to determine the order of play and what a player does on their turn.',
        playingTime: '90-150 Minutes',
        players: '1-4',
        genre: 'Adventure, Economic, Exploration, Fantasy, Fighting, Miniatures',
        designer: 'Isaac Childres'
      },{
        title: 'Star Wars: Rebellion',
        image: 'https://cf.geekdo-images.com/images/pic2737530.png',
        description: 'Star Wars: Rebellion is an asymmetrical strategy board game created by Corey Konieczka and published by Fantasy Flight Games in 2016 inspired by the Star WarsOriginal trilogy.[1][2] Players control either the Galactic Empire, who seek to find the Rebel Alliance base and destroy it, or the Rebel Alliance, who seek to avoid detection by the Galactic Empire while attempting sabotage against the Galactic Empire.',
        playingTime: '180-240 Minutes',
        players: '2-4',
        genre: 'Dice, Fighting, Movies / TV / Radio theme, Science Fiction, Wargame',
        designer: 'Corey Konieczka'
      },{
        title: 'Scythe',
        image: 'https://cf.geekdo-images.com/images/pic3163924.jpg',
        description: 'Scythe is a board game for 1 to 5 players designed by Jamey Stegmaier and published by Stonemaier Games in 2016. Set in an alternate history 1920s Europe, in Scytheplayers control factions which produce resources, build economic infrastructure, and use giant war machines called mechs to fight and control territory.[1] Players take up to two actions per turn using unique player boards, with the game proceeding until one player has achieved six achievements, at which point the players receive coins for their achievements and territories controlled, with the player with the most coins winning.[2]',
        playingTime: '90-115 Minutes',
        players: '1-5',
        genre: 'Civilization, Economic, Fighting, Miniatures, Science Fiction, Territory Building',
        designer: 'Jamey Stegmaier'
      },{
        title: 'Terraforming Mars',
        image: 'https://cf.geekdo-images.com/images/pic3536616.jpg',
        description: 'In Terraforming Mars players take the role of corporations working together to terraform the planet by raising the temperature and creating oxygen, water, and plant and animal life. Players compete to earn the most victory points, which are measured by their contribution to terraforming, as well as building human infrastructure.',
        playingTime: '90-120 Minutes',
        players: '1-5',
        genre: 'Economic, Environmental, Industry / Manufacturing, Science Fiction, Territory Building',
        designer: 'Jacob Fryxelius'
      },{
        title: '7 Wonders: Duel',
        image: 'https://cf.geekdo-images.com/images/pic3376065.jpg',
        description: 'In many ways 7 Wonders Duel resembles its parent game 7 Wonders as over three ages players acquire cards that provide resources or advance their military or scientific development in order to develop a civilization and complete wonders. What\'s different about 7 Wonders Duel is that, as the title suggests, the game is solely for two players, with the players not drafting cards simultaneously from hands of cards, but from a display of face-down and face-up cards arranged at the start of a round. A player can take a card only if it\'s not covered by any others, so timing comes into play as well as bonus moves that allow you to take a second card immediately. As in the original game, each card that you acquire can be built, discarded for coins, or used to construct a wonder.',
        playingTime: '30-30 Minutes',
        players: '2-2',
        genre: 'Ancient, Card Game, City Building, Civilization',
        designer: 'Antoine Bauza, Bruno Cathala'
      },{
        title: 'Caverna: The Cave Farmers',
        image: 'https://cf.geekdo-images.com/images/pic1790789.jpg',
        description: 'Caverna: The Cave Farmers is a worker-placement game at heart, with a focus on farming. In the game, you are the bearded leader of a small dwarf family that lives in a little cave in the mountains. You begin the game with a farmer and his spouse, and each member of the farming family represents an action that the player can take each turn. Together, you cultivate the forest in front of your cave and dig deeper into the mountain. You furnish the caves as dwellings for your offspring as well as working spaces for small enterprises.',
        playingTime: '30-210 Minutes',
        players: '1-7',
        genre: 'Animals, Economic, Fantasy, Farming',
        designer: 'Uwe Rosenberg'
      },{
        title: 'The Castles of Burgundy',
        image: 'https://cf.geekdo-images.com/images/pic1176894.jpg',
        description: 'The Hundred Year\'s war is over and the Renaissance is looming. Conditions are perfect for the princess of the Loire Valley to propel their estates to prosperity and prominence. Through strategic trading and building, clever planning, and careful thought, players add settlements and castles, practice trade along the river, exploit silver mines, farm livestock and more in this classic Stefan Feld Eurogame. ',
        playingTime: '30-90 Minutes',
        players: '2-4',
        genre: 'Dice, Medieval, Territory Building',
        designer: 'Stefan Feld'
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
