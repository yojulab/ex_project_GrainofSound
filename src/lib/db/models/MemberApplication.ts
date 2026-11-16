import mongoose, { Schema, type Document, type Model } from "mongoose";

export type MemberSpecialty = "janggu" | "sogo" | "minyo" | "other";
export type MemberApplicationStatus =
  | "received"
  | "contacted"
  | "joined"
  | "archived";

export interface IMemberApplication extends Document {
  applicantName: string;
  phone: string;
  region: string;
  specialties: MemberSpecialty[];
  experienceAndIntro: string;
  privacyAgreed: boolean;
  status: MemberApplicationStatus;
  notificationSent: boolean;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const MemberApplicationSchema = new Schema<IMemberApplication>(
  {
    applicantName: { type: String, required: true, trim: true, maxlength: 60 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    region: { type: String, required: true, trim: true, maxlength: 100 },
    specialties: {
      type: [String],
      enum: ["janggu", "sogo", "minyo", "other"],
      required: true,
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length >= 1,
        message: "최소 1개 이상의 주요 분야를 선택해야 합니다.",
      },
    },
    experienceAndIntro: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1500,
    },
    privacyAgreed: { type: Boolean, required: true, default: true },
    status: {
      type: String,
      enum: ["received", "contacted", "joined", "archived"],
      default: "received",
    },
    notificationSent: { type: Boolean, default: false },
    ipAddress: { type: String, required: true },
    userAgent: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "memberapplications",
  }
);

export const MemberApplication: Model<IMemberApplication> =
  mongoose.models.MemberApplication ??
  mongoose.model<IMemberApplication>(
    "MemberApplication",
    MemberApplicationSchema
  );
