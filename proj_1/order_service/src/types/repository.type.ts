type Create = (input: any) => Promise<{}>;
type Find = (input: any) => Promise<{}>;
type Update = (input: any) => Promise<{}>;
type Delete = (input: any) => Promise<{}>;
type FindAll = () => Promise<{}>;

export type CartRepositorytype = {
    Create: Create,
    Find: Find,
    Update: Update,
    Delete: Delete,
    FindAll: FindAll
}