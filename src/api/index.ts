import { LoginPayload } from "types";

export const authorizeUser = (payload: LoginPayload) => {
    const { email, password } = payload;
    
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          if (email === "tester@gmail.com" && password === "12345678") {
            resolve();
          }
  
          reject();
        }, 3000);
      });
}