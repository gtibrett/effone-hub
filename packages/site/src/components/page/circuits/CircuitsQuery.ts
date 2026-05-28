import { gql } from '@apollo/client';

const CircuitQuery = gql`
query CircuitsListQuery {
  circuits(orderBy: FULL_NAME_ASC) {
    id
    rowId
    fullName
    name
    placeName
    country {
      id
      name
    }
    latitude
    longitude
    type
    direction
    races(orderBy: YEAR_DESC) {
      id
      year
      round
    }
  }
}
`;

export default CircuitQuery;
