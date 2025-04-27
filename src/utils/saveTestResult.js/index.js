import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const saveTestResult = async (data) => {
  try {
    await addDoc(collection(db, "testResults"), data);
    console.log("Resultado salvo com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar resultado:", error);
  }
};