import { Op } from "sequelize";

//resolvers functions to fetch the actual data
const root = {
  // resolver for fetching all tracks
  tracks: async (_, { Track }) => {
    return await Track.findAll();
  },
  //resolver for fetching tracks by id
  track: async ({ id }, { Track }) => {
    return await Track.findByPk(id);
  },
  //resolver for searching tracks
  searchTracks: async ({ query }, { Track }) => {
    const searchTerm = query.toLowerCase();
    return await Track.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${searchTerm}%` } },
          { singer: { [Op.iLike]: `%${searchTerm}%` } },
        ],
      },
    });
  },

  addTrack: async ({ input }, { Track }) => {
    return await Track.create(input);
  },

  updateTrack: async ({ id, input }, { Track }) => {
    const track = await Track.findByPk(id);
    if (!track) {
      throw new Error("Track not found");
    }
    await track.update(input);
    return track;
  },

  deleteTrack: async ({ id }, { Track }) => {
    const track = await Track.findByPk(id);
    if (!track) {
      throw new Error("Track not found");
    }
    await track.destroy();
    //return true when its a success
    return true;
  },
  // get deleteTrack() {
  //   return this._deleteTrack;
  // },
  // set deleteTrack(value) {
  //   this._deleteTrack = value;
  // },
};

export default root;