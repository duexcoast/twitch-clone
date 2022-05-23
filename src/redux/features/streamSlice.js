import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { history } from "../../history";
import streams from "../../apis/streams";

export const createStream = createAsyncThunk(
  "streams/create",
  async (formValues, { getState }) => {
    try {
      const { userId } = getState().auth;
      const { data } = await streams.post("/streams", {
        ...formValues,
        userId,
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchAllStreams = createAsyncThunk(
  "streams/fetchAll",
  async () => {
    try {
      const { data } = await streams.get("/streams");
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchStreamById = createAsyncThunk(
  "streams/fetchById",
  async (id) => {
    try {
      const { data } = await streams.get(`/streams/${id}`);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const editStream = createAsyncThunk(
  "streams/edit",
  async (id, formValues) => {
    try {
      const { data } = await streams.put(`/streams/${id}`, formValues);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteStream = createAsyncThunk("streams/delete", async (id) => {
  try {
    await streams.delete(`/streams/${id}`);
  } catch (err) {
    console.log(err);
  }
});
const initialState = {
  stream: {},
  loading: false,
  error: null,
  edit: false,
};

const streamSlice = createSlice({
  name: "stream",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllStreams.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllStreams.fulfilled, (state, action) => {
      state.loading = false;
      state.stream = action.payload.reduce(
        (map, item) => ({ ...map, [item.id]: item }),
        {}
      );
    });
    builder.addCase(fetchAllStreams.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchStreamById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchStreamById.fulfilled, (state, action) => {
      state.loading = false;
      state.stream = { ...state.stream, [action.payload.id]: action.payload };
    });
    builder.addCase(fetchStreamById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createStream.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createStream.fulfilled, (state, action) => {
      state.loading = false;
      state.stream = { ...state.stream, [action.payload.id]: action.payload };
      history.push("/");
    });
    builder.addCase(createStream.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(editStream.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(editStream.fulfilled, (state, action) => {
      state.loading = false;
      state.stream = { ...state.stream, [action.payload.id]: action.payload };
    });
    builder.addCase(editStream.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteStream.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteStream.fulfilled, (state, action) => {
      state.loading = false;
      state.stream = delete state.stream[action.payload];
    });
    builder.addCase(deleteStream.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default streamSlice.reducer;
