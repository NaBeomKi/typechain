import * as CryptoJS from "crypto-js";

class Block {
  static calculateBlockHash = (
    index: number,
    prevHash: string,
    timestamp: number,
    data: string
  ): string => CryptoJS.SHA256(index + prevHash + timestamp + data).toString();

  static vaildStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.prevHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";

  public index: number;
  public hash: string;
  public prevHash: string;
  public data: string;
  public timestamp: number;

  constructor(
    index: number,
    hash: string,
    prevHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.prevHash = prevHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlock: Block = new Block(0, "asd4c58e", "", "hello", 123456);

let blockchain: Block[] = [genesisBlock];

const getLatesBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimestamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const prevBlock: Block = getLatesBlock();
  const newIndex: number = prevBlock.index + 1;
  const newTimestamp: number = getNewTimestamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    prevBlock.hash,
    newTimestamp,
    data
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    prevBlock.hash,
    data,
    newTimestamp
  );
  addBlock(newBlock);
  return newBlock;
};

const getHashforBlock = (aBlock: Block): string =>
  Block.calculateBlockHash(
    aBlock.index,
    aBlock.prevHash,
    aBlock.timestamp,
    aBlock.data
  );

const isBlockVaild = (candidateBlock: Block, prevBlock: Block): boolean => {
  if (!Block.vaildStructure(candidateBlock)) {
    return false;
  } else if (prevBlock.index + 1 !== candidateBlock.index) {
    return false;
  } else if (prevBlock.hash !== candidateBlock.prevHash) {
    return false;
  } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockVaild(candidateBlock, getLatesBlock())) {
    blockchain.push(candidateBlock);
  }
};

createNewBlock("type");
createNewBlock("script");
createNewBlock("world!");

console.log(blockchain);

export {};
