import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
    title: string;
    description: string;
    image: string;
    tags: string[];
    github: string;
    demo?: string;
    order: number;
}

const projectSchema = new Schema<IProject>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tags: [{ type: String }],
    github: { type: String, required: true },
    demo: { type: String },
    order: { type: Number, default: 0 },
}, {
    timestamps: true,
});

export default mongoose.model<IProject>('Project', projectSchema);
