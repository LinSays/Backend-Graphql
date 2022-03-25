const graphql = require('graphql');
const Token = require('../models/token');
const Event = require('../models/event');
const Item = require('../models/item');

const FilterType = require('./Types/filter');
const TokenType = require('./Types/token');
const ItemType = require('./Types/item');
const EventType = require('./Types/event');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;

const SortType = new GraphQLInputObjectType({
  name: "Sort",
  fields: () => ({
    OrderBy: { type: GraphQLString },
    OrderDirection: { type: GraphQLInt }
  })
})

//Return Values
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    status: {
      type: GraphQLString,
      resolve(parent, args) {
        return "Welcome to GraphQL"
      }
    },
    tokenList: {
      type: new GraphQLList(TokenType),
      args: { filter: { type: FilterType }, sortBy: { type: SortType }, perPage: { type: GraphQLInt }, page: { type: GraphQLInt } },
      resolve(parent, args) {
        // return _.filter(tokens,{'Background':args.filter})
        const sortBy = {};
        if (args.sortBy) {
          sortBy[args.sortBy.OrderBy] = args.sortBy.OrderDirection;
        }
        const perPage = args.perPage ?? 20;
        const page = args.page ?? 0;
        return Token.find(args.filter).limit(perPage).skip(perPage * page).sort(sortBy);
      }
    },
    holders: {
      type: new GraphQLList(TokenType),
      args: { filter: { type: FilterType } },
      resolve(parent, args) {
        // return _.filter(tokens,{'Background':args.filter})

        return Token.find(args.filter).distinct("TokenHolder");
      }
    },
    itemList: {
      type: new GraphQLList(ItemType),
      args: { filter: { type: FilterType }, sortBy: { type: SortType }, perPage: { type: GraphQLInt }, page: { type: GraphQLInt } },
      resolve(parent, args) {
        // return _.filter(tokens,{'Background':args.filter})
        const sortBy = {};
        if (args.sortBy) {
          sortBy[args.sortBy.OrderBy] = args.sortBy.OrderDirection;
        }
        const perPage = args.perPage ?? 20;
        const page = args.page ?? 0;
        const results = Item.find(args.filter).limit(perPage).skip(perPage * page).sort(sortBy);
        // console.log(results);
        return results;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    addEvent: {
      type: EventType,
      args: {
        EventName: { type: new GraphQLNonNull(GraphQLString) },
        TxID: { type: new GraphQLNonNull(GraphQLString) },
        TxOrigin: { type: new GraphQLNonNull(GraphQLString) },
        BlockTimestamp: { type: new GraphQLNonNull(GraphQLInt) },
        BlockID: { type: new GraphQLNonNull(GraphQLString) },
        BlockNumber: { type: new GraphQLNonNull(GraphQLInt) },
        TokenID: { type: new GraphQLNonNull(GraphQLInt) },
        ItemID: { type: new GraphQLNonNull(GraphQLInt) },
        TokenOwner: { type: GraphQLString },
        Create_startTime: { type: GraphQLInt },
        Create_endTime: { type: GraphQLInt },
        Create_reserveTokenPrice: { type: GraphQLInt },
        Create_buyoutTokenPrice: { type: GraphQLInt },
        Create_listingType: { type: GraphQLInt },
        NewSale_Seller: { type: GraphQLString },
        NewSale_Buyer: { type: GraphQLString },
        NewSale_Buyoutprice: { type: GraphQLInt },
        NewOffer_Offeror: { type: GraphQLString },
        NewOffer_OfferPrice: { type: GraphQLInt },
        NewOffer_listingType: { type: GraphQLInt },
        AuctionClosed_AuctionCreator: { type: GraphQLString },
        AuctionClosed_WinningBidder: { type: GraphQLString },
        AuctionClosed_Cancelled: { type: GraphQLBoolean },
        Removed_TokenOwner: { type: GraphQLString }
      },
      resolve: async function (parent, args) {
        const event = new Event({
          EventName: args.EventName,
          TxID: args.TxID,
          TxOrigin: args.TxOrigin,
          BlockTimestamp: args.BlockTimestamp,
          BlockID: args.BlockID,
          BlockNumber: args.BlockNumber,
          TokenID: args.TokenID,
          ItemID: args.ItemID,
          TokenOwner: args.TokenOwner,
          Create_startTime: args.Create_startTime,
          Create_endTime: args.Create_endTime,
          Create_reserveTokenPrice: args.Create_reserveTokenPrice,
          Create_buyoutTokenPrice: args.Create_buyoutTokenPrice,
          Create_listingType: args.Create_listingType,
          NewSale_Seller: args.NewSale_Seller,
          NewSale_Buyer: args.NewSale_Buyer,
          NewSale_Buyoutprice: args.NewSale_Buyoutprice,
          NewOffer_Offeror: args.NewOffer_Offeror,
          NewOffer_OfferPrice: args.NewOffer_OfferPrice,
          NewOffer_listingType: args.NewOffer_listingType,
          AuctionClosed_AuctionCreator: args.AuctionClosed_AuctionCreator,
          AuctionClosed_WinningBidder: args.AuctionClosed_WinningBidder,
          AuctionClosed_Cancelled: args.AuctionClosed_Cancelled,
          Removed_TokenOwner: args.Removed_TokenOwner
        })
        return event.save();
      }
    },
    addItem: {
      type: ItemType,
      args: {
        PlanetID: { type: GraphQLInt },
        PlanetName: { type: GraphQLString },
        PlanetSector: { type: GraphQLString },
        PlanetCoordinates: { type: GraphQLString },
        Background: { type: GraphQLString },
        BackgroundStarDensity: { type: GraphQLString },
        BackgroundNebula: { type: GraphQLString },
        SystemType: { type: GraphQLString },
        StarOneType: { type: GraphQLString },
        StarOneSpectralClass: { type: GraphQLString },
        StarOneSpectralNumber: { type: GraphQLInt },
        StarOneSequence: { type: GraphQLString },
        StarTwoType: { type: GraphQLString },
        StarTwoSpectralClass: { type: GraphQLString },
        StarTwoSpectralNumber: { type: GraphQLInt },
        StarTwoSequence: { type: GraphQLString },
        StarThreeType: { type: GraphQLString },
        StarThreeSpectralClass: { type: GraphQLString },
        StarThreeSpectralNumber: { type: GraphQLInt },
        StarThreeSequence: { type: GraphQLString },
        ExoClass: { type: GraphQLString },
        MotherPlanetType: { type: GraphQLString },
        MotherPlanetSubtype: { type: GraphQLString },
        WorldType: { type: GraphQLString },
        WorldSubtype: { type: GraphQLString },
        Moons: { type: GraphQLInt },
        MoonOneType: { type: GraphQLString },
        MoonTwoType: { type: GraphQLString },
        MoonThreeType: { type: GraphQLString },
        Ring: { type: GraphQLString },
        RingType: { type: GraphQLString },
        BioDiversityScale: { type: GraphQLString },
        CarniverousVegetation: { type: GraphQLBoolean },
        SecretBiosphere: { type: GraphQLBoolean },
        Gaia: { type: GraphQLBoolean },
        IntelligentMicrobiome: { type: GraphQLBoolean },
        ApexPredators: { type: GraphQLInt },
        SentientLifeFormType: { type: GraphQLString },
        FitnessFactor: { type: GraphQLString },
        IntelligenceCapacity: { type: GraphQLString },
        ConciousnessAffinity: { type: GraphQLString },
        RarityScore: { type: GraphQLInt },
        Rank: { type: GraphQLInt },
        TokenOwner: { type: GraphQLString },
        ItemID: { type: GraphQLInt },
        StartTime: { type: GraphQLInt },
        EndTime: { type: GraphQLInt },
        ReserveTokenPrice: { type: GraphQLInt },
        BuyoutTokenPrice: { type: GraphQLInt },
        ListingType: { type: GraphQLInt },
        Highresimage: { type: GraphQLString },
        Image: { type: GraphQLString },
        Neighbor1: { type: GraphQLString },
        Neighbor2: { type: GraphQLString },
        Neighbor3: { type: GraphQLString },
        Neighbor4: { type: GraphQLString },
        Neighbor5: { type: GraphQLString },
        Neighbor6: { type: GraphQLString },
        Neighbor7: { type: GraphQLString },
        Neighbor8: { type: GraphQLString },
        Neighbor9: { type: GraphQLString },
        Neighbor10: { type: GraphQLString },
        CivilizationAge: { type: GraphQLString },
        Population: { type: GraphQLInt },
        PopGrowth: { type: GraphQLFloat },
        GovernmentType: { type: GraphQLString },
        EnergyOutput: { type: GraphQLString },
        WealthIndex: { type: GraphQLString },
        MilitaryForce: { type: GraphQLString },
        SpecialStatus: { type: GraphQLString },
        HostilityLevel: { type: GraphQLString },
        DiseaseIndex: { type: GraphQLString },
        EcologicalSynergy: { type: GraphQLString },
        FitnessLevel: { type: GraphQLInt },
        IntelligenceLevel: { type: GraphQLInt },
        ConciousnessLevel: { type: GraphQLInt },
        PopulationPoints: { type: GraphQLInt },
        TechnologyPoints: { type: GraphQLInt },
        ConsciousnessPoints: { type: GraphQLInt },
        GovernmentPoints: { type: GraphQLInt },
        MilitaryPoints: { type: GraphQLInt },
      },
      resolve: async function (parent, args) {
        const item = new Item({
          PlanetID: args.PlanetID,
          PlanetName: args.PlanetName,
          PlanetSector: args.PlanetSector,
          PlanetCoordinates: args.PlanetCoordinates,
          Background: args.Background,
          BackgroundStarDensity: args.BackgroundStarDensity,
          BackgroundNebula: args.BackgroundNebula,
          SystemType: args.SystemType,
          StarOneType: args.StarOneType,
          StarOneSpectralClass: args.StarOneSpectralClass,
          StarOneSpectralNumber: args.StarOneSpectralNumber,
          StarOneSequence: args.StarOneSequence,
          StarTwoType: args.StarTwoType,
          StarTwoSpectralClass: args.StarTwoSpectralClass,
          StarTwoSpectralNumber: args.StarTwoSpectralNumber,
          StarTwoSequence: args.StarTwoSequence,
          StarThreeType: args.StarThreeType,
          StarThreeSpectralClass: args.StarThreeSpectralClass,
          StarThreeSpectralNumber: args.StarThreeSpectralNumber,
          StarThreeSequence: args.StarThreeSequence,
          ExoClass: args.ExoClass,
          MotherPlanetType: args.MotherPlanetType,
          MotherPlanetSubtype: args.MotherPlanetSubtype,
          WorldType: args.WorldType,
          WorldSubtype: args.WorldSubtype,
          Moons: args.Moons,
          MoonOneType: args.MoonOneType,
          MoonTwoType: args.MoonTwoType,
          MoonThreeType: args.MoonThreeType,
          Ring: args.Ring,
          RingType: args.RingType,
          BioDiversityScale: args.BioDiversityScale,
          CarniverousVegetation: args.CarniverousVegetation,
          SecretBiosphere: args.SecretBiosphere,
          Gaia: args.Gaia,
          IntelligentMicrobiome: args.IntelligentMicrobiome,
          ApexPredators: args.ApexPredators,
          SentientLifeFormType: args.SentientLifeFormType,
          FitnessFactor: args.FitnessFactor,
          IntelligenceCapacity: args.IntelligenceCapacity,
          ConciousnessAffinity: args.ConciousnessAffinity,
          RarityScore: args.RarityScore,
          Rank: args.Rank,
          TokenOwner: args.TokenOwner,
          ItemID: args.ItemID,
          StartTime: args.StartTime,
          EndTime: args.EndTime,
          ReserveTokenPrice: args.ReserveTokenPrice,
          BuyoutTokenPrice: args.BuyoutTokenPrice,
          ListingType: args.ListingType,
          Highresimage: args.Highresimage,
          Image: args.Image,
          Neighbor1: args.Neighbor1,
          Neighbor2: args.Neighbor2,
          Neighbor3: args.Neighbor3,
          Neighbor4: args.Neighbor4,
          Neighbor5: args.Neighbor5,
          Neighbor6: args.Neighbor6,
          Neighbor7: args.Neighbor7,
          Neighbor8: args.Neighbor8,
          Neighbor9: args.Neighbor9,
          Neighbor10: args.Neighbor10,
          CivilizationAge: args.CivilizationAge,
          Population: args.Population,
          PopGrowth: args.PopGrowth,
          GovernmentType: args.GovernmentType,
          EnergyOutput: args.EnergyOutput,
          WealthIndex: args.WealthIndex,
          MilitaryForce: args.MilitaryForce,
          SpecialStatus: args.SpecialStatus,
          HostilityLevel: args.HostilityLevel,
          DiseaseIndex: args.DiseaseIndex,
          EcologicalSynergy: args.EcologicalSynergy,
          FitnessLevel: args.FitnessLevel,
          IntelligenceLevel: args.IntelligenceLevel,
          ConciousnessLevel: args.ConciousnessLevel,
          PopulationPoints: args.PopulationPoints,
          TechnologyPoints: args.TechnologyPoints,
          ConsciousnessPoints: args.ConsciousnessPoints,
          GovernmentPoints: args.GovernmentPoints,
          MilitaryPoints: args.MilitaryPoints,
        })
        return item.save();
      }
    },
    updateItem: {
      type: ItemType,
      args: {
        PlanetID: { type: GraphQLInt },
        StartTime: { type: GraphQLInt },
        EndTime: { type: GraphQLInt },
        ReserveTokenPrice: { type: GraphQLInt },
        BuyoutTokenPrice: { type: GraphQLInt },
      },
      resolve: async function (parent, args) {
        return await Item.findOneAndUpdate({ "PlanetID": args.PlanetID },
          {
            $set:
            {
              "StartTime": args.StartTime,
              "EndTime": args.EndTime,
              "ReserveTokenPrice": args.ReserveTokenPrice,
              "BuyoutTokenPrice": args.BuyoutTokenPrice
            }
          });
      }
    },
    removeItem: {
      type: GraphQLBoolean,
      args: {
        PlanetID: { type: GraphQLInt }
      },
      resolve: async function (parent, args) {
        try {
          await Item.findOneAndDelete({ "PlanetID": args.PlanetID });
          return true;
        } catch (e) {
          print(e);
          return false;
        }
      }
    },
    updateTokenHolder: {
      type: TokenType,
      args: {
        PlanetID: { type: GraphQLInt },
        TokenHolder: { type: GraphQLString },
      },
      resolve: async function (parent, args) {
        return await Token.findOneAndUpdate({ "PlanetID": args.PlanetID },
          {
            $set:
            {
              "TokenHolder": args.TokenHolder
            }
          });
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
