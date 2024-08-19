export default class ObjectModels {
  // Función new para crear una nueva instancia
  static new(json = {}) {
    return this.fromJSON(json);
  }

  static fromJSON(json) {
    const keys = Object.keys(json);
    const newObj = new this();
    keys.forEach((key) => {
      newObj[key] = json[key];
    });
    return newObj;
  }

  toJSONstring() {
    return JSON.stringify(this);
  }

  destroy(key = null) {
    if (key) {
      delete this[key];
      return;
    } else {
      for (const key in this) {
        if (this.hasOwnProperty(key)) {
          delete this[key];
        }
      }
      return;
    }
  }
  dispose() {
    for (let key in this) {
      if (this.hasOwnProperty(key)) {
        this[key] = null;
      }
    }
  }
}
