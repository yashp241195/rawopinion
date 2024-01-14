import { gql, } from '@apollo/client';

const GET_NOTIFICATION_QUERY = gql`
  query GetNotifications(latestdate:String){
    getNotifications(latestdate:$latestdate)
  }
`;

const DELETE_NOTIFICATION_QUERY = gql`
  mutation DeleteNotification(id:String){
    deleteNotification(id:$id)
  }
`;

export { GET_NOTIFICATION_QUERY, DELETE_NOTIFICATION_QUERY }