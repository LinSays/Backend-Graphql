const graphql = require('graphql');

const {
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLList,
} = graphql;

const FilterType = new GraphQLInputObjectType({
  name: "Filter",
  fields: () => ({
    id: { type: GraphQLList(GraphQLString) },
    PlanetID: { type: GraphQLList(GraphQLInt) },
    PlanetName: { type: GraphQLList(GraphQLString) },
    PlanetSector: { type: GraphQLList(GraphQLString) },
    PlanetCoordinates: { type: GraphQLList(GraphQLString) },
    Background: { type: GraphQLList(GraphQLString) },
    BackgroundStarDensity: { type: GraphQLList(GraphQLString) },
    BackgroundNebula: { type: GraphQLList(GraphQLString) },
    SystemType: { type: GraphQLList(GraphQLString) },
    StarOneType: { type: GraphQLList(GraphQLString) },
    StarOneSpectralClass: { type: GraphQLList(GraphQLString) },
    StarOneSpectralNumber: { type: GraphQLList(GraphQLInt) },
    StarOneSequence: { type: GraphQLList(GraphQLString) },
    StarTwoType: { type: GraphQLList(GraphQLString) },
    StarTwoSpectralClass: { type: GraphQLList(GraphQLString) },
    StarTwoSpectralNumber: { type: GraphQLList(GraphQLInt) },
    StarTwoSequence: { type: GraphQLList(GraphQLString) },
    StarThreeType: { type: GraphQLList(GraphQLString) },
    StarThreeSpectralClass: { type: GraphQLList(GraphQLString) },
    StarThreeSpectralNumber: { type: GraphQLList(GraphQLInt) },
    StarThreeSequence: { type: GraphQLList(GraphQLString) },
    ExoClass: { type: GraphQLList(GraphQLString) },
    MotherPlanetType: { type: GraphQLList(GraphQLString) },
    MotherPlanetSubtype: { type: GraphQLList(GraphQLString) },
    WorldType: { type: GraphQLList(GraphQLString) },
    WorldSubtype: { type: GraphQLList(GraphQLString) },
    Moons: { type: GraphQLList(GraphQLInt) },
    MoonOneType: { type: GraphQLList(GraphQLString) },
    MoonTwoType: { type: GraphQLList(GraphQLString) },
    MoonThreeType: { type: GraphQLList(GraphQLString) },
    Ring: { type: GraphQLList(GraphQLString) },
    RingType: { type: GraphQLList(GraphQLString) },
    BioDiversityScale: { type: GraphQLList(GraphQLString) },
    CarniverousVegetation: { type: GraphQLList(GraphQLBoolean) },
    SecretBiosphere: { type: GraphQLList(GraphQLBoolean) },
    Gaia: { type: GraphQLList(GraphQLBoolean) },
    IntelligentMicrobiome: { type: GraphQLList(GraphQLBoolean) },
    ApexPredators: { type: GraphQLList(GraphQLInt) },
    SentientLifeFormType: { type: GraphQLList(GraphQLString) },
    FitnessFactor: { type: GraphQLList(GraphQLString) },
    IntelligenceCapacity: { type: GraphQLList(GraphQLString) },
    ConciousnessAffinity: { type: GraphQLList(GraphQLString) },
    RarityScore: { type: GraphQLList(GraphQLInt) },
    Rank: { type: GraphQLList(GraphQLInt) },
    TokenOwner: { type: GraphQLList(GraphQLString) },
    ItemID: { type: GraphQLList(GraphQLInt) },
    StartTime: { type: GraphQLList(GraphQLInt) },
    EndTime: { type: GraphQLList(GraphQLInt) },
    ReserveTokenPrice: { type: GraphQLList(GraphQLInt) },
    BuyoutTokenPrice: { type: GraphQLList(GraphQLInt) },
    ListingType: { type: GraphQLList(GraphQLInt) },
  })
});

module.exports = FilterType;