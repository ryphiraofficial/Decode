const multer = require('multer');
const allowed = new Set(['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']);
module.exports = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 4 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => cb(allowed.has(file.mimetype) ? null : new Error('Only PDF, DOC, and DOCX résumés are allowed.'), allowed.has(file.mimetype))
});
