const { request, gql } = require("graphql-request");

const transfer = async function (event) {
  // console.log(event)
  const tokenId = parseInt(event.returnValues.tokenId);
  const tokenHolder = event.returnValues.to;
  await request(
    "http://localhost:5000/graphql",
    gql`
      mutation updateTokenHolder(
        $PlanetID: Int!,
        $TokenHolder: String
      ) {
        updateTokenHolder(
          PlanetID: $PlanetID,
          TokenHolder: $TokenHolder
        ) {
          PlanetID
        }
      }
    `,
    {
      "PlanetID": tokenId,
      "TokenHolder": tokenHolder,
    }
  );
}

module.exports = transfer;
