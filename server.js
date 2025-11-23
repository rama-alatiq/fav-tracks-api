//commonJS, u could write it in Es module
import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schemas/schema.js";
import root from "./resolvers/track.js";
import { connectDb, Track } from "./config/database.js"; // <-- 1. Import from database config

//set up the express server
const app = express();

// 2. Connect to the database when the server starts
connectDb();

//set up the graphql endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    context: { Track }, // <-- 3. Pass the initialized Track model to context
    graphiql: true,
  })
);

const PORT = 3000;
app.listen(PORT, () => {
  //use backtick when using the f string
  console.log(`server running at http://localhost:${PORT}/graphql`);
});


//sample data
// exports.favTracks = [
//   {
//     id: 1,
//     name: "Stressed Out",
//     singer: "Twenty One Pilots",
//     genre: "Alternative hip hop, alternative rock, and rap rock",
//   },
//   {
//     id: 2,
//     name: "I Don't Love You",
//     singer: "My Chemical Romance",
//     genre: "alternative rock",
//   },
//   {
//     id: 3,
//     name: "Let Down",
//     singer: "Radiohead",
//     genre: "alternative rock and art rock",
//   },
//   {
//     id: 4,
//     name: "In My veins",
//     singer: "Andrew Belle",
//     genre: "alternative rock/Pop and Pop Rock",
//   },
// ];