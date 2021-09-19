class Validation {
  //deletes bad spaces in a string
  static removeBadSpaces(string) {
    string = string.replace(/ /g, ""); //delte all spaces
    return string;
  }

  static validateEmail(string) {
    return /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(
      string
    );
  }

  static validatePassword(string) {
    return string.length > 5;
  }
}

export default Validation;
