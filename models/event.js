const mongoose = require('mongoose');
const Schema = mongoose.Schema

const eventSchema = new Schema({
  EventName: String,
  TxID: String,
  TxOrigin: String,
  BlockTimestamp: Number,
  BlockID: String,
  BlockNumber: Number,
  TokenID: Number,
  ItemID: Number,
  TokenOwner: String,
  Create_startTime: Number,
  Create_endTime: Number,
  Create_reserveTokenPrice: Number,
  Create_buyoutTokenPrice: Number,
  Create_listingType: Number,
  NewSale_Seller: String,
  NewSale_Buyer: String,
  NewSale_Buyoutprice: Number,
  NewOffer_Offeror: String,
  NewOffer_OfferPrice: Number,
  NewOffer_listingType: Number,
  AuctionClosed_AuctionCreator: String,
  AuctionClosed_WinningBidder: String,
  AuctionClosed_Cancelled: Boolean,
  Removed_TokenOwner: String
})

module.exports = mongoose.model('Event', eventSchema);
