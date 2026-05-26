import { gql } from '@apollo/client';

const DriversQuery = gql`
query DriversQuery {
  drivers(orderBy: LAST_NAME_ASC) {
    id
    rowId
    firstName
    lastName
    nationalityCountryId
    nationalityCountry {
      id
      name
      alpha2Code
    }
    seasonDrivers {
      season {
        id
        year
      }
    }
  }
}
`;

export default DriversQuery;
