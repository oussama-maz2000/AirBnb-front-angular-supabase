export class ServerResponse<T> {
  status: string;
  errorMessage: string;
  body: T | undefined;
  errors: Map<String, String>;
}
