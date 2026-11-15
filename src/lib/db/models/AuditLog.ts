import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IAuditLog extends Document {
  actorUsername: string;
  action: string;
  targetType: string;
  targetId?: string;
  detail?: string;
  ipAddress: string;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    actorUsername: { type: String, required: true, trim: true },
    action: { type: String, required: true, trim: true },
    targetType: { type: String, required: true, trim: true },
    targetId: { type: String, trim: true },
    detail: { type: String, trim: true, maxlength: 500 },
    ipAddress: { type: String, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    collection: "auditlogs",
  }
);

export const AuditLog: Model<IAuditLog> =
  mongoose.models.AuditLog ??
  mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);
