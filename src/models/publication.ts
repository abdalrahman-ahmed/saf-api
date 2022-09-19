import { model, Schema } from "mongoose";

interface Publication {
    title: {
        ar: string,
        en: string,
    },
    file: string,
    image: string,
    parent: string,
    status: "active" | "inactive"
}

const publicationSchema = new Schema<Publication>(
    {
        title: {
            ar: {
                type: String,
                required: true,
            },
            en: {
                type: String,
                required: true,
            },
        },
        file: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: "/image/resources/docs-thumb.jpg",
        },
        parent: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            default: "inactive",
            enum: ["active", "inactive"],
        },
    },
    {
        timestamps: true,
    }
);

export default model<Publication>("Publication", publicationSchema);
