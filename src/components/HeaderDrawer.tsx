import { Drawer, Box, Typography, Divider } from "@mui/material";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  onLogout: () => void;

}

export const HeaderDrawer = ({ open, title, onClose, onLogout }: Props) => {

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { width: '70%' }
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          {title}
        </Typography>
        <Divider />
      </Box>
    </Drawer>
  )
}