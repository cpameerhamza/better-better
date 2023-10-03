function isNumberCheck(e) {
  e = e || window.event;
  var charCode = e.which ? e.which : e.keyCode;
  return /\d/.test(String.fromCharCode(charCode));
}

export { isNumberCheck };
