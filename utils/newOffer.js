const { request, gql } = require("graphql-request");
const { getBalanceNumber } = require("./utils");

const newOffer = async function (event) {
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
          $ItemID:Int!,
          $NewOffer_Offeror:String,
          $NewOffer_OfferPrice:Int,
          $NewOffer_listingType:Int
        ) {
          addEvent(
            EventName: $EventName,
            TxID: $TxID,
            TxOrigin: $TxOrigin,
            BlockTimestamp: $BlockTimestamp,
            BlockID: $BlockID,
            BlockNumber: $BlockNumber,
            TokenID: $TokenID,
            ItemID:$ItemID,
            NewOffer_Offeror:$NewOffer_Offeror,
            NewOffer_OfferPrice:$NewOffer_OfferPrice,
            NewOffer_listingType:$NewOffer_listingType
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
        "NewOffer_Offeror": eventItem.returnValues.offeror,
        "NewOffer_OfferPrice": parseInt(getBalanceNumber(eventItem.returnValues.offerPrice)),
        "NewOffer_listingType": parseInt(eventItem.returnValues.listingType),
      }
    );
  } catch (error) {
    console.error("New Offer Err: " + error);
  }
}

module.exports = newOffer;
