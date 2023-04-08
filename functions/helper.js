export class Helper {
  XOR(stringA, stringB) {
    let result = ""

    for (const i in stringA) {
      if (stringA[i] === stringB[i]) {
        result += "0"
      } else {
        result += "1"
      }
    }
    return result
  }

  permutate(str, permutationMatrix) {
    let result = ""
    for (const num of permutationMatrix) {
      result += str[num - 1]
    }
    return result
  }

  binaryToNumber(binary) {
    return parseInt(binary, 2)    
  }

  binaryToString(bin) {
    return String.fromCharCode(parseInt(bin, 2))
  }

  binaryToHex(bin) {
    const map = {
      "0000": '0',
      "0001": '1',
      "0010": '2',
      "0011": '3',
      "0100": '4',
      "0101": '5',
      "0110": '6',
      "0111": '7',
      "1000": '8',
      "1001": '9',
      "1010": 'A',
      "1011": 'B',
      "1100": 'C',
      "1101": 'D',
      "1110": 'E',
      "1111": 'F'
    }

    let hex = ""
    for (let i = 0; i < bin.length; i+=4) {
      let ch = ""
      ch += bin[i]
      ch += bin[i + 1]
      ch += bin[i + 2]
      ch += bin[i + 3]
      hex += map[ch]
    }

    return hex
  }

  numberToBinary(num) {
    return (num >>> 0).toString(2)
  }

  stringToBinary(str) {
    let hex = ""
    for (c of str) {
      hex += c.charCodeAt(0).toString(2)
    }
  }

  hexToBinary(hex) {
    const map = {
      '0': "0000",
      '1': "0001",
      '2': "0010",
      '3': "0011",
      '4': "0100",
      '5': "0101",
      '6': "0110",
      '7': "0111",
      '8': "1000",
      '9': "1001",
      'A': "1010",
      'B': "1011",
      'C': "1100",
      'D': "1101",
      'E': "1110",
      'F': "1111"
    }

    let bin = ""
    for (const h of hex) {
      bin += map[h]
    }

    return bin
  }
}