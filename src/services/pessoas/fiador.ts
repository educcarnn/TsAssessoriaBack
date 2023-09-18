import { Repository } from "typeorm";
import { Fiador } from "../../entities/pessoas/fiador";
import { Pessoa } from "../../entities/pessoaFisica";
import { RegistroImovel } from "../../entities/imovel";
import { AppDataSource } from "../../data-source";

const FiadorRepository: Repository<Fiador> =
  AppDataSource.getRepository(Fiador);
const PessoaFisicaRepository: Repository<Pessoa> =
  AppDataSource.getRepository(Pessoa);
const RegistroImovelRepository: Repository<RegistroImovel> =
  AppDataSource.getRepository(RegistroImovel);
export const cadastrarFiador = async (
  fiadorData: Fiador,
  pessoaId: number,
  imovelId: number
): Promise<Fiador> => {
  const pessoa = await PessoaFisicaRepository.findOne({
    where: { id: pessoaId },
  });
  if (!pessoa) {
    throw new Error(`Pessoa com ID ${pessoaId} não encontrada`);
  }

  const imovel = await RegistroImovelRepository.findOne({
    where: { id: imovelId },
  });
  if (!imovel) {
    throw new Error(`Imóvel com ID ${imovelId} não encontrado`);
  }

  // Verifique se é uma atualização ou criação
  if (fiadorData.id) {
    // Atualização: Garanta que você está atualizando pelo menos um campo ou
    // reconfigure os valores que já estão configurados para desencadear uma atualização.
    // Adicione ou ajuste os campos conforme necessário.
    fiadorData.pessoa = pessoa;
    fiadorData.imovelComoFianca = imovel;
    return await FiadorRepository.save(fiadorData);
  } else {
    // Criação: crie um novo Fiador e defina seus valores
    const newFiador = new Fiador();
    newFiador.pessoa = pessoa;
    newFiador.imovelComoFianca = imovel;
    // Copie outros campos do fiadorData conforme necessário
    // newFiador.outroCampo = fiadorData.outroCampo;
    return await FiadorRepository.save(newFiador);
  }
};

// Obter Fiador por ID
export const obterFiadorPorId = async (
  id: number
): Promise<Fiador | undefined> => {
  return (
    (await FiadorRepository.findOne({
      where: { id: id },
      relations: ["pessoa", "imovelComoFianca"],
    })) || undefined
  );
};

// Atualizar Fiador
export const atualizarFiador = async (
  id: number,
  fiadorData: Partial<Fiador>
): Promise<Fiador> => {
  const fiadorExistente = await FiadorRepository.findOne({ where: { id: id } });

  if (!fiadorExistente) {
    throw new Error(`Fiador com ID ${id} não encontrado`);
  }

  FiadorRepository.merge(fiadorExistente, fiadorData);
  return await FiadorRepository.save(fiadorExistente);
};

// Deletar Fiador
export const deletarFiador = async (id: number): Promise<void> => {
  const fiadorExistente = await FiadorRepository.findOne({ where: { id: id } });
  if (!fiadorExistente) {
    throw new Error(`Fiador com ID ${id} não encontrado`);
  }

  await FiadorRepository.remove(fiadorExistente);
};

// Listar todos os Fiadores
export const listarFiadores = async (): Promise<Fiador[]> => {
  return await FiadorRepository.find({
    relations: ["pessoa", "endereco", "imovelComoFianca"],
  });
};
