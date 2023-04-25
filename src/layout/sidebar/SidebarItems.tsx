import React from "react";
import Menuitems from "./MenuItems";
import { useRouter } from "next/router";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem/index";
import NavGroup from "./NavGroup/NavGroup";

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const { pathname } = useRouter();
  const pathDirect = pathname;

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {/*         
        {Menuitems.map((item) => {
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                onClick={toggleMobileSidebar}
              />
            );
          }
        })} */}
      </List>
    </Box>
  );
};

export default SidebarItems;
