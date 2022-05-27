export function getShortCode(length = 5): string {
  let characters = "abcdefghijklmnopqrtuvwxyz";
  characters += characters.toUpperCase();
  characters += "0123456789";

  let code = "";

  for (let i = 0; i < length; i++) {
    code += characters[Math.floor(Math.random() * characters.length)];
  }

  return code;
}
