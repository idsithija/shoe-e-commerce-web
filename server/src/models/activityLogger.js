import mongoose, { Schema } from "mongoose";

const activityLoggerSchema = new Schema(
  {
    userId: { type: String, required: true },
    apiEndPoint: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

activityLoggerSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
  },
});

export default mongoose.model("activityLogger", activityLoggerSchema);
