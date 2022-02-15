var sha256 = require('js-sha256');

var bd = [{ user: "admin", password: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918" },
    { user: "prueba1", password: "ef994e7262a78b97c039adf58214ee7df1076824a7e47538948ba61ae02b05c7" },
    { user: "prueba2", password: "92573009c9ed328bd9d47d7187e01eb0abe4b995fb6abe0724b4f53bed590264"}]

function hash(password: string): String {
    return sha256(password)
}

function auth(user: string, password: string): Boolean {
    var info = bd.find(item => item.user === user)
    if (info?.password == hash(password)) {
        return true
    } else {
        return false
    }
}

export default class LoginService{
    login(username: string, password: string): Promise<boolean>{
        return new Promise((resolve, reject) => {
            if (auth(username, password)) {
                resolve(true);
            }else{
                reject(false);
            }
        });
    }
}