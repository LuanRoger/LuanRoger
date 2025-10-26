import type { Node } from "@takumi-rs/helpers";

export class ModuleMetadata {
  

  constructor(
    public readonly name: string,
    public readonly description: string,
  ) {}
}

export abstract class Module {
  protected abstract readonly width: number;
  protected abstract readonly height: number;

  public sizeObject() {
    return {
      width: this.width,
      height: this.height,
    };
  }

  abstract generate(): Node;
}
