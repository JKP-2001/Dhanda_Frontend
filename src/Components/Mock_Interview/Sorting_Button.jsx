import React, { useState } from "react";
import {
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem,
  Input,
} from "@material-tailwind/react";

const Sorting_Button = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleItemClick = (menuitem) => {
    if (props.tag !== "comp") {
      return;
    }
    const company = menuitem;
    if (props.comp && props.comp.includes(company)) {
      return;
    }
    props.setComp([...(props.comp || []), company]);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMenuItems = props.menuItems
    .filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) => !props.comp || !props.comp.includes(item));

  return (
    <Menu
      dismiss={{
        itemPress: false,
      }}
      placement="bottom-start"
    >
      <MenuHandler>
        <Button className="bg-white font-inter font-bold text-black border-[1.5px] border-gray-700">
          {props.type}
        </Button>
      </MenuHandler>
      <MenuList className="max-h-72 overflow-y-auto">
        <Input
          label="Search"
          containerProps={{
            className: "mb-4",
          }}
          value={searchTerm}
          onChange={handleSearch}
        />
        {filteredMenuItems.map((menuItem, index) => (
          <MenuItem key={index} onClick={() => handleItemClick(menuItem)}>
            {menuItem}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default Sorting_Button;
