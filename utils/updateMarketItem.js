const { request, gql } = require("graphql-request");
const { getBalanceNumber } = require("./utils");

const updateMarketItem = async function (event) {
  const eventItem = event;
  // console.log(event)
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
        $TokenOwner: String,
        $Create_reserveTokenPrice: Int,
        $Create_buyoutTokenPrice: Int,
        $Create_endTime: Int!,
        $Create_startTime: Int!
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
          Create_reserveTokenPrice: $Create_reserveTokenPrice,
          Create_buyoutTokenPrice: $Create_buyoutTokenPrice,
          Create_startTime: $Create_startTime,
          Create_endTime: $Create_endTime
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
        "TokenOwner": eventItem.returnValues.lister,
        "Create_reserveTokenPrice": parseInt(getBalanceNumber(eventItem.returnValues.updatedItem.reserveTokenPrice)),
        "Create_buyoutTokenPrice": parseInt(getBalanceNumber(eventItem.returnValues.updatedItem.buyoutTokenPrice)),
        "Create_startTime": parseInt(eventItem.returnValues.updatedItem.startTime),
        "Create_endTime": parseInt(eventItem.returnValues.updatedItem.endTime)
      }
    );
    try {
      await request(
        "http://localhost:5000/graphql",
        gql`
        mutation updateItem(
          $PlanetID: Int!,
          $StartTime: Int,
          $EndTime: Int,
          $ReserveTokenPrice: Int,
          $BuyoutTokenPrice: Int,
        ) {
          updateItem(
            PlanetID: $PlanetID,
            StartTime: $StartTime,
            EndTime: $EndTime,
            ReserveTokenPrice: $ReserveTokenPrice,
            BuyoutTokenPrice: $BuyoutTokenPrice,
          ) {
            PlanetID
          }
        }
        `,
        {
          "PlanetID": parseInt(eventItem.returnValues.tokenId),
          "StartTime": parseInt(eventItem.returnValues.updatedItem.startTime),
          "EndTime": parseInt(eventItem.returnValues.updatedItem.endTime),
          "ReserveTokenPrice": parseInt(getBalanceNumber(eventItem.returnValues.updatedItem.reserveTokenPrice)),
          "BuyoutTokenPrice": parseInt(getBalanceNumber(eventItem.returnValues.updatedItem.buyoutTokenPrice)),
        }
      );
    } catch (error) {
      console.error("updateMarketItem updateItem Err: ", error)
    }
  } catch (error) {
    console.error("updateMarketItem addEvent Err: ", error)
  }
}

module.exports = updateMarketItem;
