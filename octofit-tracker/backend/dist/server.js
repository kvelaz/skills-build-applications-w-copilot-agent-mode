"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const api_1 = __importDefault(require("./routes/api"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME?.trim();
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express_1.default.json());
app.use('/api', api_1.default);
app.get('/api/config', (_req, res) => {
    res.json({ apiBaseUrl, port, codespaces: Boolean(codespaceName) });
});
mongoose_1.default
    .connect(mongodbUri)
    .then(() => {
    console.log('MongoDB connected');
    app.listen(port, '0.0.0.0', () => {
        console.log(`Backend listening on port ${port}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection failed', error);
    process.exit(1);
});
