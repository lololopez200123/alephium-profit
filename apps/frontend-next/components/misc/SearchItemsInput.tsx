'use client';

import { searchTermAtom } from '@/store/searchAtom';
import { IconButton, InputBase, Paper } from '@mui/material';
import { useAtom } from 'jotai';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const SearchItemsInput = () => {
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
  const path = usePathname();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    return () => {
      setSearchTerm('');
    };
  }, [path, setSearchTerm]);

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '14.125rem',
        height: '2rem',
        background: 'linear-gradient(180deg, rgba(40, 231, 197, 0.15) -142.19%, rgba(11, 20, 38, 0.15) 214.06%)',
        borderRadius: '1.1875rem',
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, color: 'rgba(40, 231, 197, 0.5)', fontSize: '.75rem', fontFamily: 'Poppins' }}
        placeholder="Search Coins"
        inputProps={{ 'aria-label': 'Search item coins' }}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <IconButton type="button" sx={{ p: '10px', color: 'rgb(40, 231, 197)' }} aria-label="search">
        <SearchIcon sx={{ fontSize: '1.2rem' }} />
      </IconButton>
    </Paper>
  );
};

export default SearchItemsInput;
