/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useState } from 'react';
import { ScrollView, View, Text, Dimensions, TouchableOpacity, Alert } from 'react-native';

import RegText from '../../../components/Components/RegText';
import FadeText from '../../../components/Components/FadeText';

import { useTheme } from '@react-navigation/native';
import { ContextAppLoaded } from '../../context';
import RPC from '../../rpc';
import { ThemeType } from '../../types';

type Options = {
  value: string;
  text: string;
};

type MenuProps = {
  onItemSelected: (item: string) => Promise<void>;
  set_debugMode_option: (name: 'debugMode', value: boolean) => Promise<void>;
};

const Menu: React.FunctionComponent<MenuProps> = ({ onItemSelected, set_debugMode_option }) => {
  const context = useContext(ContextAppLoaded);
  const { translate, readOnly, mode, transactions, addLastSnackbar, debugMode } = context;
  const { colors } = useTheme() as unknown as ThemeType;
  const [onLongPressTimes, setOnLongPressTimes] = useState<number>(0);
  const item = {
    fontSize: 14,
    paddingTop: 15,
  };
  const dimensions = {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  };
  const debugModesArray = translate('settings.debugmodes');
  let DEBUGMODES: Options[] = [];
  if (typeof debugModesArray === 'object') {
    DEBUGMODES = debugModesArray as Options[];
  }

  const onItemSelectedWrapper = (value: string) => {
    // if the user click on a screen in the menu the sync is going to continue
    (async () => await RPC.rpc_setInterruptSyncAfterBatch('false'))();
    onItemSelected(value);
  };

  const debugModeOnPress = () => {
    if (onLongPressTimes === 0) {
      // need another long Press to Activate Debug Mode
      addLastSnackbar({ message: translate('settings.keeppressing') as string, type: 'Primary' });
      setOnLongPressTimes(1);
    } else {
      Alert.alert(
        translate('settings.debugmode-title') as string,
        DEBUGMODES.filter((it: Options) => Boolean(it.value) !== debugMode)[0].text,
        [
          {
            text: translate(
              `settings.value-debugmode-${
                DEBUGMODES.filter((it: Options) => Boolean(it.value) !== debugMode)[0].value
              }`,
            ) as string,
            onPress: () => set_debugMode_option('debugMode', !debugMode),
          },
          { text: translate('cancel') as string, style: 'cancel' },
        ],
        { cancelable: true, userInterfaceStyle: 'light' },
      );
      setOnLongPressTimes(0);
    }
  };

  return (
    <View style={{ height: '100%' }}>
      <ScrollView
        scrollsToTop={false}
        style={{
          flex: 1,
          width: dimensions.width,
          height: dimensions.height,
          backgroundColor: '#010101',
        }}
        contentContainerStyle={{ display: 'flex' }}>
        <FadeText style={{ margin: 20 }}>{translate('loadedapp.options') as string}</FadeText>
        <View style={{ height: 1, backgroundColor: colors.primary }} />

        <View style={{ display: 'flex', marginLeft: 20 }}>
          <RegText onPress={() => onItemSelectedWrapper('About')} style={item}>
            {translate('loadedapp.about') as string}
          </RegText>

          {mode !== 'basic' && (
            <RegText onPress={() => onItemSelectedWrapper('Info')} style={item}>
              {translate('loadedapp.info') as string}
            </RegText>
          )}

          <RegText testID="menu.settings" onPress={() => onItemSelectedWrapper('Settings')} style={item}>
            {translate('loadedapp.settings') as string}
          </RegText>

          {!(mode === 'basic' && transactions.length <= 0) && (
            <RegText onPress={() => onItemSelectedWrapper('Wallet')} style={item}>
              {readOnly
                ? mode === 'basic'
                  ? (translate('loadedapp.walletufvk-basic') as string)
                  : (translate('loadedapp.walletufvk') as string)
                : mode === 'basic'
                ? (translate('loadedapp.walletseed-basic') as string)
                : (translate('loadedapp.walletseed') as string)}
            </RegText>
          )}

          {mode !== 'basic' && (
            <RegText onPress={() => onItemSelectedWrapper('Rescan')} style={item}>
              {translate('loadedapp.rescanwallet') as string}
            </RegText>
          )}

          {mode !== 'basic' && (
            <RegText testID="menu.syncreport" onPress={() => onItemSelectedWrapper('Sync Report')} style={item}>
              {translate('loadedapp.report') as string}
            </RegText>
          )}

          {mode !== 'basic' && (
            <RegText testID="menu.fund-pools" onPress={() => onItemSelectedWrapper('Fund Pools')} style={item}>
              {translate('loadedapp.fundpools') as string}
            </RegText>
          )}

          {!(mode === 'basic' && transactions.length <= 0) && (
            <RegText onPress={() => onItemSelectedWrapper('Insight')} style={item}>
              {translate('loadedapp.insight') as string}
            </RegText>
          )}

          {mode !== 'basic' && (
            <RegText testID="menu.changewallet" onPress={() => onItemSelectedWrapper('Change Wallet')} style={item}>
              {translate('loadedapp.changewallet') as string}
            </RegText>
          )}

          {mode !== 'basic' && (
            <RegText onPress={() => onItemSelectedWrapper('Restore Wallet Backup')} style={item}>
              {translate('loadedapp.restorebackupwallet') as string}
            </RegText>
          )}
          {mode === 'basic' && transactions.length === 0 && (
            <RegText onPress={() => onItemSelectedWrapper('Load Wallet From Seed')} style={item}>
              {translate('loadedapp.loadwalletfromseed-basic') as string}
            </RegText>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity onLongPress={() => debugModeOnPress()}>
        <View
          style={{
            padding: 10,
            position: 'absolute',
            bottom: 5,
            flexDirection: 'row',
            backgroundColor: '#010101',
          }}>
          <Text style={{ fontSize: 8, color: colors.border }}>Version : </Text>
          <Text style={{ fontSize: 8, color: colors.primaryDisabled }}>{translate('version') as string}</Text>
          <Text style={{ fontSize: 8, color: colors.border, marginLeft: 5 }}>{`${translate('settings.mode')}${translate(
            `settings.value-mode-${mode}`,
          )}`}</Text>
          {debugMode && (
            <Text style={{ fontSize: 8, color: colors.primary, marginLeft: 5 }}>
              {translate('settings.debugmode-title') as string}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Menu;
