// lib/walletActions.ts
import { supabase } from './supabase';
import { generateAccountNumber } from './utils';

export const openWallet = async (userId: string, currencyCode: string) => {
  // ИСПРАВЛЕНО: вызываем без аргументов ()
  const accNum = generateAccountNumber(); 

  if (currencyCode === 'PLN') {
    const { error } = await supabase
      .from('profiles')
      .update({ account_number: accNum })
      .eq('user_id', userId);
    return { error };
  } else {
    const { error } = await supabase
      .from('wallets')
      .insert([
        { 
          user_id: userId, 
          currency_code: currencyCode, 
          balance: 0, 
          account_number: accNum 
        }
      ]);
    return { error };
  }
};