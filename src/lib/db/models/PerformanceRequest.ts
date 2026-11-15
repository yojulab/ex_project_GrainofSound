import mongoose, { Schema, type Document, type Model } from "mongoose";

export type PerformanceEventType =
  | "welfare"
  | "festival"
  | "diplomatic"
  | "other";
export type PerformanceStatus =
  | "received"
  | "contacted"
  | "confirmed"
  | "archived";

export interface IPerformanceRequest extends Document {
  organization: string;
  contactName: string;
  contactPhone: string;
  preferredDatePlace: string;
  eventType: PerformanceEventType;
  notes?: string;
  status: PerformanceStatus;
  notificationSent: boolean;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const PerformanceRequestSchema = new Schema<IPerformanceRequest>(
  {
    organization: { type: String, required: true, trim: true, maxlength: 120 },
    contactName: { type: String, required: true, trim: true, maxlength: 60 },
    contactPhone: { type: String, required: true, trim: true, maxlength: 30 },
    preferredDatePlace: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    eventType: {
      type: String,
      enum: ["welfare", "festival", "diplomatic", "other"],
      required: true,
    },
    notes: { type: String, trim: true, maxlength: 1000 },
    status: {
      type: String,
      enum: ["received", "contacted", "confirmed", "archived"],
      default: "received",
    },
    notificationSent: { type: Boolean, default: false },
    ipAddress: { type: String, required: true },
    userAgent: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "performancerequests",
  }
);

export const PerformanceRequest: Model<IPerformanceRequest> =
  mongoose.models.PerformanceRequest ??
  mongoose.model<IPerformanceRequest>(
    "PerformanceRequest",
    PerformanceRequestSchema
  );
