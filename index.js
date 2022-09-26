const wordlist = require("wordlist-english");
const americanWords = wordlist["english/american"];

const generateHexString = () => {
  // generate a random number between 0x11111111 and 0xFFFFFFFF
  let random =
    Math.floor(
      Math.random() * (parseInt("ffffffff", 16) - parseInt("11111111", 16))
    ) + parseInt("11111111", 16);

  const sequencesHex = [];

  const sequencesHexString = "0123456789abcdef";

  for (let i = 0; i < 16; i++) {
    let sequence = "";
    let sequenceTwo = "";
    if (i < 8) {
      for (let j = i; j < i + 16 - 8; j++) {
        sequence += sequencesHexString.charAt(j);
      }
      sequencesHex.push(sequence);
    }
    for (let j = 0; j < 8; j++) {
      sequenceTwo += sequencesHexString.charAt(i);
    }

    sequencesHex.push(sequenceTwo);
  }

  // console.log(sequencesHex);

  const checkHexString = (hexString) => {
    for (let i = 0; i < hexString.length; i++) {
      if (hexString[i] < "a" || hexString[i] > "z") {
        continue;
      }
      for (let j = i + 2; j < hexString.length; j++) {
        let word = hexString.substring(i, j);
        if (
          americanWords.includes(word) !== -1 ||
          sequencesHex.includes(word) !== -1
        ) {
          return false;
        }
      }
    }
    return true;
  };

  while (true) {
    let hexString = random.toString(16);
    if (checkHexString(hexString)) {
      break;
    }
    random =
      Math.floor(
        Math.random() * (parseInt("ffffffff", 16) - parseInt("11111111", 16))
      ) + parseInt("11111111", 16);
  }

  const hex = random.toString(16);

  console.log("0x" + hex.toUpperCase());
};

for (let i = 0; i < 100; i++) {
  // try to generate 100 hex strings
  generateHexString();
}
