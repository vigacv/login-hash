var bd = [{ user: "admin", password: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918" },
    { user: "prueba1", password: "ef994e7262a78b97c039adf58214ee7df1076824a7e47538948ba61ae02b05c7" },
    { user: "prueba2", password: "92573009c9ed328bd9d47d7187e01eb0abe4b995fb6abe0724b4f53bed590264" }]
 
function stringToBinary(string: string) { // Devuelve array de 8*(nro. de caracteres)
    var binaryString = "" // Cadena en binario, todo junto
    for (var i = 0; i < string.length; i++) {
        let bin = string[i].charCodeAt(0).toString(2)
        binaryString += '0'.repeat(8-bin.length)+bin;
    }
    return binaryString.split("") // Cadena en binario, separada por bit
}

function intToBinary(int: number, size: number) { // Devuelve array de "size" caracteres
    let bin = (int >>> 0).toString(2)
    let completeBinaryString = '0'.repeat(size - bin.length) + bin
    return completeBinaryString.split("")
}
gi
function addedZeros(n: number, binaryVector: Array<string>) {
    let array_zeros = []
    for (let i = 0; i < n; i++) {
        array_zeros.push('0')
    }
    return binaryVector.concat(array_zeros)
}

function hexToBinary(hex: string, size: number) {
    return (parseInt(hex, 16).toString(2)).padStart(size, '0').split('');
}

function binaryToDecimal(array: Array<string>) {
    // uniendo en string
    let str = array.join('')
    return parseInt(str, 2)
}

function splitBinaryVector(binaryVector: Array<string>, sizeChunk: number) {
    var i, j, temp
    var newArray = []
    for (i = 0, j = binaryVector.length; i < j; i += sizeChunk) {
        temp = binaryVector.slice(i, i + sizeChunk);
        newArray.push(temp)
    }
    return newArray
}

function circShift(array: Array<string>, steps: number) {
    let array2 = [...array] as string[]
    for (let i = 0; i < steps; i++) {
        let temp = [] as string[]
        temp.push(array2.pop() as string)
        array2.forEach(element => {
            temp.push(element)
        });
        array2 = [...temp]
    }
    return array2
}

function rightShift(array: Array<string>, steps: number) {
    let array2 = [...array] as string[]
    for (let i = 0; i < steps; i++) {
        let temp = [] as string[]
        temp.push('0')
        array2.pop()
        array2.forEach(element => {
            temp.push(element)
        });
        array2 = [...temp]
    }
    return array2
}

function xor(arr1: Array<string>, arr2: Array<string>) {
    let res = []
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] === arr2[i]) res.push('0')
        else res.push('1')
    }
    return res
}

function and(arr1: Array<string>, arr2: Array<string>) {
    let res = []
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] === '1' && arr2[i] === '1') res.push('1')
        else res.push('0')
    }
    return res
}

function not(arr: Array<string>) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '0') res.push('1')
        else res.push('0')
    }
    return res
}

function s0(x: Array<string>) { // función sumatorio sigma s0
    return xor(xor(circShift(x, 7), circShift(x, 18)), rightShift(x, 3));
}

function s1(x: Array<string>) { // función sumatorio sigma s1
    return xor(xor(circShift(x, 17), circShift(x, 19)), rightShift(x, 10));
}

function S0(x: Array<string>) { // función sumatorio S0
    return xor(xor(circShift(x, 2), circShift(x, 13)), circShift(x, 22));
}

function S1(x: Array<string>) { // función sumatorio S1
    return xor(xor(circShift(x, 6), circShift(x, 11)), circShift(x, 25));
}

function sumaMod2_32(arr1: Array<string>, arr2: Array<string>) {
    let A = binaryToDecimal(arr1)
    let B = binaryToDecimal(arr2)
    let sumaMod2_32 = (((A + B) % 4294967296) + 4294967296 ) % 4294967296
    return intToBinary(sumaMod2_32, 32)
}

function ch(arr1: Array<string>, arr2: Array<string>, arr3: Array<string>) {
    return xor(and(arr1, arr2), and(not(arr1), arr3))
}

function maj(arr1: Array<string>, arr2: Array<string>, arr3: Array<string>) {
    return xor(xor(and(arr1, arr2), and(arr1, arr3)), and(arr2, arr3))
}

function zeros(filas: number, columnas: number) {
    var a = [] as string[][]
    for (let i = 0; i < filas; i++) {
        var b = [] as string[]
        for (let j = 0; j < columnas; j++) {
            b.push('0')
        }
        a.push(b)
    }
    return a
}

