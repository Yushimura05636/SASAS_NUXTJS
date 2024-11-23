import BaseAPIService from '~/components/api/BaseAPIService';

class ProductService extends BaseAPIService {

    constructor() {
        super();
        
        this.productcategory = '';
        this.productname = '';
        this.brandname = '';
        this.wholesaleunit = 0;
        this.retailunit = 0;
        this.retailqtyperwholesaleunit = 0;
        this.reorderpoint = 0;
        this.markup = 0;
        this.quantityonhand = 0;
    }

    async getProducts(params: object): Promise<any> {
        return await this.request('/products', 'GET', params);
    }

    async createProduct(params: object): Promise<any> {
        return await this.request('/products/', 'POST', params);
    }

    async updateProduct(params: object, id: number): Promise<any> {
        return await this.request(`/products/${id}`, 'PUT', params);
    }

    async deleteProduct(params:object, id: Number)
    {
        return await this.request('/products/${id}', 'DELETE', params);
    }

    async getProductById(id: number): Promise<any> {
        return await this.request(`/products/${id}`, 'GET');
    }

    private id: any;

    public setId(id: any): void {
        this.id = id;
    }

    public getId(): any {
        return this.id;
    }

    // variables
    private productcategory: string;
    private productname: string;
    private brandname: string;
    private wholesaleunit: number;
    private retailunit: number;
    private retailqtyperwholesaleunit: number;
    private reorderpoint: number;
    private markup: number;
    private quantityonhand: number;

    public setProductCategory(name: string): void {
        this.productcategory = name;
    }

    public setProductName(name: string): void {
        this.productname = name;
    }

    public setBrandName(name: string): void {
        this.brandname = name;
    }

    public setWholesaleUnit(value: number): void {
        this.wholesaleunit = value;
    }

    public setRetailUnit(value: number): void {
        this.retailunit = value;
    }

    public setRetailQtyPerWholesaleUnit(value: number): void {
        this.retailqtyperwholesaleunit = value;
    }

    public setReorderPoint(value: number): void {
        this.reorderpoint = value;
    }

    public setMarkup(value: number): void {
        this.markup = value;
    }

    public setQuantityOnHand(value: number): void {
        this.quantityonhand = value;
    }

    // Getters for product properties
    public getProductCategory(): string {
        return this.productcategory;
    }

    public getProductName(): string {
        return this.productname;
    }

    public getBrandName(): string {
        return this.brandname;
    }

    public getWholesaleUnit(): number {
        return this.wholesaleunit;
    }

    public getRetailUnit(): number {
        return this.retailunit;
    }

    public getRetailQtyPerWholesaleUnit(): number {
        return this.retailqtyperwholesaleunit;
    }

    public getReorderPoint(): number {
        return this.reorderpoint;
    }

    public getMarkup(): number {
        return this.markup;
    }

    public getQuantityOnHand(): number {
        return this.quantityonhand;
    }
}

export const productService = new ProductService();
