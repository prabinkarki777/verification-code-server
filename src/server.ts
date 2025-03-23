import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

// Middleware setup
app.use(express.json());
// app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Sample Route
app.get('/', (req: Request, res: Response) => {
  res.send('OTP Verification App - Server is working!');
});

// OTP Verification Route
app.post('/verify-otp', (req: Request, res: Response) => {
  const { code }: { code: string } = req.body;

  if (code.length !== 6 || isNaN(Number(code)) || code[5] === '7') {
    res.status(400).json({ error: 'Verification Error' });
  }

  res.status(200).json({ message: 'OTP Verified Successfully' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
