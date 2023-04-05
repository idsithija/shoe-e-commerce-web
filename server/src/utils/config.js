import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const MONGOOSE_URL = process.env.MONGOOSE_URL;

export { PORT, MONGOOSE_URL };
