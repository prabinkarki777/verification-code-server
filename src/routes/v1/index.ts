import { Router } from 'express';
import { verifyCode } from '@controllers/verificationController';

const router = Router();

router.post('/verify', verifyCode);

export default router;
