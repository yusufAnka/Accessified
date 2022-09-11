"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStudent = exports.validateExaminer = exports.generateToken = exports.validateNewUser = void 0;
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = require("../env");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateNewUser = (req, res, next) => {
    let { name, email, password, repeat_password, role } = req.body;
    const schema = joi_1.default.object({
        password: joi_1.default.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
        repeat_password: joi_1.default.ref('password'),
        email: joi_1.default.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dev', 'org'] } })
            .required(),
        name: joi_1.default.string()
            .min(3)
            .max(30)
            .required(),
        role: joi_1.default.string()
            .required()
    });
    const { error, value } = schema.validate({ name, email, password, repeat_password, role });
    if (error) {
        throw new Error(error.message);
    }
    const salt = bcrypt_1.default.genSaltSync(Number(env_1.saltRounds));
    const hash = bcrypt_1.default.hashSync(value.password, salt);
    req.body.password = hash;
    req.body.email = value.email;
    next();
};
exports.validateNewUser = validateNewUser;
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, `${env_1.JWT_SECRET}`, { expiresIn: '5h' });
};
exports.generateToken = generateToken;
const validateExaminer = (req, res, next) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(req.cookies.token, `${env_1.JWT_SECRET}`);
        if (decoded && req.cookies.role === 'examiner') {
            next();
        }
    }
    catch (error) {
        throw new Error('No permission');
    }
};
exports.validateExaminer = validateExaminer;
const validateStudent = (req, res, next) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(req.cookies.token, `${env_1.JWT_SECRET}`);
        if (decoded && req.cookies.role === 'student') {
            next();
        }
    }
    catch (error) {
        throw new Error('No permission');
    }
};
exports.validateStudent = validateStudent;
//# sourceMappingURL=validator.js.map