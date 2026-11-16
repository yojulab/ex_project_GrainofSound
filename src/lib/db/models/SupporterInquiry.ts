import mongoose, { Schema, type Document, type Model } from "mongoose";

export type PreferredContactMethod = "message_kakao" | "phone_call";
export type SupportType = "regular" | "onetime";
export type SupporterInquiryStatus =
  | "received"
  | "guided_1to1"
  | "completed"
  | "archived";

/**
 * 후원회원(서포터즈) 가입 문의 모델
 * [법적 가드레일] 계좌번호, 결제수단, 카드정보 필드는 일체 포함하지 않는다.
 */
export interface ISupporterInquiry extends Document {
  supporterNameOrOrg: string;
  phone: string;
  preferredContactMethod: PreferredContactMethod;
  supportType: SupportType;
  cheeringMessage?: string;
  disclaimerAcknowledged: boolean;
  privacyAgreed: boolean;
  status: SupporterInquiryStatus;
  notificationSent: boolean;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const SupporterInquirySchema = new Schema<ISupporterInquiry>(
  {
    supporterNameOrOrg: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    preferredContactMethod: {
      type: String,
      enum: ["message_kakao", "phone_call"],
      required: true,
    },
    supportType: {
      type: String,
      enum: ["regular", "onetime"],
      required: true,
    },
    cheeringMessage: { type: String, trim: true, maxlength: 1000 },
    disclaimerAcknowledged: { type: Boolean, required: true, default: true },
    privacyAgreed: { type: Boolean, required: true, default: true },
    status: {
      type: String,
      enum: ["received", "guided_1to1", "completed", "archived"],
      default: "received",
    },
    notificationSent: { type: Boolean, default: false },
    ipAddress: { type: String, required: true },
    userAgent: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "supporterinquiries",
  }
);

export const SupporterInquiry: Model<ISupporterInquiry> =
  mongoose.models.SupporterInquiry ??
  mongoose.model<ISupporterInquiry>("SupporterInquiry", SupporterInquirySchema);
