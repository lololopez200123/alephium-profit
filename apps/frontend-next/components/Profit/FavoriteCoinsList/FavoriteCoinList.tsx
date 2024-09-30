import { Box } from '@mui/material';
import ItemFavourites from '@/components/Profit/itemFavourites/ItemFavourites';
import { TokenDetailsWithPNL } from '@/app/profit/page';

type FavoriteCoinsListProps = {
  tokens: TokenDetailsWithPNL[];
  handleSelectCoin: (item: TokenDetailsWithPNL) => void;
  selectedCoinName: string | undefined;
};

const FavoriteCoinsList: React.FC<FavoriteCoinsListProps> = ({ tokens, handleSelectCoin, selectedCoinName }) => {
  return (
    <Box sx={{ overflowY: 'auto', paddingBottom: '4rem' }}>
      <Box sx={{ height: '100%' }}>
        {tokens.map((item, index) => (
          <ItemFavourites key={index} item={item} handleSelectCoin={handleSelectCoin} index={index} isSelected={selectedCoinName === item.name} />
        ))}
      </Box>
    </Box>
  );
};

export default FavoriteCoinsList;
