export const topics = {
    // a user receives messages from its friend and sends to it in this way
    receiveMessage: (friend: string, userName: string) => "chat/"+friend+"/"+userName,
    sendMessage: (userName: string, friend: string) => "chat/"+userName+"/"+friend,
};
