const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const { thorify } = require("thorify");
const Web3 = require("web3");
const csv = require('csv-parser');
const fs = require('fs');
const cors = require('cors')

const schema = require('./schema/schema');
const { MP_ADDRESS, NFT_ADDRESS, MP_ABI, NFT_ABI } = require('./src/config');
const {
  createMarketItem,
  updateMarketItem,
  removeMarketItem,
  newSale,
  newOffer,
  auctionClosed,
  transfer
} = require('./utils');

require('dotenv').config();

const app = express();

app.use(cors());

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log("Connected to MongoDB")
})

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.get('/gettokens', async function (req, res) {
  const result = [];
  const tokens = db.collection('tokens');
  fs.createReadStream('planets-metadata.csv')
    .pipe(csv())
    .on('data', (row) => {
      result.push(row);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');

      const newTokenInfo = [];
      for (let i = 0; i < result.length; i++) {
        let temp = {}
        temp['PlanetID'] = parseFloat(result[i]['ID'].replace(/,/g, ''));
        temp['PlanetName'] = result[i]['Name'];
        temp['PlanetSector'] = result[i]['Sector'];
        temp['PlanetCoordinates'] = result[i]['Coordinates'];
        temp['Background'] = result[i]['Background'];
        temp['BackgroundStarDensity'] = result[i]['Background Star Density'];
        temp['BackgroundNebula'] = result[i]['Background Nebula'];
        temp['SystemType'] = result[i]['System Type'];
        temp['StarOneType'] = result[i]['Star 1 Type'];
        temp['StarOneSpectralClass'] = result[i]['Star 1 Spectral Class'];
        temp['StarOneSpectralNumber'] = result[i]['Star 1 Spectral Number'] != null ? parseFloat(result[i]['Star 1 Spectral Number'].replace(/,/g, '')) : result[i]['Star 1 Spectral Number'];
        temp['StarOneSequence'] = result[i]['Star 1 Sequence'];
        temp['StarTwoType'] = result[i]['Star 2 Type'];
        temp['StarTwoSpectralClass'] = result[i]['Star 2 Spectral Class'];
        temp['StarTwoSpectralNumber'] = result[i]['Star 2 Spectral Number'] != null ? parseFloat(result[i]['Star 2 Spectral Number'].replace(/,/g, '')) : result[i]['Star 2 Spectral Number'];
        temp['StarTwoSequence'] = result[i]['Star 2 Sequence'];
        temp['StarThreeType'] = result[i]['Star 3 Type'];
        temp['StarThreeSpectralClass'] = result[i]['Star 3 Spectral Class'];
        temp['StarThreeSpectralNumber'] = result[i]['Star 3 Spectral Number'] != null ? parseFloat(result[i]['Star 3 Spectral Number'].replace(/,/g, '')) : result[i]['Star 3 Spectral Number'];
        temp['StarThreeSequence'] = result[i]['Star 3 Sequence'];
        temp['ExoClass'] = result[i]['Exo Class'];
        temp['MotherPlanetType'] = result[i]['Mother Planet Type'];
        temp['MotherPlanetSubtype'] = result[i]['Mother Planet Subtype'];
        temp['WorldType'] = result[i]['World Type'];
        temp['WorldSubtype'] = result[i]['World Subtype'];
        temp['Moons'] = parseFloat(result[i]['Moons'].replace(/,/g, ''));
        temp['MoonOneType'] = result[i]['Moon 1 Type'];
        temp['MoonTwoType'] = result[i]['Moon 2 Type'];
        temp['MoonThreeType'] = result[i]['Moon 3 Type'];
        temp['Ring'] = result[i]['Ring'];
        temp['RingType'] = result[i]['Ring Type'];
        temp['BioDiversityScale'] = result[i]['Bio Diversity Scale'];
        temp['CarniverousVegetation'] = result[i]['Carniverous Vegetation'] == "YES" ? true : false;
        temp['SecretBiosphere'] = result[i]['Secret Biosphere'] == "YES" ? true : false;
        temp['Gaia'] = result[i]['Gaia'] == "YES" ? true : false;
        temp['IntelligentMicrobiome'] = result[i]['Intelligent Microbiome'] == "YES" ? true : false;
        temp['ApexPredators'] = result[i]['Apex Predators'] != null ? parseFloat(result[i]['Apex Predators'].replace(/,/g, '')) : result[i]['Apex Predators'];
        temp['SentientLifeFormType'] = result[i]['Sentient Evolution'];
        temp['FitnessFactor'] = result[i]['SE Fitness Factor'];
        temp['IntelligenceCapacity'] = result[i]['SE Intelligence Capacity'];
        temp['ConciousnessAffinity'] = result[i]['SE Conciousness Affinity'];
        temp['RarityScore'] = parseFloat(result[i]['Rarity Score'].replace(/,/g, ''));
        temp['Rank'] = parseFloat(result[i]['Rank'].replace(/,/g, ''));
        temp['Rank'] = parseFloat(result[i]['Rank'].replace(/,/g, ''));
        temp['Highresimage'] = result[i]['Highresimage'];
        temp['Image'] = result[i]['Image'];
        temp['Neighbor1'] = result[i]['Neighbor 1'];
        temp['Neighbor2'] = result[i]['Neighbor 2'];
        temp['Neighbor3'] = result[i]['Neighbor 3'];
        temp['Neighbor4'] = result[i]['Neighbor 4'];
        temp['Neighbor5'] = result[i]['Neighbor 5'];
        temp['Neighbor6'] = result[i]['Neighbor 6'];
        temp['Neighbor7'] = result[i]['Neighbor 7'];
        temp['Neighbor8'] = result[i]['Neighbor 8'];
        temp['Neighbor9'] = result[i]['Neighbor 9'];
        temp['Neighbor10'] = result[i]['Neighbor 10'];
        temp['CivilizationAge'] = result[i]['Civilization Age'];
        temp['Population'] = result[i]['Population'];
        temp['PopGrowth'] = result[i]['Pop. Growth'];
        temp['GovernmentType'] = result[i]['Government Type'];
        temp['EnergyOutput'] = result[i]['Energy Output'];
        temp['WealthIndex'] = result[i]['Wealth Index'];
        temp['MilitaryForce'] = result[i]['Military Force'];
        temp['SpecialStatus'] = result[i]['Special Status'];
        temp['HostilityLevel'] = result[i]['Hostility Level'];
        temp['DiseaseIndex'] = result[i]['Disease Index'];
        temp['EcologicalSynergy'] = result[i]['Ecological Synergy'];
        temp['FitnessLevel'] = result[i]['Fitness Level'];
        temp['IntelligenceLevel'] = result[i]['Intelligence Level'];
        temp['ConciousnessLevel'] = result[i]['Consciousness Level'];
        temp['PopulationPoints'] = result[i]['Population Points'];
        temp['TechnologyPoints'] = result[i]['Technology Points'];
        temp['ConsciousnessPoints'] = result[i]['Consciousness Points'];
        temp['GovernmentPoints'] = result[i]['Government Points'];
        temp['MilitaryPoints'] = result[i]['Military Points'];
        newTokenInfo.push(temp);
      }
      res.json(result);
      for (let i = 0; i < newTokenInfo.length; i++) {
        tokens.insertOne(newTokenInfo[i]);
      }
    });
})

