export abstract class BaseUseCase<I, O> {
  abstract execute(input: I): Promise<O>;
}
