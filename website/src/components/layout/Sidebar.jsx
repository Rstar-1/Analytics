import React, { useState, useMemo, memo } from "react";
import { NavLink } from "react-router-dom";
import Container from "../common/Container";
import Icon from "../common/Icon";
import { menuData } from "../../utils/apiData";

const SidebarLink = memo(({ to, label, iconName }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <NavLink
      to={to}
      title={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={({ isActive }) =>
        `flex items-center justify-center py-8 rounded-5 small-text font-500 list-none mb-2 ${isActive || hovered ? "bg-forth text-dark" : "text-gray"
        }`
      }
    >
      {iconName && (
        <div className="icon relative flex items-center justify-center">
          <Icon name={iconName} width="16" height="16" />
        </div>
      )}
    </NavLink>
  );
});
SidebarLink.displayName = "SidebarLink";

const SidebarHeader = memo(() => (
  <div className="py-12 flex items-center justify-center px-8">
    <div className="bg-primary icon-lg rounded-5">
      <p className="text-white font-400 headpara-text">K</p>
    </div>
  </div>
));
SidebarHeader.displayName = "SidebarHeader";

const Sidebar = () => {
  const menuItems = useMemo(() => {
    return (menuData || []).filter((item) => item?.status !== false);
  }, []);

  return (
    <Container version="v0" className="h-100 bg-white overflow-auto">
      <SidebarHeader />

      <div className="overflow-auto px-8">
        {menuItems.map((item, idx) => {
          if (!item.route && item.category?.length > 0) {
            return (
              <React.Fragment key={idx}>
                <hr className="border-0 bg-tertiary mt-12 mb-10" style={{ height: "1px" }} />
                {item.category.map((subItem, subIdx) => (
                  <SidebarLink
                    key={subIdx}
                    to={subItem.route}
                    label={subItem.name}
                    iconName={subItem.icon}
                  />
                ))}
              </React.Fragment>
            );
          }

          return (
            <SidebarLink
              key={idx}
              to={item.route}
              label={item.name}
              iconName={item.icon}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default memo(Sidebar);