class ETF {
  constructor(data) {
    this.data = data;
    this.weightMap = new Map();
    const constituentChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let constituentArr = constituentChars.split("");
    for (let c of constituentArr) {
      this.weightMap.set(c, (this.data.find(e => e.name === c))?.weight || 0);
    }
  }

  getWeight(c) {
    return this.weightMap.get(c);
  }

  toString() {
    return this.data;
  }
}
module.exports = ETF;