import mongoose, { Document, Schema } from 'mongoose';

export interface ISkill extends Document {
    title: string;
    skills: string[];
    order: number;
}

const skillSchema = new Schema<ISkill>({
    title: { type: String, required: true },
    skills: { type: [String], default: [] },
    order: { type: Number, default: 0 }
}, {
    timestamps: true,
});

export default mongoose.model<ISkill>('Skill', skillSchema);
