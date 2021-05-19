import { Router } from "express";

import { surveysRouter } from "./surveys.routes";
import { surveysUsersRouter } from "./surveysUsers.routes";
import { usersRouter } from "./users.routes";

const router = Router();

router.use("/users", usersRouter);
router.use("/surveys", surveysRouter);
router.use("/surveys-users", surveysUsersRouter);

export { router };
