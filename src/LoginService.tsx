export default class LoginService{
    login(username: string, password: string): Promise<boolean>{
        return new Promise((resolve, reject) => {
            if(username === "admin" && password === "admin"){
                resolve(true);
            }else{
                reject(false);
            }
        });
    }
}