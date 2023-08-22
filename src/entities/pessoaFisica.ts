import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { RegistroImovel } from './imovel';
import { Contrato } from './contrato';

@Entity()
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column()
  funcao: string;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column()
  identidade: string;

  @Column()
  orgaoExpedidor: string;

  @Column()
  dataNascimento: string;

  @Column()
  profissao: string;

  @Column()
  estadoCivil: string;

  @Column('jsonb')
  filiacao: { mae: string, pai: string };

  @Column()
  nacionalidade: string;

  @Column({ nullable: true })
  telefoneFixo: string;

  @Column()
  telefoneCelular: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  genero: string;

  @Column('jsonb', { nullable: true})
  endereco: { cep: string, endereco: string, bairro: string, cidade: string, estado: string };

  @Column('jsonb', { nullable: true })
  dadoBancarios: { chavePix: string, banco: string, agencia: string, conta: string };

  @Column('jsonb', { nullable: true })
  anexos: string[];

/*RELACIONAMENTOS*/
  @Column('jsonb',  { nullable: true })
  lista_email: string[];

  @Column('jsonb',  { nullable: true })
  lista_repasse: string[];

  @ManyToMany(() => RegistroImovel, imovel => imovel.pessoas, {eager: true})
  imoveis: RegistroImovel[];

  // Contratos
  @ManyToMany(() => Contrato, (contrato) => contrato.locatarios, {eager: true})
  contratos: Contrato[];

}
