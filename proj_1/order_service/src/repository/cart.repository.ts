import type { CartRepositorytype } from "../types/repository.type";

const db = {}

const createCart = async (input: any): Promise<{}> => {
    //connect to db
    //perform db oeprations
    return Promise.resolve({
        message: "fake responses from cart repository",
        input,
    });
}

const findCart = async (input: any): Promise<{}> => {
    return Promise.resolve({});
}

const updateCart = async (input: any): Promise<{}> => {
    return Promise.resolve({});
}

const deleteCart = async (input: any): Promise<{}> => {
    return Promise.resolve({});
}

const findAllCart = async (): Promise<{}> => {
    return Promise.resolve({});
}

export const CartRepository: CartRepositorytype = {
    Create: createCart,
    Find: findCart,
    Update: updateCart,
    Delete: deleteCart,
    FindAll: findAllCart,
}