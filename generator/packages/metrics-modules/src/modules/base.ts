import { container, type Node } from "@takumi-rs/helpers";
import { debugContainer } from "../utils/style";

export interface ModuleMetadata {
  readonly name: string;
  readonly description: string;
  readonly width: number;
  readonly height: number;
}

export abstract class Module {
  public readonly metadata: ModuleMetadata;
  public readonly debug: boolean = false;

  constructor(metadata: ModuleMetadata, debug: boolean = false) {
    this.metadata = metadata;
    this.debug = debug;
  }

  public sizeObject() {
    return {
      width: this.metadata.width,
      height: this.metadata.height,
    };
  }

  abstract content(): Node[];

  public generate(): Node {
    return container({
      style: {
        ...this.sizeObject(),
        ...(this.debug ? debugContainer : {}),
      },
      children: this.content(),
    });
  }
}
