const { request, gql } = require("graphql-request");
const { getBalanceNumber } = require("./utils");

const newSale = async function (event) {
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
        $NewSale_Seller:String,
        $NewSale_Buyer:String,
        $NewSale_Buyoutprice:Int
      ) {
        addEvent(
          EventName:$EventName,
          TxID: $TxID,
          TxOrigin: $TxOrigin,
          BlockTimestamp: $BlockTimestamp,
          BlockID: $BlockID,
          BlockNumber: $BlockNumber,
          TokenID: $TokenID,
          ItemID: $ItemID,
          NewSale_Seller: $NewSale_Seller,
          NewSale_Buyer: $NewSale_Buyer,
          NewSale_Buyoutprice: $NewSale_Buyoutprice
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
        "NewSale_Seller": eventItem.returnValues.seller,
        "NewSale_Buyer": eventItem.returnValues.buyer,
        "NewSale_Buyoutprice": parseInt(getBalanceNumber(eventItem.returnValues.buyoutPrice)),
      }
    );
  } catch (error) {
    console.error("New Sale Err: ", error);
  }
}

module.exports = newSale;
