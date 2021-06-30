import { TConfiguration } from "../types/configuration.type";

export default (): TConfiguration => ({
    SERVER: {
        port: +process.env.SERVER_PORT,
        secret: process.env.SERVER_SECRET,
    },
});
