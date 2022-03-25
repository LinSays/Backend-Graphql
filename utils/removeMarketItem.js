const { request, gql } = require("graphql-request");

const removeMarketItem = async function (event, db) {
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
          $Removed_TokenOwner: String
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
            Removed_TokenOwner: $Removed_TokenOwner
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
        "Removed_TokenOwner": eventItem.returnValues.lister,
      }
    );
    try {
      await request(
        "http://localhost:5000/graphql",
        gql`
          mutation removeItem(
            $PlanetID: Int!
          ) {
            removeItem(
              PlanetID: $PlanetID
            )
          }
        `,
        {
          "PlanetID": parseInt(eventItem.returnValues.tokenId)
        }
      );
    } catch (error) {
      console.error("removeMarketItem Err: ", error);
    }
  } catch (error) {
    console.error("removeMarketItem add event Err: ", error);
  }
}

module.exports = removeMarketItem;
