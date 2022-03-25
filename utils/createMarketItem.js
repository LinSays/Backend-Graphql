const { request, gql } = require("graphql-request");
const { getBalanceNumber } = require("./utils");

const createMarketItem = async function (event) {
  const eventItem = event;
  const itemInfo = eventItem.returnValues.newItem;
  const tokenId = parseInt(itemInfo.tokenId);
  // console.log(eventItem)
  //add event list
  try {
    await request(
      "http://localhost:5000/graphql",
      gql`
        mutation addEvent(
          $EventName: String!,
          $TxID: String!,
          $TxOrigin: String!,
          $BlockTimestamp: Int!,
          $BlockID: String!,
          $BlockNumber: Int!,
          $TokenID: Int!,
          $ItemID: Int!,
          $TokenOwner: String,
          $Create_startTime: Int,
          $Create_endTime: Int,
          $Create_reserveTokenPrice: Int,
          $Create_buyoutTokenPrice: Int,
          $Create_listingType: Int
        ) {
          addEvent(
            EventName: $EventName,
            TxID: $TxID,
            TxOrigin: $TxOrigin,
            BlockTimestamp: $BlockTimestamp,
            BlockID: $BlockID,
            BlockNumber: $BlockNumber,
            TokenID: $TokenID,
            ItemID: $ItemID,
            TokenOwner: $TokenOwner,
            Create_startTime: $Create_startTime,
            Create_endTime: $Create_endTime,
            Create_reserveTokenPrice: $Create_reserveTokenPrice,
            Create_buyoutTokenPrice: $Create_buyoutTokenPrice,
            Create_listingType: $Create_listingType
          ) {
            EventName
          }
        }
      `,
      {
        "EventName": eventItem.event,
        "TxID": eventItem.meta.txID,
        "TxOrigin": eventItem.meta.txOrigin,
        "BlockTimestamp": parseInt(eventItem.meta.blockTimestamp),
        "BlockID": eventItem.meta.blockID,
        "BlockNumber": parseInt(eventItem.meta.blockNumber),
        "TokenID": parseInt(itemInfo.tokenId),
        "ItemID": parseInt(itemInfo.itemId),
        "TokenOwner": itemInfo.tokenOwner,
        "Create_startTime": parseInt(itemInfo.startTime),
        "Create_endTime": parseInt(itemInfo.endTime),
        "Create_reserveTokenPrice": parseInt(getBalanceNumber(itemInfo.reserveTokenPrice)),
        "Create_buyoutTokenPrice": parseInt(getBalanceNumber(itemInfo.buyoutTokenPrice)),
        "Create_listingType": parseInt(itemInfo.listingType)
      }
    );
  } catch (error) {
    if (itemInfo.itemId === "232") {
      console.error("createMarketItem Event Err: ", error);
    }
  }

  try {
    // Get token info from token list
    const response = await request(
      "http://localhost:5000/graphql",
      gql`
        query tokenList($PlanetID: [Int]!) {
          tokenList(filter:{PlanetID: $PlanetID}) {
            PlanetID
            PlanetName
            PlanetSector
            PlanetCoordinates
            Background
            BackgroundStarDensity
            BackgroundNebula
            SystemType
            StarOneType
            StarOneSpectralClass
            StarOneSpectralNumber
            StarOneSequence
            StarTwoType
            StarTwoSpectralClass
            StarTwoSpectralNumber
            StarTwoSequence
            StarThreeType
            StarThreeSpectralClass
            StarThreeSpectralNumber
            StarThreeSequence
            ExoClass
            MotherPlanetType
            MotherPlanetSubtype
            WorldType
            WorldSubtype
            Moons
            MoonOneType
            MoonTwoType
            MoonThreeType
            Ring
            RingType
            BioDiversityScale
            CarniverousVegetation
            SecretBiosphere
            Gaia
            IntelligentMicrobiome
            ApexPredators
            SentientLifeFormType
            FitnessFactor
            IntelligenceCapacity
            ConciousnessAffinity
            RarityScore
            Rank
            Highresimage
            Image
            Neighbor1
            Neighbor2
            Neighbor3
            Neighbor4
            Neighbor5
            Neighbor6
            Neighbor7
            Neighbor8
            Neighbor9
            Neighbor10
            TokenHolder
            CivilizationAge
            Population
            PopGrowth
            GovernmentType
            EnergyOutput
            WealthIndex
            MilitaryForce
            SpecialStatus
            HostilityLevel
            DiseaseIndex
            EcologicalSynergy
            FitnessLevel
            IntelligenceLevel
            ConciousnessLevel
            PopulationPoints
            TechnologyPoints
            ConsciousnessPoints
            GovernmentPoints
            MilitaryPoints
          }
        }
      `,
      {
        "PlanetID": [tokenId]
      }
    );
    const tokenInfo = response.tokenList[0];
    // Add new item to item list
    try {
      await request(
        "http://localhost:5000/graphql",
        gql`
          mutation addItem(
            $PlanetID: Int!,
            $PlanetName: String!,
            $PlanetSector: String,
            $PlanetCoordinates: String,
            $Background: String!,
            $BackgroundStarDensity: String!,
            $BackgroundNebula: String!,
            $SystemType: String!,
            $StarOneType: String!,
            $StarOneSpectralClass: String!,
            $StarOneSpectralNumber: Int,
            $StarOneSequence: String!,
            $StarTwoType: String!,
            $StarTwoSpectralClass: String!,
            $StarTwoSpectralNumber: Int,
            $StarTwoSequence: String!,
            $StarThreeType: String!,
            $StarThreeSpectralClass: String,
            $StarThreeSpectralNumber: Int,
            $StarThreeSequence: String!,
            $ExoClass: String!,
            $MotherPlanetType: String!,
            $MotherPlanetSubtype: String!,
            $WorldType: String!,
            $WorldSubtype: String!,
            $Moons: Int!,
            $MoonOneType: String!,
            $MoonTwoType: String!,
            $MoonThreeType: String!,
            $Ring: String!,
            $RingType: String!,
            $BioDiversityScale: String!,
            $CarniverousVegetation: Boolean!,
            $SecretBiosphere: Boolean!,
            $Gaia: Boolean!,
            $IntelligentMicrobiome: Boolean!,
            $ApexPredators: Int!,
            $SentientLifeFormType: String!,
            $FitnessFactor: String!,
            $IntelligenceCapacity: String!,
            $ConciousnessAffinity: String!,
            $RarityScore: Int!,
            $Rank: Int!,
            $TokenOwner: String!,
            $ItemID: Int!,
            $StartTime: Int!,
            $EndTime: Int!,
            $ReserveTokenPrice: Int!,
            $BuyoutTokenPrice: Int!,
            $ListingType: Int!,
            $Highresimage: String!,
            $Image: String!,
            $Neighbor1: String!,
            $Neighbor2: String!,
            $Neighbor3: String!,
            $Neighbor4: String!,
            $Neighbor5: String!,
            $Neighbor6: String!,
            $Neighbor7: String!,
            $Neighbor8: String!,
            $Neighbor9: String!,
            $Neighbor10: String!,
            $CivilizationAge: String,
            $Population: Int,
            $PopGrowth:Float,
            $GovernmentType: String,
            $EnergyOutput :String,
            $WealthIndex: String,
            $MilitaryForce: String,
            $SpecialStatus: String,
            $HostilityLevel: String,
            $DiseaseIndex: String,
            $EcologicalSynergy: String,
            $FitnessLevel: Int,
            $IntelligenceLevel: Int,
            $ConciousnessLevel: Int,
            $PopulationPoints: Int,
            $TechnologyPoints: Int,
            $ConsciousnessPoints: Int,
            $GovernmentPoints: Int,
            $MilitaryPoints: Int
          ) {
            addItem(
              PlanetID: $PlanetID,
              PlanetName: $PlanetName,
              PlanetSector: $PlanetSector,
              PlanetCoordinates: $PlanetCoordinates,
              Background: $Background,
              BackgroundStarDensity: $BackgroundStarDensity,
              BackgroundNebula: $BackgroundNebula,
              SystemType: $SystemType,
              StarOneType: $StarOneType,
              StarOneSpectralClass: $StarOneSpectralClass,
              StarOneSpectralNumber: $StarOneSpectralNumber,
              StarOneSequence: $StarOneSequence,
              StarTwoType: $StarTwoType,
              StarTwoSpectralClass:$StarTwoSpectralClass,
              StarTwoSpectralNumber: $StarTwoSpectralNumber,
              StarTwoSequence: $StarTwoSequence,
              StarThreeType: $StarThreeType,
              StarThreeSpectralClass: $StarThreeSpectralClass,
              StarThreeSpectralNumber: $StarThreeSpectralNumber,
              StarThreeSequence: $StarThreeSequence,
              ExoClass: $ExoClass,
              MotherPlanetType: $MotherPlanetType,
              MotherPlanetSubtype: $MotherPlanetSubtype,
              WorldType: $WorldType,
              WorldSubtype: $WorldSubtype,
              Moons: $Moons,
              MoonOneType: $MoonOneType,
              MoonTwoType: $MoonTwoType,
              MoonThreeType: $MoonThreeType,
              Ring: $Ring,
              RingType: $RingType,
              BioDiversityScale: $BioDiversityScale,
              CarniverousVegetation: $CarniverousVegetation,
              SecretBiosphere: $SecretBiosphere,
              Gaia: $Gaia,
              IntelligentMicrobiome: $IntelligentMicrobiome,
              ApexPredators: $ApexPredators,
              SentientLifeFormType: $SentientLifeFormType,
              FitnessFactor: $FitnessFactor,
              IntelligenceCapacity: $IntelligenceCapacity,
              ConciousnessAffinity: $ConciousnessAffinity,
              RarityScore: $RarityScore,
              Rank: $Rank,
              TokenOwner: $TokenOwner,
              ItemID: $ItemID,
              StartTime: $StartTime,
              EndTime: $EndTime,
              ReserveTokenPrice: $ReserveTokenPrice,
              BuyoutTokenPrice: $BuyoutTokenPrice,
              ListingType: $ListingType,
              Highresimage: $Highresimage,
              Image: $Image,
              Neighbor1: $Neighbor1,
              Neighbor2: $Neighbor2,
              Neighbor3: $Neighbor3,
              Neighbor4: $Neighbor4,
              Neighbor5: $Neighbor5,
              Neighbor6: $Neighbor6,
              Neighbor7: $Neighbor7,
              Neighbor8: $Neighbor8,
              Neighbor9: $Neighbor9,
              Neighbor10: $Neighbor10,
              CivilizationAge: $CivilizationAge,
              Population: $Population,
              PopGrowth: $PopGrowth,
              GovernmentType: $GovernmentType,
              EnergyOutput: $EnergyOutput,
              WealthIndex: $WealthIndex,
              MilitaryForce: $MilitaryForce,
              SpecialStatus: $SpecialStatus,
              HostilityLevel: $HostilityLevel,
              DiseaseIndex: $DiseaseIndex,
              EcologicalSynergy: $EcologicalSynergy,
              FitnessLevel: $FitnessLevel,
              IntelligenceLevel: $IntelligenceLevel,
              ConciousnessLevel: $ConciousnessLevel,
              PopulationPoints: $PopulationPoints,
              TechnologyPoints: $TechnologyPoints,
              ConsciousnessPoints: $ConsciousnessPoints,
              GovernmentPoints: $GovernmentPoints,
              MilitaryPoints: $MilitaryPoints
            ) {
              PlanetID
            }
          }
        `,
        {
          PlanetID: parseInt(tokenInfo.PlanetID),
          PlanetName: tokenInfo.PlanetName,
          PlanetSector: tokenInfo.PlanetSector,
          PlanetCoordinates: tokenInfo.PlanetCoordinates,
          Background: tokenInfo.Background,
          BackgroundStarDensity: tokenInfo.BackgroundStarDensity,
          BackgroundNebula: tokenInfo.BackgroundNebula,
          SystemType: tokenInfo.SystemType,
          StarOneType: tokenInfo.StarOneType,
          StarOneSpectralClass: tokenInfo.StarOneSpectralClass,
          StarOneSpectralNumber: tokenInfo.StarOneSpectralNumber,
          StarOneSequence: tokenInfo.StarOneSequence,
          StarTwoType: tokenInfo.StarTwoType,
          StarTwoSpectralClass: tokenInfo.StarTwoSpectralClass,
          StarTwoSpectralNumber: tokenInfo.StarTwoSpectralNumber,
          StarTwoSequence: tokenInfo.StarTwoSequence,
          StarThreeType: tokenInfo.StarThreeType,
          StarThreeSpectralClass: tokenInfo.StarThreeSpectralClass,
          StarThreeSpectralNumber: tokenInfo.StarThreeSpectralNumber,
          StarThreeSequence: tokenInfo.StarThreeSequence,
          ExoClass: tokenInfo.ExoClass,
          MotherPlanetType: tokenInfo.MotherPlanetType,
          MotherPlanetSubtype: tokenInfo.MotherPlanetSubtype,
          WorldType: tokenInfo.WorldType,
          WorldSubtype: tokenInfo.WorldSubtype,
          Moons: tokenInfo.Moons,
          MoonOneType: tokenInfo.MoonOneType,
          MoonTwoType: tokenInfo.MoonTwoType,
          MoonThreeType: tokenInfo.MoonThreeType,
          Ring: tokenInfo.Ring,
          RingType: tokenInfo.RingType,
          BioDiversityScale: tokenInfo.BioDiversityScale,
          CarniverousVegetation: tokenInfo.CarniverousVegetation,
          SecretBiosphere: tokenInfo.SecretBiosphere,
          Gaia: tokenInfo.Gaia,
          IntelligentMicrobiome: tokenInfo.IntelligentMicrobiome,
          ApexPredators: tokenInfo.ApexPredators,
          SentientLifeFormType: tokenInfo.SentientLifeFormType,
          FitnessFactor: tokenInfo.FitnessFactor,
          IntelligenceCapacity: tokenInfo.IntelligenceCapacity,
          ConciousnessAffinity: tokenInfo.ConciousnessAffinity,
          RarityScore: tokenInfo.RarityScore,
          Rank: tokenInfo.Rank,
          TokenOwner: itemInfo.tokenOwner,
          ItemID: parseInt(itemInfo.itemId),
          StartTime: parseInt(itemInfo.startTime),
          EndTime: parseInt(itemInfo.endTime),
          ReserveTokenPrice: parseInt(getBalanceNumber(itemInfo.reserveTokenPrice)),
          BuyoutTokenPrice: parseInt(getBalanceNumber(itemInfo.buyoutTokenPrice)),
          ListingType: parseInt(itemInfo.listingType),
          Highresimage: tokenInfo.Highresimage,
          Image: tokenInfo.Image,
          Neighbor1: tokenInfo.Neighbor1,
          Neighbor2: tokenInfo.Neighbor2,
          Neighbor3: tokenInfo.Neighbor3,
          Neighbor4: tokenInfo.Neighbor4,
          Neighbor5: tokenInfo.Neighbor5,
          Neighbor6: tokenInfo.Neighbor6,
          Neighbor7: tokenInfo.Neighbor7,
          Neighbor8: tokenInfo.Neighbor8,
          Neighbor9: tokenInfo.Neighbor9,
          Neighbor10: tokenInfo.Neighbor10,
          CivilizationAge: tokenInfo.CivilizationAge,
          Population: parseInt(tokenInfo.Population),
          PopGrowth: parseFloat(tokenInfo.PopGrowth),
          GovernmentType: tokenInfo.GovernmentType,
          EnergyOutput: tokenInfo.EnergyOutput,
          WealthIndex: tokenInfo.WealthIndex,
          MilitaryForce: tokenInfo.MilitaryForce,
          SpecialStatus: tokenInfo.SpecialStatus,
          HostilityLevel: tokenInfo.HostilityLevel,
          DiseaseIndex: tokenInfo.DiseaseIndex,
          EcologicalSynergy: tokenInfo.EcologicalSynergy,
          FitnessLevel: parseInt(tokenInfo.FitnessLevel),
          IntelligenceLevel: parseInt(tokenInfo.IntelligenceLevel),
          ConciousnessLevel: parseInt(tokenInfo.ConciousnessLevel),
          PopulationPoints: parseInt(tokenInfo.PopulationPoints),
          TechnologyPoints: parseInt(tokenInfo.TechnologyPoints),
          ConsciousnessPoints: parseInt(tokenInfo.ConsciousnessPoints),
          GovernmentPoints: parseInt(tokenInfo.GovernmentPoints),
          MilitaryPoints: parseInt(tokenInfo.MilitaryPoints),
        }
      );
    } catch (error) {
      console.error("createMarketItem Err: create active item", error);
    }
  } catch (error) {
    console.error("createMarketItem Event Err: add event info", error);
  }
}

module.exports = createMarketItem;
