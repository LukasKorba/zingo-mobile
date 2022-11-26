export default class SyncStatusReport {
  // sync ID
  syncID: number;

  // total of batches to process (usually 1000 blocks per batch)
  totalBatches: number;

  // batch that is processing now
  currentBatch: number;

  // total blocks per batch
  blocksPerBatch: number;

  // last block of the wallet
  lastBlockWallet: number;

  // block that is processing
  currentBlock: number;

  inProgress: boolean;

  lastError: string;

  secondsPerBatch: number;

  percent: number;

  message: string;

  process_end_block: number;

  lastBlockServer: number;

  constructor() {
    this.syncID = 0;
    this.totalBatches = 0;
    this.currentBatch = 0;
    this.blocksPerBatch = 1000; // this is set in zingolib
    this.lastBlockWallet = 0;
    this.currentBlock = 0;
    this.inProgress = false;
    this.lastError = '';
    this.secondsPerBatch = 0;
    this.percent = 0;
    this.message = '';
    this.process_end_block = 0;
    this.lastBlockServer = 0;
  }
}
