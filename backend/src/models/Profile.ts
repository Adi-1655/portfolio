import mongoose, { Document, Schema } from 'mongoose';

export interface IProfile extends Document {
    name: string;
    title: string;
    heroSubtitle: string;
    aboutText1: string;
    aboutText2: string;
    education: {
        degree: string;
        school: string;
        year: string;
    };
    achievements: string;
    resumeUrl: string;
    profileImage: string;
    imageScale: number;
    imagePosX: number;
    imagePosY: number;
    githubUrl: string;
    linkedinUrl: string;
    email: string;
}

const profileSchema = new Schema<IProfile>({
    name: { type: String, required: true },
    title: { type: String, required: true },
    heroSubtitle: { type: String, required: true },
    aboutText1: { type: String, required: true },
    aboutText2: { type: String, required: true },
    education: {
        degree: { type: String },
        school: { type: String },
        year: { type: String },
    },
    achievements: { type: String },
    resumeUrl: { type: String },
    profileImage: { type: String },
    imageScale: { type: Number, default: 1 },
    imagePosX: { type: Number, default: 50 },
    imagePosY: { type: Number, default: 50 },
    githubUrl: { type: String },
    linkedinUrl: { type: String },
    email: { type: String },
}, {
    timestamps: true,
});

export default mongoose.model<IProfile>('Profile', profileSchema);
