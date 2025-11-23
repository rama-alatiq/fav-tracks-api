import {buildSchema} from "graphql";

//define the schema using (SDL)

const schema = buildSchema(
  `
    type Track{
    #non-nullable fields
    id:ID!
    name:String!
    singer:String!
    genre:String!
    }

    type Query{
    tracks:[Track!]!
    track(id:ID!):Track
    searchTracks(query:String!):[Track!]!
    
    }

    #input type for adding or updating tracks
    input TrackInput{
    name:String
    singer:String
    genre:String
    }

    #mutations that are used to modify data
    type Mutation{
    addTrack(input:TrackInput!):Track!
    updateTrack(id:ID!,input:TrackInput!):Track
    deleteTrack(id:ID!):Boolean
    }

    `
);

export default schema;