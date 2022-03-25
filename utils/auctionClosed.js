const { request, gql } = require("graphql-request");

const auctionClosed = async function (event) {
  // console.log(event)
  const eventItem = event;
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
          $AuctionClosed_AuctionCreator: String,
          $AuctionClosed_WinningBidder: String,
          $AuctionClosed_Cancelled: Boolean
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
            AuctionClosed_AuctionCreator: $AuctionClosed_AuctionCreator,
            AuctionClosed_WinningBidder: $AuctionClosed_WinningBidder,
            AuctionClosed_Cancelled: $AuctionClosed_Cancelled
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
        "BlockNumber": eventItem.meta.blockNumber,
        "TokenID": parseInt(eventItem.returnValues.tokenId),
        "ItemID": parseInt(eventItem.returnValues.itemId),
        "AuctionClosed_AuctionCreator": eventItem.returnValues.auctionCreator,
        "AuctionClosed_WinningBidder": eventItem.returnValues.winningBidder,
        "AuctionClosed_Cancelled": eventItem.returnValues.cancelled,
      }
    );
  } catch (error) {
    console.error("Auctions Closed Err: ", error);
  }
}

module.exports = auctionClosed;
