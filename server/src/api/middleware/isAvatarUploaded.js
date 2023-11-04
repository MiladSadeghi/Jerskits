import { validationResult } from "express-validator";
import { validateUpdateUserAvatar } from "../../utils/validation.js";

export const isAvatarUploaded = [
  validateUpdateUserAvatar,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    } else {
      next();
    }
  },
];
