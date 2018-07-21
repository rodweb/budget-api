"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const debug_1 = __importDefault(require("debug"));
const bodyParser = __importStar(require("body-parser"));
const controllers_1 = require("./controllers");
debug_1.default('ts-express:server');
class App {
    constructor() {
        this.app = express_1.default();
        this.middleware();
        this.routes();
        this.serve();
    }
    middleware() {
        this.app.use(morgan_1.default('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/api/transactions', controllers_1.TransactionController);
    }
    serve() {
        const port = process.env.PORT || 3000;
        this.app.listen(port, () => {
            console.log(`Listening at http://localhost:${port}`);
        });
    }
}
exports.default = new App().app;
