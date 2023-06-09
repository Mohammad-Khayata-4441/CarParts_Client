import List from "@mui/material/List";
import { NavLink } from "react-router-dom";
import navLinks from "@/router/Navigation";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
type Props = {
  isOpen: boolean;
};
export default function DashboardNavLinks(props: Props) {
  return (
    <List>
      {navLinks.map((item) => (
        <NavLink to={{ pathname: item.path }} end key={item.path}>
          {({ isActive }) => {
            return (
              <ListItem>
                <ListItemButton
                  sx={({ palette }) => ({
                    py: 0.8,
                    px: 2,
                    borderRadius: "0.5rem",
                    minHeight:45,
                    transition:'0.2s',
                    color: isActive ? "white" : palette.text.primary,
                    ":hover":{
                      background:'transparent',
                      color:palette.primary.main,
                    },
                    "&.Mui-selected , &.Mui-selected:hover": {
                      backgroundColor:palette.background.default,
                      // backgroundColor: 'transparent',
                      color:palette.primary.main,
                      "::after":({palette})=>({
                        content:"''",
                        background:palette.primary.main,
                        width:'5px',
                        position:'absolute',
                        height:'35px',
                        right:'-16px',
                        borderRadius:'5px 0 0 5px',

                      })
                    },
                  })}
                  selected={isActive}
                >
                  <ListItemIcon
                    sx={() => ({
                      minWidth: 40,
                      color:'inherit'
                    })}
                  >
                    
                    <item.icon size={"1.4rem"} />
                  </ListItemIcon>
                  {props.isOpen && <ListItemText primary={item.text} />}
                </ListItemButton>
              </ListItem>
            );
          }}
        </NavLink>
      ))}
    </List>
  );
}
