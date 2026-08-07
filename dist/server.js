"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./src/routes/index"));
const user_1 = __importDefault(require("./src/routes/user"));
const topic_1 = __importDefault(require("./src/routes/topic"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT) || 8001;
const mongoDB = "mongodb://127.0.0.1:27017/testdb";
mongoose_1.default.connect(mongoDB);
mongoose_1.default.Promise = Promise;
const testdb = mongoose_1.default.connection;
testdb.on("error", console.error.bind(console, "MongoDB connection error"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//app.use(morgan("dev"))
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use("/", index_1.default);
app.use("/api", topic_1.default);
app.use("/api/user", user_1.default);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//# sourceMappingURL=server.js.map