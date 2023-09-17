import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { Contrato } from "./contrato";
import { RegistroImovel } from "./imovel";
import { PessoaIntermediaria } from "./pessoas/pessoa";

@Entity()
export class PessoaJuridica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cnpj: string;

  @Column()
  razaoSocial: string;

  @Column()
  nomeFantasia: string;

  @Column()
  dataAberturaEmpresa: string;

  @Column()
  novoSocioAdministrador: string;


  @OneToOne(() => PessoaIntermediaria)
  @JoinColumn()  
  dadosComuns: PessoaIntermediaria;  // Este campo contém todas as informações comuns

  /*RELACIONAMENTOS*/
  
  // Seus outros relacionamentos podem permanecer aqui

  /*
  @OneToMany(() => Contrato, contrato => contrato.PessoaJuridica, {nullable: true})
  contratos: Contrato[];

  @OneToMany(() => RegistroImovel, (imovel) => imovel.PessoaJuridica, { nullable: true })
  imoveis: RegistroImovel[];
  */
}
