import mongoose, { Schema, type Document, type Model } from "mongoose";

/**
 * 단체 기본 정보(Footer 등 대외 표기용)
 * [법적 가드레일] 후원 계좌번호 관련 필드는 절대 포함하지 않는다.
 */
export interface ISiteConfig extends Document {
  key: string;
  organizationName: string;
  legalDesignation: string;
  location: string;
  representativeName: string;
  registrationNumber: string;
  contactPhone: string;
  contactEmail: string;
  kakaoOpenChatUrl: string;
  updatedAt: Date;
}

const SiteConfigSchema = new Schema<ISiteConfig>(
  {
    key: { type: String, required: true, unique: true, default: "main" },
    organizationName: { type: String, required: true, trim: true },
    legalDesignation: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    representativeName: { type: String, required: true, trim: true },
    registrationNumber: { type: String, required: true, trim: true },
    contactPhone: { type: String, required: true, trim: true },
    contactEmail: { type: String, required: true, trim: true },
    kakaoOpenChatUrl: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
    collection: "siteconfigs",
  }
);

export const SiteConfig: Model<ISiteConfig> =
  mongoose.models.SiteConfig ??
  mongoose.model<ISiteConfig>("SiteConfig", SiteConfigSchema);
