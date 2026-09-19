import app from "./app.js";
import connectDB from "./config/ds.js";
import config from "./config/env.js";

const port = config.PORT;

await connectDB();
app.listen(port,() => {
    console.log(`Server is running on ${port}`);
})