const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} = graphql;

//Events
const EventType = new GraphQLObjectType({
  name: "Event",
  fields: () => ({
    EventName: { type: GraphQLString },
    TxID: { type: GraphQLString },
    TxOrigin: { type: GraphQLString },
    BlockTimestamp: { type: GraphQLInt },
    BlockID: { type: GraphQLString },
    BlockNumber: { type: GraphQLInt },
    TokenID: { type: GraphQLInt },
    ItemID: { type: GraphQLInt },
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
  })
})

module.exports = EventType;
