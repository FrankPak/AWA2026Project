import mongoose, {Document, Schema} from 'mongoose'

interface IFile extends Document {
    filename: string
    content: string
    viewLink?: string
    everyoneReadPermission?: boolean
    createdAt: Date
}
//TODO ADD editing and no double editing possibility
const fileSchema: Schema = new Schema({
    filename: {type: String, required: true},
    content: {type: String, required: true},
    viewLink: {type: String, required: false},
    everyoneReadPermission: {type: Boolean, required: false, default: false},
    createdAt: {type: Date}
})

const File: mongoose.Model<IFile> = mongoose.model<IFile>('File', fileSchema)
export { File, IFile }