import { gql } from '@apollo/client';

const DriversQuery = gql`
query DriversQuery {
  drivers(orderBy: LAST_NAME_ASC) {
    id
    firstName
    lastName
    abbreviation
    nationalityCountryId
    totalRaceStarts
    totalRaceWins
    totalPodiums
    bio {
      thumbnailUrl
    }
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
