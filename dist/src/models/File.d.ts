import mongoose, { Document } from 'mongoose';
interface IFile extends Document {
    filename: string;
    content: string;
    viewLink?: string;
    everyoneReadPermission?: boolean;
    createdAt: Date;
}
declare const File: mongoose.Model<IFile>;
export { File, IFile };
//# sourceMappingURL=File.d.ts.map