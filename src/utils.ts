function isValidNumber(value: string): boolean {
  return /^\d+$/.test(value);
}

export {isValidNumber};