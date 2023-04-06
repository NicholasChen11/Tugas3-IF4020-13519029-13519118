class Helper {
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

  numberToBinary(num) {
    return (num >>> 0).toString(2)
  }
}