import { Repository } from "typeorm";
import { Empresa } from "../../entities/empresa/empresa";
import { AppDataSource } from "../../data-source";
import { Pessoa } from "../../entities/pessoaFisica";
import { User } from "../../entities/user";
import { PessoaJuridica } from "../../entities/pessoaJuridica";

export const EmpresaRepository: Repository<Empresa> =
  AppDataSource.getRepository(Empresa);
export const PessoaRepository: Repository<Pessoa> =
  AppDataSource.getRepository(Pessoa);
export const UserRepository: Repository<User> =
  AppDataSource.getRepository(User);
export const PessoaJuridicaRepository: Repository<PessoaJuridica> =
  AppDataSource.getRepository(PessoaJuridica);



export const removerPessoaDaEmpresa = async (
  empresaId: number,
  pessoaId: number
): Promise<void> => {
  const empresa = await EmpresaRepository.findOne({ where: { id: empresaId } });

  if (!empresa) throw new Error("Empresa não encontrada.");

  const pessoaIndex = empresa.pessoas.findIndex((p) => p.id === pessoaId);
  if (pessoaIndex < 0) throw new Error("Pessoa não encontrada na empresa.");

  await PessoaRepository.delete(pessoaId);
};

export const removerAdminDaEmpresa = async (
  empresaId: number,
  userId: number
): Promise<void> => {
  const empresa = await EmpresaRepository.findOne({
    where: { id: empresaId },
    relations: ['administradores'], 
  });

  if (!empresa) throw new Error('Empresa não encontrada.');

  const adminIndex = empresa.administradores.findIndex((admin) => admin.id === userId);
  if (adminIndex < 0) throw new Error('Administrador não encontrado na empresa.');

  empresa.administradores.splice(adminIndex, 1); 

  await EmpresaRepository.save(empresa);
};


export const adicionarPessoaAEmpresa = async (
  empresaId: number,
  pessoaId: number
): Promise<Pessoa> => {
  const empresa = await EmpresaRepository.findOne({ where: { id: empresaId } });
  if (!empresa) throw new Error("Empresa não encontrada.");

  const pessoa = await PessoaRepository.findOne({ where: { id: pessoaId } });
  if (!pessoa) throw new Error("Pessoa não encontrada.");

  pessoa.empresa = empresa;

  return await PessoaRepository.save(pessoa);
};
export const associarAdminAEmpresa = async (
  empresaId: number,
  userId: number
): Promise<void> => {
  const empresa = await EmpresaRepository.findOne({
    where: { id: empresaId },
    relations: ["administradores"],
  });
  if (!empresa) throw new Error("Empresa não encontrada.");

  const user = await UserRepository.findOne({ where: { id: userId } });
  if (!user) throw new Error("Administrador não encontrado.");

  if (!empresa.administradores.some((admin) => admin.id === user.id)) {
    empresa.administradores.push(user);
  }

  await EmpresaRepository.save(empresa);
};

export const associarPessoaJuridicaAEmpresa = async (
  empresaId: number,
  pessoaJuridicaId: number
): Promise<void> => {
  const empresa = await EmpresaRepository.findOne({
    where: { id: empresaId },
    relations: ["pessoaJuridicas"], // Carregar as Pessoas Jurídicas existentes
  });
  if (!empresa) throw new Error("Empresa não encontrada.");

  const pessoaJuridica = await PessoaJuridicaRepository.findOne({
    where: { id: pessoaJuridicaId },
  });
  if (!pessoaJuridica) throw new Error("Pessoa Jurídica não encontrada.");

  if (!empresa.pessoaJuridicas.some((pj) => pj.id === pessoaJuridica.id)) {
    empresa.pessoaJuridicas.push(pessoaJuridica); // Adicionar nova Pessoa Jurídica à lista existente
  }

  await EmpresaRepository.save(empresa);
};
