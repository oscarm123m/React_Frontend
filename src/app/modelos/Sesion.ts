class Sesion {
  public codUsuario: string;
  public correoUsuario: string;
  public codPerfil: string;

  constructor(codU: string, corr: string, codP: string) {
    this.codUsuario = codU;
    this.correoUsuario = corr;
    this.codPerfil = codP;
  }
}
export default Sesion;
