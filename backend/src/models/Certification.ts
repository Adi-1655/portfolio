import mongoose, { Document, Schema } from 'mongoose';

export interface ICertification extends Document {
    title: string;
    issuer: string;
    date: string;
    fileUrl: string;
    order: number;
}

const certificationSchema = new Schema<ICertification>({
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    date: { type: String, required: true },
    fileUrl: { type: String, required: true },
    order: { type: Number, default: 0 },
}, {
    timestamps: true,
});

export default mongoose.model<ICertification>('Certification', certificationSchema);
