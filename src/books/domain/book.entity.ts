// Modelo puro de negocio
export class Book {
  constructor(
    public readonly id: string,
    public readonly externalId: string,
    public readonly title: string,
    public readonly author: string,
    public readonly coverUrl: string,
    public readonly isbn?: string, // Opcional
    public readonly totalPages?: number, // Opcional
  ) {}

  // se pueden añadir reglas de negocio.
}
