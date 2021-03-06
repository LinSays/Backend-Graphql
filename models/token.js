const mongoose = require('mongoose');
const Schema = mongoose.Schema

const tokenSchema = new Schema({
  PlanetID: Number,
  PlanetName: String,
  PlanetSector: String,
  PlanetCoordinates: String,
  Background: String,
  BackgroundStarDensity: String,
  BackgroundNebula: String,
  SystemType: String,
  StarOneType: String,
  StarOneSpectralClass: String,
  StarOneSpectralNumber: Number,
  StarOneSequence: String,
  StarTwoType: String,
  StarTwoSpectralClass: String,
  StarTwoSpectralNumber: Number,
  StarTwoSequence: String,
  StarThreeType: String,
  StarThreeSpectralClass: String,
  StarThreeSpectralNumber: Number,
  StarThreeSequence: String,
  ExoClass: String,
  MotherPlanetType: String,
  MotherPlanetSubtype: String,
  WorldType: String,
  WorldSubtype: String,
  Moons: Number,
  MoonOneType: String,
  MoonTwoType: String,
  MoonThreeType: String,
  Ring: String,
  RingType: String,
  BioDiversityScale: String,
  CarniverousVegetation: Boolean,
  SecretBiosphere: Boolean,
  Gaia: Boolean,
  IntelligentMicrobiome: Boolean,
  ApexPredators: Number,
  SentientLifeFormType: String,
  FitnessFactor: String,
  IntelligenceCapacity: String,
  ConciousnessAffinity: String,
  RarityScore: Number,
  Rank: Number,
  Highresimage: String,
  Image: String,
  Neighbor1: String,
  Neighbor2: String,
  Neighbor3: String,
  Neighbor4: String,
  Neighbor5: String,
  Neighbor6: String,
  Neighbor7: String,
  Neighbor8: String,
  Neighbor9: String,
  Neighbor10: String,
  TokenHolder: String,
  CivilizationAge: String,
  Population: Number,
  PopGrowth: Number,
  GovernmentType: String,
  EnergyOutput: String,
  WealthIndex: String,
  MilitaryForce: String,
  SpecialStatus: String,
  HostilityLevel: String,
  DiseaseIndex: String,
  EcologicalSynergy: String,
  FitnessLevel: Number,
  IntelligenceLevel: Number,
  ConciousnessLevel: Number,
  PopulationPoints: Number,
  TechnologyPoints: Number,
  ConsciousnessPoints: Number,
  GovernmentPoints: Number,
  MilitaryPoints: Number,
})

module.exports = mongoose.model('Token', tokenSchema);
