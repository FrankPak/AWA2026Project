import mongoose, { Document } from "mongoose";
interface ITopic extends Document {
    title: string;
    content: string;
    username: string;
    createdAt: Date;
}
declare const Topic: mongoose.Model<ITopic>;
export { Topic, ITopic };
//# sourceMappingURL=Topic.d.ts.map