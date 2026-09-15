import type { ICatalogRepository } from "../interface/catalogRepository.interface.js";
import type { Product } from "../models/product.models.js";

export class MockCatalogRepository implements ICatalogRepository {
    findStock(ids: number[]): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    create(data: Product): Promise<Product> {
        const mockProduct = {
            id: 123,
            ...data
        } as Product

        return Promise.resolve(mockProduct);
    }
    update(data: Product): Promise<Product> {
        return Promise.resolve(data as unknown as Product);
    }
    delete(id: any): Promise<Product> {
        return Promise.resolve(id);
    }
    find(limit: number, offset: number): Promise<Product[]> {
        return Promise.resolve([]);
    }
    findOne(id: number): Promise<Product> {
        return Promise.resolve({ id } as unknown as Product);
    }

}