app.listen(process.env.PORT || 5000, async function () {
  console.log('now listening for requests on port 5000');

  const web3Instance = thorify(new Web3(), "https://mainnet.veblocks.net/");
  const marketplaceInstance = new web3Instance.eth.Contract(MP_ABI, MP_ADDRESS);
  const nftInstance = new web3Instance.eth.Contract(NFT_ABI, NFT_ADDRESS);

  //Async when CreateMarketItem Event is emitted
  marketplaceInstance.events.CreateMarketItem({
    fromBlock: 0
  }, function (error, event) { })
    .on('data', createMarketItem)
    .on('changed', function (event) {
      // remove event from local database
    })
    .on('error', console.error);

  //Async when UpdateMarketItem Event is emitted
  marketplaceInstance.events.UpdateMarketItem({
    fromBlock: 0
  }, function (error, event) { })
    .on('data', updateMarketItem)
    .on('changed', function (event) {
      // remove event from local database
    })
    .on('error', console.error);

  //Async when NewSale Event is emitted
  marketplaceInstance.events.NewSale({
    fromBlock: 0
  }, function (error, event) { })
    .on('data', newSale)
    .on('changed', function (event) {
      // remove event from local database
    })
    .on('error', console.error);

  //Async when NewOffer Event is emitted
  marketplaceInstance.events.NewOffer({
    fromBlock: 0
  }, function (error, event) { })
    .on('data', newOffer)
    .on('changed', function (event) {
      // remove event from local database
    })
    .on('error', console.error);

  //Async when AuctionClosed Event is emitted
  marketplaceInstance.events.AuctionClosed({
    fromBlock: 0
  }, function (error, event) { })
    .on('data', auctionClosed)
    .on('changed', function (event) {
      // remove event from local database
    })
    .on('error', console.error);

  //Async when RemoveMarketItem Event is emitted
  marketplaceInstance.events.RemoveMarketItem({
    fromBlock: 0
  }, function (error, event) { })
    .on('data', removeMarketItem)
    .on('changed', function (event) {
      // remove event from local database
    })
    .on('error', console.error);

  //Async when Transfer Event is emitted
  nftInstance.events.Transfer({
    fromBlock: 0
  }, function (error, event) { })
    .on('data', transfer)
    .on('changed', function (event) {
      // remove event from local database
    })
    .on('error', console.error);


  //initialize

  const initializeDB = function () {
    marketplaceInstance.getPastEvents('allEvents',{
      fromBlock: 11730354,
      toBlock: 'latest'
  }, async function (error, events) {
      console.log('allEvents fetch started');
      // console.log(events);
      // console.log(events[0]);
      for (let i = 0; i < events.length; i++) {
        if (events[i].event === "CreateMarketItem") {
          await createMarketItem(events[i]);
        } else if (events[i].event === "UpdateMarketItem") {
          await updateMarketItem(events[i]);
        } else if (events[i].event === "NewSale") {
          await newSale(events[i]);
        } else if (events[i].event === "NewOffer") {
          await newOffer(events[i]);
        } else if (events[i].event === "AuctionClosed") {
          await auctionClosed(events[i]);
        } else if (events[i].event === "RemoveMarketItem") {
          await removeMarketItem(events[i]);
        }
      }
      console.log('allEvents fetch ended');
    });
    nftInstance.getPastEvents('Transfer',{
      fromBlock: 11590446,
      toBlock: 'latest'
  }, async function (error, events) {
      console.log('Transfer events started');
      // console.log(events);
      // console.log(events[0]);
      for (let i = 0; i < events.length; i++) {
        await transfer(events[i]);
      }
      console.log('Transfer events ended');
    });
  }
  initializeDB();
});
