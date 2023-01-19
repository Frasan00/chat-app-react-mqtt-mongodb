import { connect } from "mqtt";

function connectMqtt(){
    const client = connect("ws://broker.hivemq.com", {port: 8000, path: "/mqtt"});
    client.on("connect", () => console.log("Client connected to the broker"));
    client.on("error", () => console.log("A client error occurred"));
    client.on("close", () => console.log("Client disconnected"));
    return client;
};

export default connectMqtt;