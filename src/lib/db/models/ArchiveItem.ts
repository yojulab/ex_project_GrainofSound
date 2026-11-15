import mongoose, { Schema, type Document, type Model } from "mongoose";

export type ArchiveCategory = "welfare" | "festival";
export type ArchiveAspectRatio = "1:1" | "4:5";

export interface IArchiveItem extends Document {
  category: ArchiveCategory;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  aspectRatio: ArchiveAspectRatio;
  sortOrder: number;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ArchiveItemSchema = new Schema<IArchiveItem>(
  {
    category: {
      type: String,
      enum: ["welfare", "festival"],
      required: true,
    },
    title: { type: String, required: true, trim: true, maxlength: 100 },
    subtitle: { type: String, required: true, trim: true, maxlength: 140 },
    description: { type: String, required: true, trim: true, maxlength: 600 },
    imageUrl: { type: String, required: true, trim: true },
    imageAlt: { type: String, required: true, trim: true, maxlength: 200 },
    aspectRatio: {
      type: String,
      enum: ["1:1", "4:5"],
      default: "4:5",
    },
    sortOrder: { type: Number, default: 0 },
    isPublic: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    collection: "archiveitems",
  }
);

export const ArchiveItem: Model<IArchiveItem> =
  mongoose.models.ArchiveItem ??
  mongoose.model<IArchiveItem>("ArchiveItem", ArchiveItemSchema);
