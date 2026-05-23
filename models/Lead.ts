import mongoose, { Schema, Model } from 'mongoose';

export interface ILead {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  sourcePage: string;
  createdAt: Date;
  syncedToGlobalControl: boolean;
  globalControlContactId?: string;
}

const LeadSchema = new Schema<ILead>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  sourcePage: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  syncedToGlobalControl: { type: Boolean, default: false },
  globalControlContactId: { type: String }
});

const Lead: Model<ILead> = mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);

export default Lead;
