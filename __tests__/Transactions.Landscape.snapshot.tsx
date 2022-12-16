/**
 * @format
 */

import 'react-native';
import React from 'react';

import { render } from '@testing-library/react-native';
import Transactions from '../components/Transactions';
import { ContextLoadedProvider } from '../app/context';

import {
  Address,
  ErrorModalData,
  InfoType,
  ReceivePageState,
  SendPageState,
  SendProgress,
  SyncStatusReport,
  ToAddr,
  TotalBalance,
  Transaction,
  WalletSettings,
} from '../app/AppState';

jest.useFakeTimers();
jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: '',
}));
jest.mock('react-native-localize', () => ({
  getNumberFormatSettings: () => {
    return {
      decimalSeparator: '.', // us
      groupingSeparator: ',', // us
    };
  },
}));
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// test suite
describe('Component Transactions - test', () => {
  //snapshot test
  test('Transactions Landscape - snapshot', () => {
    const state = {
      navigation: null,
      route: null,

      syncStatusReport: new SyncStatusReport(),
      addressPrivateKeys: new Map(),
      addressBook: [],
      transactions: [
        {
          type: 'sent',
          address: 'sent-address-12345678901234567890',
          amount: 0.12345678,
          position: '',
          confirmations: 22,
          txid: 'sent-txid-1234567890',
          time: 1668712802,
          zec_price: 33.33,
          detailedTxns: [],
        },
        {
          type: 'receive',
          address: 'receive-address-12345678901234567890',
          amount: 0.87654321,
          position: '',
          confirmations: 133,
          txid: 'receive-txid-1234567890',
          time: 1669755896,
          zec_price: 66.66,
          detailedTxns: [],
        },
      ] as Transaction[],
      sendPageState: new SendPageState(new ToAddr(0)),
      receivePageState: new ReceivePageState(),
      info: {} as InfoType,
      rescanning: false,
      wallet_settings: new WalletSettings(),
      syncingStatus: null,
      errorModalData: new ErrorModalData(),
      txBuildProgress: new SendProgress(),
      walletSeed: null,
      isMenuDrawerOpen: false,
      selectedMenuDrawerItem: '',
      aboutModalVisible: false,
      computingModalVisible: false,
      settingsModalVisible: false,
      infoModalVisible: false,
      rescanModalVisible: false,
      seedViewModalVisible: false,
      seedChangeModalVisible: false,
      seedBackupModalVisible: false,
      seedServerModalVisible: false,
      syncReportModalVisible: false,
      poolsModalVisible: false,
      newServer: null,
      uaAddress: 'UA-12345678901234567890',
      addresses: [
        {
          uaAddress: 'UA-12345678901234567890',
          address: 'UA-12345678901234567890',
          addressKind: 'u',
          containsPending: false,
          receivers: 'ozt',
        },
        {
          uaAddress: 'UA-12345678901234567890',
          address: 'sapling-12345678901234567890',
          addressKind: 'z',
          containsPending: false,
          receivers: 'z',
        },
        {
          uaAddress: 'UA-12345678901234567890',
          address: 'transparent-12345678901234567890',
          addressKind: 't',
          containsPending: false,
          receivers: 't',
        },
      ] as Address[],
      translate: () => 'text translated',
      dimensions: {
        width: 600,
        height: 300,
        orientation: 'landscape',
        deviceType: 'phone',
        scale: 2.5,
      } as {
        width: number;
        height: number;
        orientation: 'portrait' | 'landscape';
        deviceType: 'tablet' | 'phone';
        scale: number;
      },
      totalBalance: new TotalBalance(),
    };
    state.info.currencyName = 'ZEC';
    state.totalBalance.total = 1.12345678;
    const onFunction = jest.fn();
    const transactions = render(
      <ContextLoadedProvider value={state}>
        <Transactions
          doRefresh={onFunction}
          toggleMenuDrawer={onFunction}
          setComputingModalVisible={onFunction}
          poolsMoreInfoOnClick={onFunction}
          syncingStatusMoreInfoOnClick={onFunction}
        />
      </ContextLoadedProvider>,
    );
    expect(transactions.toJSON()).toMatchSnapshot();
  });
});
