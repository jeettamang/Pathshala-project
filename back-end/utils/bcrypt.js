import bcrypt from "bcryptjs";
const hashedPassword = (text) => {
  return bcrypt.hashSync(text, Number(process.env.SALT_ROUND));
};
const comparehashed = (text, hashedText) => {
  return bcrypt.compareSync(text, hashedText);
};
export { hashedPassword, comparehashed };
