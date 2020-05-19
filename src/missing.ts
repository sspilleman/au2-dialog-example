export class Missing {
  public static parameters = ['id'];
  public missingComponent: string ;

  public enter(parameters): void {
    this.missingComponent = parameters.id;
  }
}
