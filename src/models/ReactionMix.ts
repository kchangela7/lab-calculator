export class ReactionMix {

  dH2O: number = 0;
  buffer: number = 0;
  dNTPs: number = 0;
  MgSO4: number = 0;
  primer1: number = 0;
  primer2: number = 0;
  taq: number = 0;

  constructor (dH2O: number, buffer: number, dNTPs: number, MgSO4: number, primer1: number, primer2: number, taq: number) {
    this.dH2O = dH2O;
    this.buffer = buffer;
    this.dNTPs = dNTPs;
    this.MgSO4 = MgSO4;
    this.primer1 = primer1;
    this.primer2 = primer2;
    this.taq = taq;
  }

  extractData () {
    let extract: {[key: string]: number} = {
      dH2O: this.dH2O,
      buffer: this.buffer,
      dNTPs: this.dNTPs,
      MgSO4: this.MgSO4,
      primer1: this.primer1,
      primer2: this.primer2,
      taq: this.taq
    };

    return extract;
  }

  calculateNew (x: number): ReactionMix {
    return new ReactionMix(
      this.dH2O * x, 
      this.buffer * x, 
      this.dNTPs * x, 
      this.MgSO4 * x, 
      this.primer1 * x, 
      this.primer2 * x, 
      this.taq * x
    );
  }
}