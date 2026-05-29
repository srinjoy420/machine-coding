import {Router} from "express"
import { handelgenerateNewShortUrl, handleredirect } from "../controller/Url.controller.js"

const UrlRouter=Router()
UrlRouter.post("/",handelgenerateNewShortUrl)
UrlRouter.get("/:shortId",handleredirect)

export default UrlRouter