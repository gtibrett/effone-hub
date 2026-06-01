import { gql } from '@apollo/client';

const DriversQuery = gql`
query DriversQuery {
  drivers(orderBy: LAST_NAME_ASC) {
    id
    firstName
    lastName
    nationalityCountryId
    totalRaceStarts
    totalRaceWins
    totalPodiums
    nationalityCountry {
      id
      name
      alpha2Code
    }
    seasonDrivers {
      season {
        year
      }
    }
  }
}
`;

export default DriversQuery;
