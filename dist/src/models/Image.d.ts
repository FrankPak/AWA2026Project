import mongoose, { Document } from "mongoose";
interface IImage extends Document {
    filename: string;
    path: string;
}
declare const Image: mongoose.Model<IImage>;
export { Image, IImage };
//# sourceMappingURL=Image.d.ts.map