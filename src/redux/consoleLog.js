class consoleLog {
  static setLog(message) {
    if (__DEV__) {
      console.log(message);
    }
  }
}

export default consoleLog;
