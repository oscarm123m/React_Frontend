class RegistroUsuario {
  public nombreUsuario: string;
  public correoUsuario: string;
  public claveUsuario: string;

  constructor(nom: string, corr: string, cla: string) {
    this.nombreUsuario = nom;
    this.correoUsuario = corr;
    this.claveUsuario = cla;
  }
}
export default RegistroUsuario;
