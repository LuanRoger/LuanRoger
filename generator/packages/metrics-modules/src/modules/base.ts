import type { Node } from "@takumi-rs/helpers";

export interface ModuleMetadata {
  readonly name: string;
  readonly description: string;
  readonly width: number;
  readonly height: number;
}

export abstract class Module {
  public readonly metadata: ModuleMetadata;

  constructor(metadata: ModuleMetadata) {
    this.metadata = metadata;
  }

  public sizeObject() {
    return {
      width: this.metadata.width,
      height: this.metadata.height,
    };
  }

  abstract generate(): Node;
}
