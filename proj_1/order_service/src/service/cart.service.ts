import type { CartRequestInput } from "../dto/cart.request.dto";
import type { CartRepositorytype } from "../types/repository.type";
import { logger, NotFoundError } from "../utils";
import { GetProductDetails } from "../utils/broker";

export const CreateCart = async (input: CartRequestInput, repo: CartRepositorytype) => {
    //make a call to our catalog microservices
    //synchronize call
    const product = await GetProductDetails(input.productId);
    logger.info(product);

    if (product.stock < input.qty) {
        throw new NotFoundError("product is out of stock");
    }

    // const data = await repo.Create(input);
    return product;
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