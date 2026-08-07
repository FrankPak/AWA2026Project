import { Router } from "express";
import { Offer } from "./models/Offer.js";
import upload from "./middleware/multer-config.js";
import { Image } from "./models/Image.js";
const router = Router();
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        console.log(req.body);
        const title = req.body.title;
        const description = req.body.description;
        const price = req.body.price;
        if (!req.file) {
            console.log("noFile");
            const offer = new Offer({
                title: title,
                description: description,
                price: price
            });
            await offer.save();
            return res.status(201).json({ message: `Offer added successfully.` });
        }
        console.log("File found");
        const imgPath = req.file.path.replace("public", "");
        const image = new Image({
            filename: req.file.filename,
            path: imgPath
        });
        await image.save();
        const offer = new Offer({
            title: title,
            description: description,
            price: price,
            imageId: image._id.toString() // image id to offer
        });
        await offer.save();
        return res.status(201).json({ message: `Offer added successfully.` });
    }
    catch (error) {
        console.error(`Error while saving offer: ${error}`);
        return res.status(500).json({ error: "Internal server error" });
    }
});
router.get('/offers', async (req, res) => {
    try {
        const offers = await Offer.find();
        const resOffers = await Promise.all(offers.map(async (offer) => {
            const image = await Image.findById(offer.imageId);
            return {
                title: offer.title,
                description: offer.description,
                price: offer.price,
                imagePath: image ? image.path : null
            };
        }));
        return res.status(200).json(resOffers);
    }
    catch (error) {
        console.error(`Error while fetching offers: ${error}`);
        return res.status(500).json({ error: "Internal server error" });
    }
});
export default router;
//# sourceMappingURL=index.js.map