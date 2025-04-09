const Image = require("../model/Image");

const setImage = async (req) => {
    try {
        console.log("📸 setImage called with file:", req.file);

        const newImage = new Image({
            filename: req.file.originalname,
            contentType: req.file.mimetype,  // ✅ Assure-toi que c'est bien `buffer`
            path: req.file.path
        });

        const savedImage = await newImage.save();
        console.log("✅ Image saved:", savedImage);
        return savedImage;
    } catch (error) {
        console.error("❌ Error adding image:", error);
        return null;
    }
};
const getImage=async (req,res)=>{

    try {
        const image = await Image.findById(req.params.id);
        res.set("Content-Type", image.contentType);
        res.send(image.imageData);
    } catch (error) {
        res.status(404).send("Image not found");
    }
};   

module.exports={setImage, getImage}