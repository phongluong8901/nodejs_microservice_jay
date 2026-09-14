import type { CartRepositorytype } from "../types/repository.type";
import * as Repository from "../repository/cart.repository";
import { CreateCart } from "../service/cart.service";

describe("cartService", () => {
    let repo: CartRepositorytype

    beforeEach(() => {
        repo = Repository.CartRepository;
    });

    afterEach(() => {
        repo = {} as CartRepositorytype;
    });

    it("should return correct data while creating cart", async () => {
        const mockCart = {
            title: "smart phone",
            price: 1200
        };

        jest.spyOn(Repository.CartRepository, "Create")
            .mockImplementationOnce(() => Promise.resolve({
                message: "fake responses from cart repository",
                input: mockCart,
            }))

        const res = await CreateCart(mockCart, repo);

        expect(res).toEqual({
            data: {
                message: "fake responses from cart repository",
                input: mockCart,
            },
        });
    });

});
