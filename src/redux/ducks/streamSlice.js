import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import streams from "../../apis/streams";

export const createStream = createAsyncThunk(
  "streams/create",
  async (formValues) => {
    try {
      const { data } = await streams.post("/streams", formValues);
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createStream.pending, (state, action) => {});
    builder.addCase(createStream.fulfilled, (state, action) => {
      
    });
    builder.addCase(createStream.rejected, (state, action) => {});
  },
});