function hash(user: string, password: string) {

    // VALORES HASH
    let h0 = hexToBinary('6a09e667', 32);
    let h1 = hexToBinary('bb67ae85', 32);
    let h2 = hexToBinary('3c6ef372', 32);
    let h3 = hexToBinary('a54ff53a', 32);
    let h4 = hexToBinary('510e527f', 32);
    let h5 = hexToBinary('9b05688c', 32);
    let h6 = hexToBinary('1f83d9ab', 32);
    let h7 = hexToBinary('5be0cd19', 32);

    // INICIALIZAR CONSTANTES K
    let k = [] as string[][]
    k.push(hexToBinary('428a2f98', 32))
    k.push(hexToBinary('71374491', 32))
    k.push(hexToBinary('b5c0fbcf', 32))
    k.push(hexToBinary('e9b5dba5', 32))
    k.push(hexToBinary('3956c25b', 32))
    k.push(hexToBinary('59f111f1', 32))
    k.push(hexToBinary('923f82a4', 32))
    k.push(hexToBinary('ab1c5ed5', 32))
    k.push(hexToBinary('d807aa98', 32))
    k.push(hexToBinary('12835b01', 32))
    k.push(hexToBinary('243185be', 32))
    k.push(hexToBinary('550c7dc3', 32))
    k.push(hexToBinary('72be5d74', 32))
    k.push(hexToBinary('80deb1fe', 32))
    k.push(hexToBinary('9bdc06a7', 32))
    k.push(hexToBinary('c19bf174', 32))
    k.push(hexToBinary('e49b69c1', 32))
    k.push(hexToBinary('efbe4786', 32))
    k.push(hexToBinary('0fc19dc6', 32))
    k.push(hexToBinary('240ca1cc', 32))
    k.push(hexToBinary('2de92c6f', 32))
    k.push(hexToBinary('4a7484aa', 32))
    k.push(hexToBinary('5cb0a9dc', 32))
    k.push(hexToBinary('76f988da', 32))
    k.push(hexToBinary('983e5152', 32))
    k.push(hexToBinary('a831c66d', 32))
    k.push(hexToBinary('b00327c8', 32))
    k.push(hexToBinary('bf597fc7', 32))
    k.push(hexToBinary('c6e00bf3', 32))
    k.push(hexToBinary('d5a79147', 32))
    k.push(hexToBinary('06ca6351', 32))
    k.push(hexToBinary('14292967', 32))
    k.push(hexToBinary('27b70a85', 32))
    k.push(hexToBinary('2e1b2138', 32))
    k.push(hexToBinary('4d2c6dfc', 32))
    k.push(hexToBinary('53380d13', 32))
    k.push(hexToBinary('650a7354', 32))
    k.push(hexToBinary('766a0abb', 32))
    k.push(hexToBinary('81c2c92e', 32))
    k.push(hexToBinary('92722c85', 32))
    k.push(hexToBinary('a2bfe8a1', 32))
    k.push(hexToBinary('a81a664b', 32))
    k.push(hexToBinary('c24b8b70', 32))
    k.push(hexToBinary('c76c51a3', 32))
    k.push(hexToBinary('d192e819', 32))
    k.push(hexToBinary('d6990624', 32))
    k.push(hexToBinary('f40e3585', 32))
    k.push(hexToBinary('106aa070', 32))
    k.push(hexToBinary('19a4c116', 32))
    k.push(hexToBinary('1e376c08', 32))
    k.push(hexToBinary('2748774c', 32))
    k.push(hexToBinary('34b0bcb5', 32))
    k.push(hexToBinary('391c0cb3', 32))
    k.push(hexToBinary('4ed8aa4a', 32))
    k.push(hexToBinary('5b9cca4f', 32))
    k.push(hexToBinary('682e6ff3', 32))
    k.push(hexToBinary('748f82ee', 32))
    k.push(hexToBinary('78a5636f', 32))
    k.push(hexToBinary('84c87814', 32))
    k.push(hexToBinary('8cc70208', 32))
    k.push(hexToBinary('90befffa', 32))
    k.push(hexToBinary('a4506ceb', 32))
    k.push(hexToBinary('bef9a3f7', 32))
    k.push(hexToBinary('c67178f2', 32))
    // CONVERTIMOS CADENA PASSWORD A BINARIO
    let pwdBinaryVector = stringToBinary(password)

    // AÑADIMOS 1 BIT
    let newBinaryVector = [...pwdBinaryVector]
    newBinaryVector.push('1')

    // AÑADIMOS "X" CEROS
    // Donde, x = (448 - 1 - longitud_mensaje_binario) mod 512
    let n_zeros = (((448 - 1 - pwdBinaryVector.length) % 512) + 512 ) % 512
    newBinaryVector = addedZeros(n_zeros, newBinaryVector)

    // AÑADIMOS LA LONGITUD DEL MENSAJE EXPRESADO EN 64 BITS
    newBinaryVector = newBinaryVector.concat(intToBinary(password.length*8, 64))
    // Con esto, ya tenemos un arreglo binario de longitud múltiplo de 512
    
    // DIVIDIMOS EL MENSAJE EN N PIEZAS DE 512 BITS
    let splittedBinaryVector = splitBinaryVector(newBinaryVector, 512)
    
    // LAZO PRINCIPAL
    for (let i = 0; i < splittedBinaryVector.length; i++){
        // arreglo "w" de 64 filas de 32 bits inicializado en ceros.
        var w = [] as string[][]
        // llenando con ceros
        w = zeros(64, 32)
        // para las 16 primeras filas, repartir los 512 bits de la primera pieza
        var p = -1;
        for (let n = 0; n < 16; n++) {
            for (let m = 0; m < 32; m++) {
                p++
                w[n][m] = splittedBinaryVector[i][p]
            }
        }
        // para las siguientes 48 filas (n = 17..64): w[n] = s1(w[n-2]) + w[n-7] + s0(w[n-15]) + w[n-16]
        // donde la suma "+" es en realidad suma de módulo 2^32:
        // w(n,: ) = sumaMod2_32(sumaMod2_32( sumaMod2_32( s1(w(n - 2,: ) ), w(n - 7,: ) ), s0(w(n - 15,: ))), w(n - 16,: ))
        for (let n = 16; n < 64; n++){
            w[n] = sumaMod2_32(sumaMod2_32(sumaMod2_32(s1(w[n-2]) , w[n-7]), s0(w[n-15])), w[n-16])
        }
        
        // inicializando variables de trabajo con valores hash actuales
        let a = h0;
        let b = h1;
        let c = h2;
        let d = h3;
        let e = h4;
        let f = h5;
        let g = h6;
        let h = h7;
        /* % COMPRESIÓN:
        % Bucle principal de la función de compresión:
        % Pseudocódigo:
            % Se calcula: Ch(e; f; g), Maj(a; b; c), S0(a), S1(e), and Wn
            % temp1 := h + S1(e) + Ch(e; f; g) + Kn + Wn
            % temp2 := S0(a) + Maj(a; b; c)
            % h := g
            % g := f
            % f := e
            % e := d + temp1
            % d := c
            % c := b
            % b := a
            % a := temp1 + temp2*/
        for (let n = 0; n < 64; n++) {
            let temp1 = sumaMod2_32(sumaMod2_32(sumaMod2_32(sumaMod2_32(h, S1(e)), ch(e, f, g)), k[n]), w[n]);
            let temp2 = sumaMod2_32(S0(a), maj(a, b, c));
            h = g;
            g = f;
            f = e;
            e = sumaMod2_32(d, temp1);
            d = c;
            c = b;
            b = a;
            a = sumaMod2_32(temp1, temp2);
        }
        /*% Inserción del trozo comprimido al valor hash actual(pseudocódigo):
        % h0 := h0 + a
        % h1 := h1 + b
        % h2 := h2 + c
        % h3 := h3 + d
        % h4 := h4 + e
        % h5 := h5 + f
        % h6 := h6 + g
        % h7 := h7 + h*/
        h0 = sumaMod2_32(h0, a);
        h1 = sumaMod2_32(h1, b);
        h2 = sumaMod2_32(h2, c);
        h3 = sumaMod2_32(h3, d);
        h4 = sumaMod2_32(h4, e);
        h5 = sumaMod2_32(h5, f);
        h6 = sumaMod2_32(h6, g);
        h7 = sumaMod2_32(h7, h);
    }
    var hashed = parseInt(h0.join(''), 2).toString(16) +
        parseInt(h1.join(''), 2).toString(16) +
        parseInt(h2.join(''), 2).toString(16) +
        parseInt(h3.join(''), 2).toString(16) +
        parseInt(h4.join(''), 2).toString(16) +
        parseInt(h5.join(''), 2).toString(16) +
        parseInt(h6.join(''), 2).toString(16) +
        parseInt(h7.join(''), 2).toString(16)
    console.log(
        ' user: ', user, '\n',
        'password: ', password, '\n',
        'hashed password: ', hashed)
    return hashed
}


function auth(user: string, password: string){
    var info = bd.find(item => item.user === user)
    if (info?.password === hash(user, password)) {
        return true
    } else {
        return false
    }
}

export default class LoginService{
    login(username: string, password: string): Promise<boolean>{
        return new Promise((resolve, reject) => {
            setTimeout(() =>{
                if (auth(username, password)) {
                    resolve(true);
                }else{
                    reject(false);
                }
            }, 1000)
        });
    }
}