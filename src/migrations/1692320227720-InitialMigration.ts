import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1692320227720 implements MigrationInterface {
    name = 'InitialMigration1692320227720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tabela_pessoas_juridicas_orm" ("id" SERIAL NOT NULL, "tipo" character varying NOT NULL, "funcao" text NOT NULL, "cnpj" character varying NOT NULL, "razao_social" character varying NOT NULL, "nome_fantasia" character varying NOT NULL, "endereco" character varying NOT NULL, "data_abertura_empresa" TIMESTAMP NOT NULL, "novo_socio_administrador" character varying NOT NULL, "telefone" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_82067eec1db4fed746fad23d15a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contrato" ("id" SERIAL NOT NULL, "tipoContrato" character varying NOT NULL, "garantia" character varying NOT NULL, "dataInicio" TIMESTAMP NOT NULL, "dataTermino" TIMESTAMP NOT NULL, "valor" integer NOT NULL, "seguradora" character varying NOT NULL, "apolice" character varying NOT NULL, "numeroParcelas" integer NOT NULL, "observacao" character varying NOT NULL, "pessoaId" integer, "imovelId" integer, "proprietarioId" integer, CONSTRAINT "PK_b82cfcedf2037eab18ca2714ef9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tabela_pessoas_fisicas_orm" ("id" SERIAL NOT NULL, "tipo" character varying NOT NULL, "funcao" text NOT NULL, "nome" character varying NOT NULL, "cpf" character varying NOT NULL, "identidade" character varying NOT NULL, "orgao_expedidor" character varying NOT NULL, "data_nascimento" TIMESTAMP NOT NULL, "profissao" character varying NOT NULL, "estado_civil" character varying NOT NULL, "endereco" character varying NOT NULL, "genero" character varying NOT NULL, "pdf" character varying, CONSTRAINT "PK_92e344b710970f18dbdf34fa1e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tabela_caracteristicas_condominio" ("id" SERIAL NOT NULL, "caracteristica" character varying NOT NULL, CONSTRAINT "PK_61a463b1eeb9c85d02a3980b82b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tabela_caracteristicas_imovel" ("id" SERIAL NOT NULL, "caracteristica" character varying NOT NULL, "registroImovelId" integer, CONSTRAINT "PK_9334eefe20193d744215b97a38d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tabela_registro_imovel_orm" ("id" SERIAL NOT NULL, "tipo_imovel" character varying NOT NULL, "genero_imovel" character varying NOT NULL, "tipo_construcao" character varying NOT NULL, "numero_quartos" integer NOT NULL, "numero_suites" integer NOT NULL, "numero_banheiros" integer NOT NULL, "numero_vagas" integer NOT NULL, "area_util" double precision NOT NULL, "area_total" double precision NOT NULL, "tipo_negociacao" character varying NOT NULL, "valor_venda" numeric, "taxa_intermediacao" numeric, "valor_aluguel" numeric, "taxa_administracao" numeric, "taxa_locacao" numeric, "tipo_iptu" character varying NOT NULL, "numero_matricula_iptu" integer, "valor_mensal_iptu" numeric, "tipo_condominio" character varying NOT NULL, "nome_condominio" character varying NOT NULL, "nome_administradora" character varying, "razao_social_condominio" character varying, "cnpj_condominio" character varying(20), "site_condominio" character varying, "login_condominio" character varying, "senha_condominio" character varying, "telefone_fixo_condominio" character varying(20), "telefone_celular_condominio" character varying(20), "valor_mensal_condominio" numeric, "percentual" numeric, "novos_proprietarios" character varying array NOT NULL, "cep" integer, "endereco" character varying NOT NULL, "bairro" character varying NOT NULL, "cidade" character varying NOT NULL, "estado" character varying(10) NOT NULL, "andar" integer, "numero" integer, CONSTRAINT "PK_284e3f724571551a87e7dd57ffe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tabela_pessoas_juridicas_orm_contratos_contrato" ("tabelaPessoasJuridicasOrmId" integer NOT NULL, "contratoId" integer NOT NULL, CONSTRAINT "PK_5dbd458299877fa474c819502fd" PRIMARY KEY ("tabelaPessoasJuridicasOrmId", "contratoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_350af9a03ef8b9cdcf58e1cb90" ON "tabela_pessoas_juridicas_orm_contratos_contrato" ("tabelaPessoasJuridicasOrmId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a27bf4615b96b01e9168704ea5" ON "tabela_pessoas_juridicas_orm_contratos_contrato" ("contratoId") `);
        await queryRunner.query(`CREATE TABLE "tab_pes_jur_orm_pro_tab_reg_imo_orm" ("tabelaPessoasJuridicasOrmId" integer NOT NULL, "tabelaRegistroImovelOrmId" integer NOT NULL, CONSTRAINT "PK_727bdee5a20e3349d4403c43198" PRIMARY KEY ("tabelaPessoasJuridicasOrmId", "tabelaRegistroImovelOrmId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_13075e25ed87b334ac51a1d36c" ON "tab_pes_jur_orm_pro_tab_reg_imo_orm" ("tabelaPessoasJuridicasOrmId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b4540676e01a14595d64558c8c" ON "tab_pes_jur_orm_pro_tab_reg_imo_orm" ("tabelaRegistroImovelOrmId") `);
        await queryRunner.query(`CREATE TABLE "con_pro_pes_jur_tab_pes_jur_orm" ("contratoId" integer NOT NULL, "tabelaPessoasJuridicasOrmId" integer NOT NULL, CONSTRAINT "PK_48c7d7ce7a1efa24ea6f81ad7d9" PRIMARY KEY ("contratoId", "tabelaPessoasJuridicasOrmId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8d2e9096a7b7a5bac95d801c80" ON "con_pro_pes_jur_tab_pes_jur_orm" ("contratoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d5c1c590ece528410589100718" ON "con_pro_pes_jur_tab_pes_jur_orm" ("tabelaPessoasJuridicasOrmId") `);
        await queryRunner.query(`CREATE TABLE "contrato_locatarios_tabela_pessoas_fisicas_orm" ("contratoId" integer NOT NULL, "tabelaPessoasFisicasOrmId" integer NOT NULL, CONSTRAINT "PK_3027b76f715f43d18afb16db043" PRIMARY KEY ("contratoId", "tabelaPessoasFisicasOrmId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_22cbd217235fe2d7a31c212273" ON "contrato_locatarios_tabela_pessoas_fisicas_orm" ("contratoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7eeac65652ed1a6e4e8daee0a5" ON "contrato_locatarios_tabela_pessoas_fisicas_orm" ("tabelaPessoasFisicasOrmId") `);
        await queryRunner.query(`CREATE TABLE "tabela_pessoas_fisicas_orm_contratos_contrato" ("tabelaPessoasFisicasOrmId" integer NOT NULL, "contratoId" integer NOT NULL, CONSTRAINT "PK_c47b1f4ee07d0309de6ef3e3e26" PRIMARY KEY ("tabelaPessoasFisicasOrmId", "contratoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6ad21a898b56a4f4cd5d86d87a" ON "tabela_pessoas_fisicas_orm_contratos_contrato" ("tabelaPessoasFisicasOrmId") `);
        await queryRunner.query(`CREATE INDEX "IDX_74673956a1fedc0d5ffdc3206d" ON "tabela_pessoas_fisicas_orm_contratos_contrato" ("contratoId") `);
        await queryRunner.query(`CREATE TABLE "tab_pes_fis_orm_pro_tab_reg_imo_orm" ("tabelaPessoasFisicasOrmId" integer NOT NULL, "tabelaRegistroImovelOrmId" integer NOT NULL, CONSTRAINT "PK_2c7842bc536675c7199152db270" PRIMARY KEY ("tabelaPessoasFisicasOrmId", "tabelaRegistroImovelOrmId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cd14b464d0469ca17a8c06f994" ON "tab_pes_fis_orm_pro_tab_reg_imo_orm" ("tabelaPessoasFisicasOrmId") `);
        await queryRunner.query(`CREATE INDEX "IDX_479f18adfe672a58a58541e28f" ON "tab_pes_fis_orm_pro_tab_reg_imo_orm" ("tabelaRegistroImovelOrmId") `);
        await queryRunner.query(`CREATE TABLE "tabela_registro_imovel_orm_contratos_contrato" ("tabelaRegistroImovelOrmId" integer NOT NULL, "contratoId" integer NOT NULL, CONSTRAINT "PK_3db637928232aa47c1e9ba0d393" PRIMARY KEY ("tabelaRegistroImovelOrmId", "contratoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3236805c89dab5620ce4d3f7e1" ON "tabela_registro_imovel_orm_contratos_contrato" ("tabelaRegistroImovelOrmId") `);
        await queryRunner.query(`CREATE INDEX "IDX_37f16155dd7dfbff65779309d8" ON "tabela_registro_imovel_orm_contratos_contrato" ("contratoId") `);
        await queryRunner.query(`CREATE TABLE "tab_reg_imo_orm_pro_tab_pes_fis_orm" ("tabelaRegistroImovelOrmId" integer NOT NULL, "tabelaPessoasFisicasOrmId" integer NOT NULL, CONSTRAINT "PK_94e360b7c5f534c622eaff9733e" PRIMARY KEY ("tabelaRegistroImovelOrmId", "tabelaPessoasFisicasOrmId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_446615b640ec567b014f4062cb" ON "tab_reg_imo_orm_pro_tab_pes_fis_orm" ("tabelaRegistroImovelOrmId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e4f3a9990671e7495255a776b2" ON "tab_reg_imo_orm_pro_tab_pes_fis_orm" ("tabelaPessoasFisicasOrmId") `);
        await queryRunner.query(`CREATE TABLE "tab_reg_imo_orm_pro_pes_jur_tab_pes_jur_orm" ("tabelaRegistroImovelOrmId" integer NOT NULL, "tabelaPessoasJuridicasOrmId" integer NOT NULL, CONSTRAINT "PK_6961cddc10cdfa4a737a4abb30b" PRIMARY KEY ("tabelaRegistroImovelOrmId", "tabelaPessoasJuridicasOrmId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_45c3a2a4466f57294dd938ee45" ON "tab_reg_imo_orm_pro_pes_jur_tab_pes_jur_orm" ("tabelaRegistroImovelOrmId") `);
        await queryRunner.query(`CREATE INDEX "IDX_74ee770fe8137ff3d9bbbcdd0c" ON "tab_reg_imo_orm_pro_pes_jur_tab_pes_jur_orm" ("tabelaPessoasJuridicasOrmId") `);
        await queryRunner.query(`CREATE TABLE "tab_reg_imo_orm_car_con_tab_car_con" ("tabelaRegistroImovelOrmId" integer NOT NULL, "tabelaCaracteristicasCondominioId" integer NOT NULL, CONSTRAINT "PK_4da3efc3fee93492351857166c7" PRIMARY KEY ("tabelaRegistroImovelOrmId", "tabelaCaracteristicasCondominioId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d70b4f1754b6eb0e49f52d8f30" ON "tab_reg_imo_orm_car_con_tab_car_con" ("tabelaRegistroImovelOrmId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ea7b2baec2b52fa49b6f2ac165" ON "tab_reg_imo_orm_car_con_tab_car_con" ("tabelaCaracteristicasCondominioId") `);
        await queryRunner.query(`CREATE TABLE "tab_reg_imo_orm_car_imo_tab_car_imo" ("tabelaRegistroImovelOrmId" integer NOT NULL, "tabelaCaracteristicasImovelId" integer NOT NULL, CONSTRAINT "PK_64894b9b9f902d82709670aeea4" PRIMARY KEY ("tabelaRegistroImovelOrmId", "tabelaCaracteristicasImovelId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_082d307ab05baf6cca4917fc9d" ON "tab_reg_imo_orm_car_imo_tab_car_imo" ("tabelaRegistroImovelOrmId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9c759bb3406dffbbc8c46fc27c" ON "tab_reg_imo_orm_car_imo_tab_car_imo" ("tabelaCaracteristicasImovelId") `);
        await queryRunner.query(`ALTER TABLE "contrato" ADD CONSTRAINT "FK_effff1657a85ac8dac6026ee7a9" FOREIGN KEY ("pessoaId") REFERENCES "tabela_pessoas_fisicas_orm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contrato" ADD CONSTRAINT "FK_c0fb1ed6f4cf5c9610d2e18e7cb" FOREIGN KEY ("imovelId") REFERENCES "tabela_registro_imovel_orm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contrato" ADD CONSTRAINT "FK_bd6fa69ae1f4bbb09e66098a5fc" FOREIGN KEY ("proprietarioId") REFERENCES "tabela_pessoas_fisicas_orm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tabela_caracteristicas_imovel" ADD CONSTRAINT "FK_cf233afbce4fb01ed96a67dff37" FOREIGN KEY ("registroImovelId") REFERENCES "tabela_registro_imovel_orm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tabela_pessoas_juridicas_orm_contratos_contrato" ADD CONSTRAINT "FK_350af9a03ef8b9cdcf58e1cb901" FOREIGN KEY ("tabelaPessoasJuridicasOrmId") REFERENCES "tabela_pessoas_juridicas_orm"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tabela_pessoas_juridicas_orm_contratos_contrato" ADD CONSTRAINT "FK_a27bf4615b96b01e9168704ea5e" FOREIGN KEY ("contratoId") REFERENCES "contrato"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tab_pes_jur_orm_pro_tab_reg_imo_orm" ADD CONSTRAINT "FK_13075e25ed87b334ac51a1d36c6" FOREIGN KEY ("tabelaPessoasJuridicasOrmId") REFERENCES "tabela_pessoas_juridicas_orm"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tab_pes_jur_orm_pro_tab_reg_imo_orm" ADD CONSTRAINT "FK_b4540676e01a14595d64558c8c0" FOREIGN KEY ("tabelaRegistroImovelOrmId") REFERENCES "tabela_registro_imovel_orm"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "con_pro_pes_jur_tab_pes_jur_orm" ADD CONSTRAINT "FK_8d2e9096a7b7a5bac95d801c808" FOREIGN KEY ("contratoId") REFERENCES "contrato"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "con_pro_pes_jur_tab_pes_jur_orm" ADD CONSTRAINT "FK_d5c1c590ece5284105891007185" FOREIGN KEY ("tabelaPessoasJuridicasOrmId") REFERENCES "tabela_pessoas_juridicas_orm"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contrato_locatarios_tabela_pessoas_fisicas_orm" ADD CONSTRAINT "FK_22cbd217235fe2d7a31c2122739" FOREIGN KEY ("contratoId") REFERENCES "contrato"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contrato_locatarios_tabela_pessoas_fisicas_orm" ADD CONSTRAINT "FK_7eeac65652ed1a6e4e8daee0a53" FOREIGN KEY ("tabelaPessoasFisicasOrmId") REFERENCES "tabela_pessoas_fisicas_orm"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tabela_pessoas_fisicas_orm_contratos_contrato" ADD CONSTRAINT "FK_6ad21a898b56a4f4cd5d86d87a2" FOREIGN KEY ("tabelaPessoasFisicasOrmId") REFERENCES "tabela_pessoas_fisicas_orm"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tabela_pessoas_fisicas_orm_contratos_contrato" ADD CONSTRAINT "FK_74673956a1fedc0d5ffdc3206de" FOREIGN KEY ("contratoId") REFERENCES "contrato"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tab_pes_fis_orm_pro_tab_reg_imo_orm" ADD CONSTRAINT "FK_cd14b464d0469ca17a8c06f9940" FOREIGN KEY ("tabelaPessoasFisicasOrmId") REFERENCES "tabela_pessoas_fisicas_orm"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tab_pes_fis_orm_pro_tab_reg_imo_orm" ADD CONSTRAINT "FK_479f18adfe672a58a58541e28f8" FOREIGN KEY ("tabelaRegistroImovelOrmId") REFERENCES "tabela_registro_imovel_orm"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tabela_registro_imovel_orm_contratos_contrato" ADD CONSTRAINT "FK_3236805c89dab5620ce4d3f7e1c" FOREIGN KEY ("tabelaRegistroImovelOrmId") REFERENCES "tabela_registro_imovel_orm"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tabela_registro_imovel_orm_contratos_contrato" ADD CONSTRAINT "FK_37f16155dd7dfbff65779309d88" FOREIGN KEY ("contratoId") REFERENCES "contrato"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tab_reg_imo_orm_pro_tab_pes_fis_orm" ADD CONSTRAINT "FK_446615b640ec567b014f4062cb8" FOREIGN KEY ("tabelaRegistroImovelOrmId") REFERENCES "tabela_registro_imovel_orm"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tab_reg_imo_orm_pro_tab_pes_fis_orm" ADD CONSTRAINT "FK_e4f3a9990671e7495255a776b27" FOREIGN KEY ("tabelaPessoasFisicasOrmId") REFERENCES "tabela_pessoas_fisicas_orm"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tab_reg_imo_orm_pro_pes_jur_tab_pes_jur_orm" ADD CONSTRAINT "FK_45c3a2a4466f57294dd938ee458" FOREIGN KEY ("tabelaRegistroImovelOrmId") REFERENCES "tabela_registro_imovel_orm"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tab_reg_imo_orm_pro_pes_jur_tab_pes_jur_orm" ADD CONSTRAINT "FK_74ee770fe8137ff3d9bbbcdd0c1" FOREIGN KEY ("tabelaPessoasJuridicasOrmId") REFERENCES "tabela_pessoas_juridicas_orm"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tab_reg_imo_orm_car_con_tab_car_con" ADD CONSTRAINT "FK_d70b4f1754b6eb0e49f52d8f306" FOREIGN KEY ("tabelaRegistroImovelOrmId") REFERENCES "tabela_registro_imovel_orm"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tab_reg_imo_orm_car_con_tab_car_con" ADD CONSTRAINT "FK_ea7b2baec2b52fa49b6f2ac165f" FOREIGN KEY ("tabelaCaracteristicasCondominioId") REFERENCES "tabela_caracteristicas_condominio"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tab_reg_imo_orm_car_imo_tab_car_imo" ADD CONSTRAINT "FK_082d307ab05baf6cca4917fc9d8" FOREIGN KEY ("tabelaRegistroImovelOrmId") REFERENCES "tabela_registro_imovel_orm"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tab_reg_imo_orm_car_imo_tab_car_imo" ADD CONSTRAINT "FK_9c759bb3406dffbbc8c46fc27c3" FOREIGN KEY ("tabelaCaracteristicasImovelId") REFERENCES "tabela_caracteristicas_imovel"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tab_reg_imo_orm_car_imo_tab_car_imo" DROP CONSTRAINT "FK_9c759bb3406dffbbc8c46fc27c3"`);
        await queryRunner.query(`ALTER TABLE "tab_reg_imo_orm_car_imo_tab_car_imo" DROP CONSTRAINT "FK_082d307ab05baf6cca4917fc9d8"`);
        await queryRunner.query(`ALTER TABLE "tab_reg_imo_orm_car_con_tab_car_con" DROP CONSTRAINT "FK_ea7b2baec2b52fa49b6f2ac165f"`);
        await queryRunner.query(`ALTER TABLE "tab_reg_imo_orm_car_con_tab_car_con" DROP CONSTRAINT "FK_d70b4f1754b6eb0e49f52d8f306"`);
        await queryRunner.query(`ALTER TABLE "tab_reg_imo_orm_pro_pes_jur_tab_pes_jur_orm" DROP CONSTRAINT "FK_74ee770fe8137ff3d9bbbcdd0c1"`);
        await queryRunner.query(`ALTER TABLE "tab_reg_imo_orm_pro_pes_jur_tab_pes_jur_orm" DROP CONSTRAINT "FK_45c3a2a4466f57294dd938ee458"`);
        await queryRunner.query(`ALTER TABLE "tab_reg_imo_orm_pro_tab_pes_fis_orm" DROP CONSTRAINT "FK_e4f3a9990671e7495255a776b27"`);
        await queryRunner.query(`ALTER TABLE "tab_reg_imo_orm_pro_tab_pes_fis_orm" DROP CONSTRAINT "FK_446615b640ec567b014f4062cb8"`);
        await queryRunner.query(`ALTER TABLE "tabela_registro_imovel_orm_contratos_contrato" DROP CONSTRAINT "FK_37f16155dd7dfbff65779309d88"`);
        await queryRunner.query(`ALTER TABLE "tabela_registro_imovel_orm_contratos_contrato" DROP CONSTRAINT "FK_3236805c89dab5620ce4d3f7e1c"`);
        await queryRunner.query(`ALTER TABLE "tab_pes_fis_orm_pro_tab_reg_imo_orm" DROP CONSTRAINT "FK_479f18adfe672a58a58541e28f8"`);
        await queryRunner.query(`ALTER TABLE "tab_pes_fis_orm_pro_tab_reg_imo_orm" DROP CONSTRAINT "FK_cd14b464d0469ca17a8c06f9940"`);
        await queryRunner.query(`ALTER TABLE "tabela_pessoas_fisicas_orm_contratos_contrato" DROP CONSTRAINT "FK_74673956a1fedc0d5ffdc3206de"`);
        await queryRunner.query(`ALTER TABLE "tabela_pessoas_fisicas_orm_contratos_contrato" DROP CONSTRAINT "FK_6ad21a898b56a4f4cd5d86d87a2"`);
        await queryRunner.query(`ALTER TABLE "contrato_locatarios_tabela_pessoas_fisicas_orm" DROP CONSTRAINT "FK_7eeac65652ed1a6e4e8daee0a53"`);
        await queryRunner.query(`ALTER TABLE "contrato_locatarios_tabela_pessoas_fisicas_orm" DROP CONSTRAINT "FK_22cbd217235fe2d7a31c2122739"`);
        await queryRunner.query(`ALTER TABLE "con_pro_pes_jur_tab_pes_jur_orm" DROP CONSTRAINT "FK_d5c1c590ece5284105891007185"`);
        await queryRunner.query(`ALTER TABLE "con_pro_pes_jur_tab_pes_jur_orm" DROP CONSTRAINT "FK_8d2e9096a7b7a5bac95d801c808"`);
        await queryRunner.query(`ALTER TABLE "tab_pes_jur_orm_pro_tab_reg_imo_orm" DROP CONSTRAINT "FK_b4540676e01a14595d64558c8c0"`);
        await queryRunner.query(`ALTER TABLE "tab_pes_jur_orm_pro_tab_reg_imo_orm" DROP CONSTRAINT "FK_13075e25ed87b334ac51a1d36c6"`);
        await queryRunner.query(`ALTER TABLE "tabela_pessoas_juridicas_orm_contratos_contrato" DROP CONSTRAINT "FK_a27bf4615b96b01e9168704ea5e"`);
        await queryRunner.query(`ALTER TABLE "tabela_pessoas_juridicas_orm_contratos_contrato" DROP CONSTRAINT "FK_350af9a03ef8b9cdcf58e1cb901"`);
        await queryRunner.query(`ALTER TABLE "tabela_caracteristicas_imovel" DROP CONSTRAINT "FK_cf233afbce4fb01ed96a67dff37"`);
        await queryRunner.query(`ALTER TABLE "contrato" DROP CONSTRAINT "FK_bd6fa69ae1f4bbb09e66098a5fc"`);
        await queryRunner.query(`ALTER TABLE "contrato" DROP CONSTRAINT "FK_c0fb1ed6f4cf5c9610d2e18e7cb"`);
        await queryRunner.query(`ALTER TABLE "contrato" DROP CONSTRAINT "FK_effff1657a85ac8dac6026ee7a9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9c759bb3406dffbbc8c46fc27c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_082d307ab05baf6cca4917fc9d"`);
        await queryRunner.query(`DROP TABLE "tab_reg_imo_orm_car_imo_tab_car_imo"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ea7b2baec2b52fa49b6f2ac165"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d70b4f1754b6eb0e49f52d8f30"`);
        await queryRunner.query(`DROP TABLE "tab_reg_imo_orm_car_con_tab_car_con"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_74ee770fe8137ff3d9bbbcdd0c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_45c3a2a4466f57294dd938ee45"`);
        await queryRunner.query(`DROP TABLE "tab_reg_imo_orm_pro_pes_jur_tab_pes_jur_orm"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e4f3a9990671e7495255a776b2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_446615b640ec567b014f4062cb"`);
        await queryRunner.query(`DROP TABLE "tab_reg_imo_orm_pro_tab_pes_fis_orm"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_37f16155dd7dfbff65779309d8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3236805c89dab5620ce4d3f7e1"`);
        await queryRunner.query(`DROP TABLE "tabela_registro_imovel_orm_contratos_contrato"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_479f18adfe672a58a58541e28f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cd14b464d0469ca17a8c06f994"`);
        await queryRunner.query(`DROP TABLE "tab_pes_fis_orm_pro_tab_reg_imo_orm"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_74673956a1fedc0d5ffdc3206d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6ad21a898b56a4f4cd5d86d87a"`);
        await queryRunner.query(`DROP TABLE "tabela_pessoas_fisicas_orm_contratos_contrato"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7eeac65652ed1a6e4e8daee0a5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_22cbd217235fe2d7a31c212273"`);
        await queryRunner.query(`DROP TABLE "contrato_locatarios_tabela_pessoas_fisicas_orm"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d5c1c590ece528410589100718"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8d2e9096a7b7a5bac95d801c80"`);
        await queryRunner.query(`DROP TABLE "con_pro_pes_jur_tab_pes_jur_orm"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b4540676e01a14595d64558c8c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_13075e25ed87b334ac51a1d36c"`);
        await queryRunner.query(`DROP TABLE "tab_pes_jur_orm_pro_tab_reg_imo_orm"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a27bf4615b96b01e9168704ea5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_350af9a03ef8b9cdcf58e1cb90"`);
        await queryRunner.query(`DROP TABLE "tabela_pessoas_juridicas_orm_contratos_contrato"`);
        await queryRunner.query(`DROP TABLE "tabela_registro_imovel_orm"`);
        await queryRunner.query(`DROP TABLE "tabela_caracteristicas_imovel"`);
        await queryRunner.query(`DROP TABLE "tabela_caracteristicas_condominio"`);
        await queryRunner.query(`DROP TABLE "tabela_pessoas_fisicas_orm"`);
        await queryRunner.query(`DROP TABLE "contrato"`);
        await queryRunner.query(`DROP TABLE "tabela_pessoas_juridicas_orm"`);
    }

}