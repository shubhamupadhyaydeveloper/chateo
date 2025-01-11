import moment from 'moment';

export const formatChatDate = (timestamp:any) => {
    return moment(timestamp).format('h:mm:A');
}