"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const api_1 = __importDefault(require("./routes/api"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
app.use(express_1.default.json());
app.use('/api', api_1.default);
mongoose_1.default
    .connect(mongodbUri)
    .then(() => {
    console.log('MongoDB connected');
    app.listen(port, () => {
        console.log(`Backend listening on port ${port}`);
    });
})
    .catch((error) => {
    console.error('MongoDB connection failed', error);
    process.exit(1);
});
