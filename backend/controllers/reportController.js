import Report from '../models/Report.js';
import Patient from '../models/Patient.js';
import axios from 'axios';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc    Get reports for a patient
// @route   GET /api/reports/patient/:patientId
// @access  Private
export const getPatientReports = async (req, res) => {
    try {
        const { patientId } = req.params;
        const { type, category } = req.query;

        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }

        let query = { patientId };
        if (type) query.type = type;
        if (category) query.category = category;

        const reports = await Report.find(query)
            .sort({ timestamp: -1 })
            .populate('uploadedBy', 'name email');

        res.status(200).json({
            success: true,
            count: reports.length,
            data: reports
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single report
// @route   GET /api/reports/:id
// @access  Private
export const getReport = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id)
            .populate('patientId', 'name patientId')
            .populate('uploadedBy', 'name email');

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        res.status(200).json({
            success: true,
            data: report
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Create text report
// @route   POST /api/reports/text
// @access  Private
export const createTextReport = async (req, res) => {
    try {
        const { patientId, title, content, category, description, tags } = req.body;

        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }

        const report = await Report.create({
            patientId,
            title,
            type: 'text',
            content,
            category,
            description,
            tags,
            uploadedBy: req.user._id
        });

        res.status(201).json({
            success: true,
            message: 'Text report created successfully',
            data: report
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Upload file report (image/PDF)
// @route   POST /api/reports/upload
// @access  Private
export const uploadFileReport = async (req, res) => {
    console.log('📤 Upload request received (Memory Mode)');
    try {
        if (!req.file) {
            console.log('❌ No file in request');
            return res.status(400).json({
                success: false,
                message: 'Please upload a file'
            });
        }

        console.log('✅ File received in buffer:', {
            originalname: req.file.originalname,
            size: req.file.size,
            mimetype: req.file.mimetype
        });

        const { patientId, title, category, description, tags } = req.body;

        const patient = await Patient.findById(patientId);
        if (!patient) {
            console.log('❌ Patient not found');
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }

        console.log('✅ Patient found:', patient.name);

        // Convert buffer to Base64 data URL
        const base64Data = req.file.buffer.toString('base64');
        const dataUrl = `data:${req.file.mimetype};base64,${base64Data}`;

        console.log('📝 Creating report in database with Base64 content...');

        // Parse tags safely
        let parsedTags = [];
        if (tags) {
            try {
                parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
            } catch (parseError) {
                console.log('⚠️ Tags parsing error, using empty array:', parseError.message);
                parsedTags = [];
            }
        }

        const report = await Report.create({
            patientId,
            title,
            type: req.file.mimetype === 'application/pdf' ? 'pdf' : 'image',
            category,
            description,
            tags: parsedTags,
            fileUrl: dataUrl, // Store Base64 string directly in database
            fileName: req.file.originalname,
            fileSize: req.file.size,
            mimeType: req.file.mimetype,
            uploadedBy: req.user._id
        });

        console.log('✅ Report created in database (Base64):', report._id);

        res.status(201).json({
            success: true,
            message: 'File uploaded and saved to database successfully',
            data: report
        });
    } catch (error) {
        console.error('❌ Upload error:', error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update report
// @route   PUT /api/reports/:id
// @access  Private
export const updateReport = async (req, res) => {
    try {
        let report = await Report.findById(req.params.id);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        // Only allow updating certain fields
        const { title, description, tags, content, category } = req.body;

        if (title) report.title = title;
        if (description) report.description = description;
        if (tags) report.tags = tags;
        if (category) report.category = category;
        if (content && report.type === 'text') report.content = content;

        await report.save();

        res.status(200).json({
            success: true,
            message: 'Report updated successfully',
            data: report
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete report
// @route   DELETE /api/reports/:id
// @access  Private
export const deleteReport = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        // Memory Mode: No file on disk to delete

        await report.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Report deleted successfully',
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Download report file
// @route   GET /api/reports/:id/download
// @access  Private
export const downloadReport = async (req, res) => {
    try {
        console.log('📥 Download request (Memory Mode) for report ID:', req.params.id);

        const report = await Report.findById(req.params.id);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        if (!report.fileUrl || !report.fileUrl.startsWith('data:')) {
            console.log('❌ Report has no valid Base64 data');
            return res.status(400).json({
                success: false,
                message: 'This report has no valid file data to download'
            });
        }

        // Decode Base64 string back to binary
        const base64String = report.fileUrl.split(',')[1];
        const buffer = Buffer.from(base64String, 'base64');

        console.log('✅ Sending buffered file download');
        res.setHeader('Content-Type', report.mimeType || 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename="${report.fileName || 'report'}"`);
        res.send(buffer);
    } catch (error) {
        console.error('❌ Download error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Extract data from report image using AI
// @route   POST /api/reports/:id/extract
// @access  Private
export const extractReportData = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        if (report.type !== 'image') {
            return res.status(400).json({
                success: false,
                message: 'Data extraction is only supported for image reports'
            });
        }

        if (!report.fileUrl || !report.fileUrl.startsWith('data:')) {
            return res.status(400).json({
                success: false,
                message: 'Report has no valid image data for extraction'
            });
        }

        // Extract Base64 part from Data URL
        const base64Image = report.fileUrl.split(',')[1];

        // Send to AI service for extraction
        const aiServiceUrl = process.env.AI_SERVICE_URL;
        if (!aiServiceUrl) {
            return res.status(503).json({
                success: false,
                message: 'AI service URL not configured'
            });
        }

        console.log('🤖 Sending Base64 to AI service for extraction (Memory Mode)...');
        const aiResponse = await axios.post(`${aiServiceUrl}/api/extract-report`, {
            image: base64Image
        }, {
            timeout: 60000  // 60 second timeout for AI processing
        });

        if (!aiResponse.data.success) {
            return res.status(500).json({
                success: false,
                message: 'AI extraction failed'
            });
        }

        console.log('✅ Extraction successful');

        // Return extracted data for user review (NOT saved to DB yet)
        res.status(200).json({
            success: true,
            message: 'Data extracted successfully. Please review and confirm.',
            data: {
                reportId: report._id,
                patient_info: aiResponse.data.data.patient_info,
                results: aiResponse.data.data.results,
                extractedAt: aiResponse.data.data.extractedAt
            }
        });
    } catch (error) {
        console.error('❌ Extraction error:', error.message);
        const message = error.response?.data?.detail || error.message || 'Extraction failed';
        res.status(500).json({
            success: false,
            message
        });
    }
};

// @desc    Confirm and save extracted data to database
// @route   POST /api/reports/:id/confirm-extraction
// @access  Private
export const confirmExtractedData = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        const { patient_info, results } = req.body;

        if (!patient_info || !results) {
            return res.status(400).json({
                success: false,
                message: 'patient_info and results are required'
            });
        }

        // Save the confirmed extracted data
        report.extractedData = {
            patientInfo: {
                name: patient_info.Name || '',
                age: patient_info.Age || '',
                gender: patient_info.Gender || '',
                date: patient_info.Date || ''
            },
            results: results.map(r => ({
                parameter: r.Parameter || '',
                value: r.Value || '',
                unit: r.Unit || '',
                referenceRange: r['Reference Range'] || ''
            })),
            extractedAt: new Date(),
            confirmedAt: new Date(),
            confirmedBy: req.user._id
        };

        report.aiProcessed = true;

        await report.save();

        console.log('✅ Extracted data confirmed and saved for report:', report._id);

        res.status(200).json({
            success: true,
            message: 'Extracted data confirmed and saved successfully',
            data: report
        });
    } catch (error) {
        console.error('❌ Confirm extraction error:', error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
