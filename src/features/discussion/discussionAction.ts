import instance from "@/services";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDiscussionsByUser = createAsyncThunk(
  "discussions/fetchDiscussionsByUser",
  async ({ userId }: { userId: string }) => {
    const { data } = await instance.get(`/discussions/${userId}`);
    return data;
  }
);

export const createDiscussionByUser = createAsyncThunk(
  "discussions/createDiscussionByUser",
  async ({ userId, title }: { userId: string; title: String }) => {
    const { data } = await instance.post(`/discussions`, { userId, title });
    return data;
  }
);

export const updateActiveDiscussionId = createAsyncThunk(
  "discussions/updateActiveDiscussion",
  ({ discussionId }: { discussionId: string | undefined }) => {
    return discussionId;
  }
);
