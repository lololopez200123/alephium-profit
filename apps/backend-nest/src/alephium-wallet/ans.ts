import {
  addressFromContractId,
  groupOfAddress,
  hexToString,
  stringToHex,
  validateAddress,
} from '@alephium/web3';
import {
  ForwardNameResolverInstance,
  NameInstance,
  ReverseNameResolverInstance,
} from './artifacts/ts';

const FORWARD_NAME_RESOLVER_ID =
  '6ed2028d263833ada7d8ac87b4478278f2e58e09ddbe819e623b17ba9e6cae00';

const REVERSE_NAME_RESOLVERS: string[] = [
  '6c7075ed4c407c4e20ae39341820240a4065fe69c3840960d2ee2633daf8b000',
  '40be2751efbf30395c079278972fbe6838f53a6e240f7b30ebfe877b7dddcd01',
  'cff6d6016d3160fd5818d92effa79594a4dceec572895d953f1a76f0163ff902',
  '5777c6381f8dd67297793a4eb6d1e8a1f0de545f5fa4e129d25f4f08d382bd03',
];

type Name = {
  name: string;
  address: string;
  capitalisation: string;
  expires: bigint;
};

export const getName = async (nameString: string): Promise<Name | null> => {
  const FORWARD_NAME_RESOLVER_ADDRESS = addressFromContractId(
    FORWARD_NAME_RESOLVER_ID,
  );
  const forwardNameResolver = new ForwardNameResolverInstance(
    FORWARD_NAME_RESOLVER_ADDRESS,
  );

  try {
    const nameContractId = (
      await forwardNameResolver.view.getNftByName({
        args: { name: stringToHex(nameString) },
      })
    ).returns;

    const nameNft = new NameInstance(addressFromContractId(nameContractId));
    const address = (await nameNft.view.getAddress()).returns;
    const capitalisation = (await nameNft.view.getCapitalisation()).returns;
    const expires = (await nameNft.view.getExpires()).returns;

    return {
      name: nameString,
      address,
      capitalisation: hexToString(capitalisation),
      expires,
    };
  } catch {
    return null;
  }
};

// Check that the target address has "Linked" their address
export const isNameLinked = async (name: Name): Promise<boolean> => {
  const group = groupOfAddress(name.address);
  const reverseNameResolverContractId = REVERSE_NAME_RESOLVERS[group];
  const reverseNameResolver = new ReverseNameResolverInstance(
    addressFromContractId(reverseNameResolverContractId),
  );
  const nameString = (
    await reverseNameResolver.view.getNameByAddress({
      args: { address: name.address },
    })
  ).returns;
  return name.name === hexToString(nameString);
};

const isValidAddress = (address: string): boolean => {
  try {
    validateAddress(address);
    return true;
  } catch {
    return false;
  }
};

const isValidName = (name: Name): boolean => {
  if (isValidAddress(name.name)) {
    return false;
  }

  const cleanName = name.name.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();

  if (name.name !== cleanName) {
    return false;
  }

  const cleanCapitalisation = name.capitalisation.toLowerCase();

  if (cleanCapitalisation !== cleanName) {
    return false;
  }

  const ONE_HOUR = 60 * 60 * 1000;
  const now = Date.now() - ONE_HOUR;
  // Minus 1 hour to pretect from expiry attack
  if (Number(name.expires) < now) {
    return false;
  }

  return true;
};

export const resolveName = async (nameString: string): Promise<Name | null> => {
  const name = await getName(nameString);
  if (name) {
    const isValid = isValidName(name);
    if (isValid) {
      await isNameLinked(name);
      return name;
    }
  }
  return null;
};

export const resolveAddressToName = async (
  address: string,
): Promise<string | null> => {
  const group = groupOfAddress(address);
  const reverseNameResolverContractId = REVERSE_NAME_RESOLVERS[group];
  const reverseNameResolver = new ReverseNameResolverInstance(
    addressFromContractId(reverseNameResolverContractId),
  );

  try {
    const nameHex = (
      await reverseNameResolver.view.getNameByAddress({ args: { address } })
    ).returns;
    return hexToString(nameHex);
  } catch {
    return null;
  }
};
