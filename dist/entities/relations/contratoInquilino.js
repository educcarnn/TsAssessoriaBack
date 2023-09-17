"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContratoInquilino = void 0;
const typeorm_1 = require("typeorm");
const contrato_1 = require("../../entities/contrato"); // Substitua [path_to_contrato_file] pelo caminho correto do arquivo.
const pessoaFisica_1 = require("../../entities/pessoaFisica"); // Substitua [path_to_pessoa_file] pelo caminho correto do arquivo.
let ContratoInquilino = class ContratoInquilino {
};
exports.ContratoInquilino = ContratoInquilino;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ContratoInquilino.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ContratoInquilino.prototype, "percentual", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contrato_1.Contrato, contrato => contrato.inquilinoRelacoes),
    __metadata("design:type", contrato_1.Contrato)
], ContratoInquilino.prototype, "contrato", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pessoaFisica_1.Pessoa, pessoa => pessoa.contratoRelacoes),
    __metadata("design:type", pessoaFisica_1.Pessoa)
], ContratoInquilino.prototype, "inquilino", void 0);
exports.ContratoInquilino = ContratoInquilino = __decorate([
    (0, typeorm_1.Entity)()
], ContratoInquilino);
