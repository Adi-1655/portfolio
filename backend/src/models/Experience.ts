import mongoose, { Document, Schema } from 'mongoose';

export interface IExperience extends Document {
    role: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
    order: number;
}

const experienceSchema = new Schema<IExperience>({
    role: { type: String, required: true },
    company: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, default: 0 },
}, {
    timestamps: true,
});

export default mongoose.model<IExperience>('Experience', experienceSchema);
