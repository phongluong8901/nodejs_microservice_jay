import type { CartRepositorytype } from "../types/repository.type";

export const CreateCart = async (input: any, repo: CartRepositorytype) => {
    const data = await repo.Create(input);
    return { data: data };
};

export const DeleteCart = async (input: any, repo: CartRepositorytype) => {
    const data = await repo.Delete(input);
    return { data: data };
};

export const UpdateCart = async (input: any, repo: CartRepositorytype) => {
    const data = await repo.Update(input);
    return { data: data };
};

export const GetCart = async (input: any, repo: CartRepositorytype) => {
    const data = await repo.Find(input);
    return { data: data };
};

export const GetAllCart = async (repo: CartRepositorytype) => {
    const data = await repo.FindAll();
    return { data: data };
};