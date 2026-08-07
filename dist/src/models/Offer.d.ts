import mongoose, { Document } from "mongoose";
interface IOffer extends Document {
    title: string;
    description: string;
    price: number;
    imageId?: string;
}
declare const Offer: mongoose.Model<IOffer>;
export { Offer, IOffer };
//# sourceMappingURL=Offer.d.ts.map