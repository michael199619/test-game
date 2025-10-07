export const TRANSPORT_USER_KAFKA = 'TRANSPORT_USER_KAFKA';
export const TRASPORT_USER_GROUP = 'TRANSPORT_USER_GROUP';

export enum UserTopics {
    ADD_BALANCE_FOR_USER = 'user.get.balance',
    GET_ALL_USERS = 'user.get.all',
    GET_USER = 'user.get',
}

export const userTopics = Object.values(UserTopics);