class ETF {
  constructor(data) {
    if (!this.isValidData(data)) throw new Error("Invalid CSV data!");
    this.data = data;
    this.weightMap = new Map();
    const constituentChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let constituentArr = constituentChars.split("");
    for (let c of constituentArr) {
      this.weightMap.set(c, (this.data.find(e => e.name === c))?.weight || 0);
    }
  }

  isValidData(data) {
    // Assuming that a correctly formatted ETF file will only have the 'name' and 'weight' fields
    const requiredKeys = ['name', 'weight'];
    for (let item of data) {
      if (!requiredKeys.every(key => key in item)) {
        return false;
      }
    }
    return true;
  }

  getWeight(c) {
    return this.weightMap.get(c);
  }

  toString() {
    return this.data;
  }
}

module.exports = ETF;