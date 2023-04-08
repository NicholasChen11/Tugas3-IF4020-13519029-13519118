import { Helper } from "../helper"
import { FeistelModified } from "../feistelModified"

export class LoremCipher {
  constructor() {
    this.ip = [
      58, 50, 42, 34, 26, 18, 10, 2,
      60, 52, 44, 36, 28, 20, 12, 4,
      62, 54, 46, 38, 30, 22, 14, 6,
      64, 56, 48, 40, 32, 24, 16, 8,
      57, 49, 41, 33, 25, 17, 9, 1,
      59, 51, 43, 35, 27, 19, 11, 3,
      61, 53, 45, 37, 29, 21, 13, 5,
      63, 55, 47, 39, 31, 23, 15, 7,
    ]

    this.permutateBox = [
      16, 7, 20, 21, 29, 12, 28, 17,
      1, 15, 23, 26, 5, 8, 31, 10,
      2, 8, 24, 14, 32, 27, 3, 9,
      19, 13, 30, 6, 22, 11, 4, 25,
      40, 8, 48, 16, 56, 24, 64, 32,
      39, 7, 47, 15, 55, 23, 63, 31,
      38, 6, 46, 14, 54, 22, 62, 30,
      37, 5, 45, 13, 53, 21, 61, 29
    ]

    this.ipInverse = [
      40, 8, 48, 16, 56, 24, 64, 32,
      39, 7, 47, 15, 55, 23, 63, 31,
      38, 6, 46, 14, 54, 22, 62, 30,
      37, 5, 45, 13, 53, 21, 61, 29,
      36, 4, 44, 12, 52, 20, 60, 28,
      35, 3, 43, 11, 51, 19, 59, 27,
      34, 2, 42, 10, 50, 18, 58, 26,
      33, 1, 41, 9, 49, 17, 57, 25,
    ]

    this.f = FeistelModified()

    this.paddingLength = 0
  }

  initialPermutate(text) {
    let halfBlockLength = parseInt(text.length / 2)
    const leftBlock = text.slice(0, halfBlockLength)
    const rightBlock = text.slice(halfBlockLength)

    const permutateResult = Helper.permutate(leftBlock, this.ip) + Helper.permutate(rightBlock, this.ipInverse)

    halfBlockLength = parseInt(permutateResult.length / 2)
    const leftPermutate = permutateResult.slice(0, halfBlockLength)
    const rightPermutate = permutateResult.slice(halfBlockLength)

    return leftPermutate, rightPermutate
  }

  feistelFunction(L, R, key) {
    for (let i = 0; i < 16; i++) {
      const feistel = this.f.encrypt(R, key[i])
      const permutatedFeistel = Helper.permutate(feistel, this.permutateBox)

      const temp = L
      L = R
      R = Helper.XOR(temp, permutatedFeistel)
    }

    return L, R
  }

  lastPermutate(L, R) {
    return Helper.permutate(L, this.ipInverse) + Helper.permutate(R, this.ip)
  }

  encrypt(plaintext, key) {
    let finalResult = ""

    const splitPlaintext = []
    for (let i = 0; i < plaintext.length; i+=16) {
      splitPlaintext.push(plaintext.slice(i, i+16))
    }

    for (let pt of splitPlaintext) {
      if (plaintext.length < 16) {
        this.paddingLength = 16 - pt.length
        const padding = Array.from({length: self.padding_length}, () => {
          return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        }).join('');
        pt += padding
      }

      pt = Helper.stringToBinary(pt)

      let blockL, blockR= this.initialPermutate(pt)
      blockL, blockR = this.feistelFunction(blockL, blockR, key)
      finalResult += this.lastPermutate(blockL, blockR)
    }
    return Helper.binaryToHex(finalResult)
  }

  decrypt(ciphertext, key) {
    let finalResult = ""
    
    const splitCiphertext = []
    for (let i = 0; i < ciphertext.length; i+=32) {
      splitCiphertext.push(ciphertext.slice(i, i+32))
    }

    for (let ct of splitCiphertext) {
      ct = Helper.hexToBinary(ct)
      let blockL, blockR = this.initialPermutate(ct)
      blockL, blockR = this.feistelFunction(blockL, blockR, key)
      finalResult += this.lastPermutate(blockL, blockR)
    }

    finalResult = Helper.binaryToString(finalResult)
    finalResult = finalResult.slice(0, finalResult.length - this.paddingLength)
    return finalResult
  }
}