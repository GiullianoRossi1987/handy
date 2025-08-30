export class Requester {
  protected HandyUrl: string = '';

  protected checkDefinedUrl(): void {
      if (!this.HandyUrl) {
        throw new Error("Not initialized the main url");
      }
    }

  public Requester(url?: string){
    this.HandyUrl = url ? url : Bun.env.HandyUrl ?? '';
  }

  public getUrl(): string | null {
    return this.HandyUrl;
  }
}
