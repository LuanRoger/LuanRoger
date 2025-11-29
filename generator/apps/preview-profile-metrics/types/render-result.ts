import { ModuleMetadata } from "metrics-modules/modules";

export interface RenderResult {
  metadata: ModuleMetadata;
  buffer: Buffer;
}
