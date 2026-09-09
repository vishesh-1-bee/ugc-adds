export const protect = async (req, res, next) => {
    try {
        const { userId } = req.auth();
        if (!userId) {
            return res.status(401).json({ message: "unauthorized" });
        }
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Unauthorized", error: error.message });
    }
};
