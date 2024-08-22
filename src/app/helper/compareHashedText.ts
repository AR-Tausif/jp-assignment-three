import bcrypt from "bcrypt";

const comparedHashedText = async (plainTxt: string, hashedTxt: string) => {
  return await bcrypt.compare(plainTxt, hashedTxt);
};

export default comparedHashedText;
