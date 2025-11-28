import { container, type Node } from "@takumi-rs/helpers";
import { debugContainer } from "@/styles";

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

  public get width() {
    return this.metadata.width;
  }

  public get height() {
    return this.metadata.height;
  }

  abstract content(): Node[] | Promise<Node[]>;

  public async generate(): Promise<Node> {
    return container({
      style: {
        ...this.sizeObject(),
        ...(this.debug ? debugContainer : {}),
      },
      children: await this.content(),
    });
  }
}
