
import { User } from "../entities/user"; // Ajuste o caminho conforme necessário
import { AppDataSource } from "../data-source";
import bcrypt from "bcrypt";
import {isEmailInUse} from "../../src/utils/emailUtils"
import { PessoaRepository } from "./pessoaFisica";
import { Pessoa } from "../entities/pessoaFisica";

export const userRepository = AppDataSource.getRepository(User);

export const createUser = async (userData: Partial<User>): Promise<User> => {
    if (!userData.email) {
        throw new Error("E-mail não fornecido.");
    }

    const emailInUse = await isEmailInUse(userData.email);
    if (emailInUse) {
        throw new Error("E-mail já registrado em User ou Pessoa.");
    }

    // Certifique-se de que userData.password esteja definido antes de tentar hasheá-lo
    if (!userData.password) {
        throw new Error("Senha não fornecida.");
    }

    userData.password = await hashPassword(userData.password);

    const newUser = userRepository.create(userData);

    await userRepository.save(newUser);
    
    return newUser;
};

export const findUserByEmail = async (email: string): Promise<User | Pessoa | undefined> => {
    const user = await userRepository.findOne({ where: { email: email } });
    const pessoa = await PessoaRepository.findOne({ where: { email: email } });
    
    return user || pessoa || undefined;
};
export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

export const checkPassword = async (inputPassword: string, storedPasswordHash: string): Promise<boolean> => {
    return bcrypt.compare(inputPassword, storedPasswordHash);
};

export const updateUserById = async (id: number, data: Partial<User>): Promise<void> => {
    const user = await userRepository.findOne({ where: { id: id } });

    if (!user) {
        throw new Error("Usuário não encontrado.");
    }

    if (data.password) {
        data.password = await hashPassword(data.password);
    }

    Object.assign(user, data);

    await userRepository.save(user);
};

export const deleteUserById = async (id: number): Promise<void> => {
    const user = await userRepository.findOne({ where: { id: id } });

    if (!user) {
        throw new Error("Usuário não encontrado.");
    }

    await userRepository.remove(user);
};


export const createInvite = async (userData: any) => {
    const userRepository = AppDataSource.getRepository(User);

    // Neste caso, não estamos salvando a senha, pois a ideia é que o usuário defina a senha quando aceitar o convite.
    const user = new User();
    user.email = userData.email;
    user.role = userData.role || "user";

    await userRepository.save(user);
    
    return user;
}