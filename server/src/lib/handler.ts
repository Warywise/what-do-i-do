export default abstract class Handler {
  protected TryCatch<T>(serviceFunction: () => T) {
    try {
      return serviceFunction();
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      if (typeof error === 'string') throw new Error(error);
      throw new Error('Erro ao buscar tarefas');
    }
  }
}
