import api from "./api";

const Playlist = {
  create: (data) => {
    return api.post("/playlists", data);
  },
  store: (id, idSong, data) => {
    return api.post(`playlists/${id}/songs/${idSong}`, data);
  },
  deleteSong: (id, idSong, data) => {
    return api.delete(`playlists/${id}/songs/${idSong}`, data);
  },
  update: (id, data) => {
    return api.post(`/playlists/${id}`, data);
  },
  delete: (id, data) => {
    return api.delete(`/playlists/${id}`, data);
  },
};

export default Playlist;
