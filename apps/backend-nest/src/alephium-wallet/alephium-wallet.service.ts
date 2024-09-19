import { web3 } from '@alephium/web3';
import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { resolveAddressToName, resolveName } from './ans';

@Injectable()
export class AlephiumWalletService {
  constructor(private readonly userService: UserService) {}
  private readonly Logger: Logger = new Logger(AlephiumWalletService.name);

  async verifyTokenIdIsInWallet(
    tokenId: string,
    address: string,
  ): Promise<boolean> {
    if (!tokenId || !address) {
      throw new Error('tokenId or address is required');
    }
    const explorerProviderURL = `https://backend-v113.mainnet.alephium.org/addresses/${address}/tokens/${tokenId}/balance`;
    const resp = await fetch(explorerProviderURL);
    if (!resp.ok) {
      throw new Error('Error verifying tokenId in wallet');
    }
    const json = await resp.json();
    return Number(json.balance) === 1;
  }

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async retry<T>(
    fn: () => Promise<T>,
    retries: number,
    delayTime: number,
  ): Promise<T> {
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (error) {
        if (i < retries - 1) {
          console.log(`Retrying... (${i + 1}/${retries})`);
          await this.delay(delayTime);
        } else {
          throw error;
        }
      }
    }
    throw new Error('Max retries reached');
  }

  async getANSFromAddress(address: string) {
    try {
      web3.setCurrentNodeProvider('https://wallet.mainnet.alephium.org');
      const name = await resolveAddressToName(address);
      return name;
    } catch (error) {
      console.log(error);
    }
  }

  async verifyNameANS(name: string, address: string): Promise<boolean> {
    try {
      const resolvedAddress = await resolveName(name);
      return resolvedAddress.address === address;
    } catch (error) {
      console.log('Failed to verify name', error);
      throw new Error();
    }
  }
}
