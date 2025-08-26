import { Request, Response } from "express";
import moment from "moment-timezone";

export const getTimeNow = (req: Request, res: Response) => {
    const { tz } = req.query;

    if (!tz || typeof tz !== "string") {
        return res.status(400).json({ error: "Timezone (tz) query param is required" });
    }

    try {
        const now = moment().tz(tz).format("YYYY-MM-DD HH:mm:ss");
        return res.json({ timezone: tz, now });
    } catch (err) {
        return res.status(400).json({ error: "Invalid timezone format" });
    }
};
