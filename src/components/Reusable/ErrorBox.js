import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function ErrorBox({
  display = 'flex',
  justifyContent = 'center',
  alignItems = 'center',
  margin = '1rem auto',
  gap = '8px',
  flex = 'auto',
  width = 'auto',
  type,
  errorMessage = 'Internal error',
}) {
  const isInfo = type === 'info';

  return (
    <Box
      display={display}
      justifyContent={justifyContent}
      alignItems={alignItems}
      margin={margin}
      gap={gap}
      flex={flex}
      width={width}
      sx={{
        padding: '1rem',
        flexDirection: { xs: 'column', sm: 'row' },
        color: isInfo ? '#f5a922' : '#DC2941',
        border: isInfo
          ? '1px solid #f5a922'
          : '1px solid #DC2941',
        borderRadius: '8px',
        background: isInfo
          ? 'rgba(245, 169, 34, .1)'
          : 'rgba(220, 41, 65, .25)',
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: '24px' }} />

      <Typography
        variant="body1"
        sx={{
          fontSize: isInfo
            ? { xs: '12px', sm: '14px' }
            : { xs: '14px', sm: '16px' },
          fontFamily: 'Poppins',
          textAlign: 'center',
        }}
      >
        {errorMessage}
      </Typography>
    </Box>
  );
}