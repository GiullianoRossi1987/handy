type RequesterBody = { url?: string; parent?: Requester };
export class Requester {
  protected HandyUrl: string = '';

  protected checkDefinedUrl(): void {
    if (!this.HandyUrl) {
      throw new Error('Not initialized the main url');
    }
  }

  constructor(bd?: RequesterBody) {
    if (!bd) {
      bd = {
        url: process.env.VITE_HANDY_URL ?? '',
      };
    }
    const { url, parent } = bd; // didn't want to do that tbh
    this.HandyUrl = url ? url : (process.env.VITE_HANDY_URL ?? '');
    if (parent) {
      this.HandyUrl = parent.HandyUrl;
    }
  }

  public getUrl(): string | null {
    return this.HandyUrl;
  }
}
