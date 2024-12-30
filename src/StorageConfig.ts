export interface StorageConfig {
  serializer: (data: any) => string;
  parser: (raw: string) => any;
}
