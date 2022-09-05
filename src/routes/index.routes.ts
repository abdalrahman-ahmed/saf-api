import { Router } from 'express';
import apiRoutes from './v1/index.routes';

const router: Router = Router();

router.use('/api/v1', apiRoutes);

export default router;
