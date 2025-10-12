import express from "express";
import multer from 'multer';
import { askQuestionHandler, uploadPdf } from '../controller/pdf.controller.js';


const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single("pdf"), uploadPdf);

// router.post('/summarize/stream', sumarizePdf);

router.post('/ask', askQuestionHandler);

export const uploadpdf = router;