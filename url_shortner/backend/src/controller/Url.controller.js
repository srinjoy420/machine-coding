import URL from "../model/Url.model.js";
import {nanoid} from "nanoid"


export const handelgenerateNewShortUrl = async (req, res) => {
    const { OriginalUrl } = req.body
    if (!OriginalUrl) {
        return res.status(400).json({ message: "the Originsal Url is must be required" })
    }
    try {
        const shortId = nanoid(8)
        await URL.create({ ShortUrl: shortId, OriginalUrl: req.body.OriginalUrl })
       return res.status(201).json({ shortUrl: `http://localhost:3000/api/v1/URLshort/${shortId}` })
    } catch (error) {
        console.log("there is a error in creating an url shortner");
        return res.status(500).json({ message: "Server error", error: error.message,shortId });


    }
}
export const handleredirect = async (req, res) => {
  const { shortId } = req.params;

  if (!shortId) {
    return res.status(400).json({ message: "the id is required" });
  }

  try {
    const url = await URL.findOneAndUpdate(
      { ShortUrl: shortId },
      {
        $inc: { clicks: 1 },
        $push: { visitHistory: { timeStamp: Date.now() } }
      },
      { new: true }
    );

    if (!url) {
      return res.status(404).json({ message: "cant find the url" });
    }

    return res.redirect(302, url.OriginalUrl);

  } catch (error) {
    console.log("Error in redirect:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};