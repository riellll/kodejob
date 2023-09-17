import mongoose, { Schema } from "mongoose";

const JobSchema = new Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    web_url: {
      type: String,
    },
    data: {
      type: Map,
      of: String,
    },
    email: {
      type: String,
    },
    tags: {
      type: [String],
      required: true,
      default: [],
    },
    logo: {
      type: String,
    },
  },
  { timestamps: true }
);

const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);

export default Job;
