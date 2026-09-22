import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

import Container from "../common/Container";
import Image from "../common/Image";
import Icon from "../common/Icon";
import Button from "../common/Button";
import Modal from "../common/Modal";
import Dropdown from "../common/Dropdown";
import Fields from "../forms/Fields";

import { header, configData } from "../../utils/apiData";
import { resolveImagePath } from "../../utils/imageResolver";
import { useCart } from "../../context/CartContext";

const isEcom = import.meta.env.VITE_ECOM === "true";
const headerType = configData?.Header?.HeaderType ?? configData?.Header?.[0]?.HeaderType ?? 1;

const LogoClass = {
  1: "w-25 sm-w-85",
  2: "w-15 sm-w-85",
  3: "w-15 sm-w-85",
  4: "w-15 sm-w-85",
}[headerType] || "w-25 sm-w-85";

const NavigationClass = {
  1: "w-50 justify-center",
  2: "w-60 justify-start",
  3: isEcom ? "w-70 justify-end" : "w-75 justify-end",
  4: "w-70 justify-end",
}[headerType] || "w-50 justify-center";

const ActionClass = {
  1: "w-25 sm-w-15",
  2: "w-25 sm-w-15",
  3: isEcom ? "w-25 sm-w-15" : "w-20 sm-w-15",
  4: "w-20 sm-w-15",
}[headerType] || "w-25 sm-w-15";

const CategoryClass = {
  1: "justify-between",
  2: "justify-start",
}[configData?.Header?.HeaderCategory] || "justify-between";


const HeaderTopBar = React.memo(() => {
  if (configData?.Header?.[0]?.HeaderTopBar === false) {
    return null;
  }

  const { location: loc, email, timing } = header.topBar || {};

  return (
    <Container style={{ background: 'var(--primary)' }} className="sm-hidden md-hidden">
      <div className="py-4 w-full flex items-center justify-between mini-text text-white">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-6">
            <Icon
              name="MapPin"
              width="14"
              height="14"
              stroke="var(--white)"
            />

            <p>{loc || "Riverside Park EU-1001"}</p>
          </div>

          <span>|</span>

          <div className="flex items-center gap-6">
            <Icon
              name="Mail"
              width="14"
              height="14"
              stroke="var(--white)"
            />

            <a
              href={`mailto:${email || "hello@Infitech.com"}`}
              className="text-white"
            >
              {email || "hello@Infitech.com"}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Icon
            name="Clock"
            width="14"
            height="14"
            stroke="var(--white)"
          />

          <p>
            {timing || "Mon–Fri 09:00 AM – 06:00 PM"}
          </p>
        </div>
      </div>
    </Container>
  );
});

const HeaderLogo = React.memo(({ isHeaderWhite, onCloseMobile }) => {

  const logoSrc =
    !configData?.Header?.HeaderSticky || isHeaderWhite
      ? "/src/assets/sobo_logo.webp"
      : "/src/assets/sobo_white.png";

  return (
    <NavLink
      to="/home"
      className={LogoClass}
      onClick={onCloseMobile}
    >
      <Image
        src={resolveImagePath(logoSrc)}
        alt="Infitech Logo"
        className="object-contain"
        style={{
          width: "auto",
          height: "50px",
        }}
      />
    </NavLink>
  );
});

const HeaderNavigation = React.memo(
  ({
    pathname,
    hoveredNav,
    activeMegaMenu,
    isHeaderWhite,
    onNavMouseEnter,
    onNavMouseLeave,
  }) => {
    const isMegaOpen = Boolean(activeMegaMenu);

    return (
      <div
        className={`${NavigationClass} sm-hidden md-hidden flex items-center h-full gap-4`}>
        {header.navLinks?.map((item) => {
          const isActive = pathname === item.href;

          const isHovered =
            hoveredNav === (item.label || item.href);

          const isItemMegaActive =
            isMegaOpen &&
            item.megaMenuKey === activeMegaMenu;

          const linkColor =
            isActive ||
              isHovered ||
              isItemMegaActive
              ? "var(--primary)"
              : configData?.Header?.HeaderSticky
                ? isHeaderWhite
                  ? "var(--dark)"
                  : "var(--white)"
                : "var(--dark)";

          return (
            <div
              key={item.href}
              onMouseEnter={() => onNavMouseEnter(item)}
              onMouseLeave={onNavMouseLeave}
              className="relative flex items-center h-full"
            >
              <NavLink
                to={item.href}
                className="font-500 para-text px-16 cursor-pointer flex items-center"
                style={{
                  color: linkColor,
                }}
              >
                {item.label}

                {item.hasMegaMenu && (
                  <Icon
                    name="ChevronDown"
                    width="18"
                    height="18"
                    stroke={linkColor}
                    style={{
                      transition:
                        "transform 0.2s ease",

                      transform: isItemMegaActive
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  />
                )}
              </NavLink>
            </div>
          );
        })}
      </div>
    );
  }
);

const HeaderBottomBar = React.memo(
  ({
    isEcom,
    pathname,
    hoveredNav,
    activeMegaMenu,
    isHeaderWhite,
    onNavMouseEnter,
    onNavMouseLeave,
  }) => {
    if (!isEcom) {
      return null;
    }

    if (configData?.Header?.[0]?.HeaderBottomBar === false) {
      return null;
    }

    const menuItems = header.bottomBar?.menu || [];
    if (!menuItems.length) {
      return null;
    }

    const isMegaOpen = Boolean(activeMegaMenu);

    return (
      <div
        className="sm-hidden md-hidden w-full"
        style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
      >
        <Container>
          <div className={`${CategoryClass} flex items-center w-full py-16`} style={{ gap: '26px' }}>
            {menuItems.map((item, idx) => {
              const isActive = pathname === item.href;
              const isHovered =
                hoveredNav === (item.label || item.href);
              const isItemMegaActive =
                isMegaOpen &&
                item.megaMenuKey &&
                item.megaMenuKey === activeMegaMenu;

              const linkColor =
                isActive || isHovered || isItemMegaActive
                  ? "var(--primary)"
                  : configData?.Header?.HeaderSticky
                    ? isHeaderWhite
                      ? "var(--dark)"
                      : "var(--white)"
                    : "var(--dark)";

              return (
                <div
                  key={item.label || idx}
                  onMouseEnter={() =>
                    onNavMouseEnter(item)
                  }
                  onMouseLeave={onNavMouseLeave}
                  className="relative flex items-center h-full"
                >
                  <NavLink
                    to={item.href || "/product"}
                    className="font-500 mini-text capitalize cursor-pointer flex items-center gap-2"
                    style={{ color: linkColor }}
                  >
                    {item.label}
                    {item.hasMegaMenu && (
                      <Icon
                        name="ChevronDown"
                        width="20"
                        height="20"
                        stroke={linkColor}
                        style={{
                          transition:
                            "transform 0.2s ease",
                          transform: isItemMegaActive
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      />
                    )}
                  </NavLink>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    );
  }
);

const CartSidebar = React.memo(
  ({
    isEcom,
    cartItems,
    cartQty,
    subtotal,
    isCartOpen,
    isHeaderWhite,
    onOpenCart,
    onCloseCart,
    onRemove,
    onSetQuantity,
    onNavigate,
  }) => {
    if (!isEcom) {
      return null;
    }

    return (
      <Modal
        type="sidebar"
        placement="right"
        size="sm"
        title={`Your cart (${cartQty})`}
        footer={null}
        isOpen={isCartOpen}
        onClose={onCloseCart}
        trigger={
          <div className="relative">
            <Button
              aria-label="Cart"
              onClick={onOpenCart}
              icon="ShoppingCart"
              iconWidth="16"
              iconHeight="16"
              iconStrokeWidth="2"
              variant="outline"
              iconStroke={
                configData?.Header?.HeaderSticky
                  ? isHeaderWhite
                    ? "var(--primary)"
                    : "var(--white)"
                  : "var(--primary)"
              }
              version="icon"
              bg={
                configData?.Header?.HeaderSticky
                  ? isHeaderWhite
                    ? "var(--primary)"
                    : "none"
                  : "var(--primary)"
              }
              className="border-primary rounded-30 p-12 relative"
            />

            {cartQty > 0 && (
              <p
                className="bg-primary flex items-center justify-center rounded-full text-white absolute"
                style={{
                  top: "-7px",
                  right: "-7px",
                  width: '20px',
                  height: '20px',
                  fontSize: "10px",
                }}
              >
                {cartQty}
              </p>
            )}
          </div>
        }
      >
        <div className="grid-cols-1 items-start gap-12 pb-20 mb-100 h-500 overflow-auto">
          <div>
            {cartItems.length > 0 ? (
              <div className="grid-cols-1 gap-12 mt-10">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-12 items-center relative pb-20 bordb"
                  >
                    <div className="w-35 h-100px rounded-5 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        className="flex w-full h-full object-cover"
                      />
                    </div>

                    <div className="w-65">
                      <p className="mini-text text-gray font-400">
                        {item.category}
                      </p>

                      <h4 className="headmini-text text-dark font-600">
                        {item.name}
                      </h4>

                      <div className="flex items-center justify-between mt-5">
                        <Fields
                          type="quantity"
                          value={item.quantity}
                          onChange={(value) =>
                            onSetQuantity(
                              item.id,
                              value
                            )
                          }
                        />

                        <p className="small-text font-600 text-dark">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() =>
                        onRemove(item.id)
                      }
                      className="icon absolute top-0 right-0 cursor-pointer"
                    >
                      <Icon
                        name="Close"
                        width="16"
                        height="16"
                        stroke="var(--danger)"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-40 bg-forth">
                <Icon
                  name="ShoppingCart"
                  width="48"
                  height="48"
                  stroke="var(--primary)"
                  className="mx-auto mb-10"
                />

                <p className="small-text font-500 capitalize text-gray">
                  Your cart is empty
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="w-full fixed bottom-0 left-0 bg-forth bordh">
          <div className="p-30">
            <div className="flex items-center justify-between mb-16">
              <p className="small-text font-500 text-dark">
                Subtotal
              </p>

              <p className="small-text font-500 text-primary">
                ₹{subtotal}
              </p>
            </div>

            <div className="grid-cols-2 gap-10">
              <Button
                text="Checkout"
                version="v2"
                bg="primary"
                color="white"
                disabled={cartItems.length === 0}
                onClick={() => {
                  onCloseCart();
                  onNavigate("/pricing");
                }}
              />

              <Button
                text="View Products"
                version="v2"
                variant="outline"
                bg="primary"
                color="dark"
                onClick={() => {
                  onCloseCart();
                  onNavigate("/products");
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    );
  }
);

const HeaderActions = React.memo(
  ({
    isHeaderWhite,
    isMobileOpen,
    setIsMobileOpen,
    cartSection,
    onNavigate,
  }) => {
    return (
      <div className={`${ActionClass} flex justify-end`}>
        <div className="sm-hidden md-hidden flex items-center" style={{ gap: '14px' }}>
          <Button
            aria-label="Call Us"
            onClick={() => {
              window.location.href =
                "tel:+5284567592";
            }}
            icon="Phone"
            iconWidth="16"
            iconHeight="16"
            iconStrokeWidth="2"
            variant="outline"
            border={
              configData?.Header?.HeaderSticky
                ? isHeaderWhite
                  ? "primary"
                  : "white"
                : "primary"
            }
            iconStroke={
              configData?.Header?.HeaderSticky
                ? isHeaderWhite
                  ? "var(--primary)"
                  : "var(--white)"
                : "var(--primary)"
            }
            version="icon"
            bg="transparent"
            className="rounded-30 p-12"
          />

          {cartSection}

          <Button
            text="Schedule Call"
            onClick={() =>
              onNavigate("/connect")
            }
            bg="primary"
            color="white"
            border="primary"
            icon={configData?.Header?.HeaderType === 4 ? "" : "ArrowRight"}
            iconPosition="right"
            iconWidth="16"
            iconHeight="16"
            version="v1"
            className="rounded-30"
          />
        </div>

        <Button
          onClick={() =>
            setIsMobileOpen(
              (prev) => !prev
            )
          }
          aria-label="Toggle Navigation Menu"
          className="hidden md-flex sm-flex"
          icon={
            isMobileOpen
              ? "Close"
              : "Menu"
          }
          iconWidth="32"
          iconHeight="32"
          iconStroke={
            configData?.Header?.HeaderSticky
              ? isHeaderWhite
                ? "#161616"
                : "#FFFFFF"
              : "#161616"
          }
          version="icon"
          bg="transparent"
        />
      </div>
    );
  }
);

const MegaMenu = React.memo(
  ({
    activeMegaMenu,
    activeCategoryTab,
    setActiveCategoryTab,
    onClose,
    onMouseEnter,
    onMouseLeave,
  }) => {

    const currentMenu = React.useMemo(() => {
      if (!activeMegaMenu) {
        return null;
      }

      return (
        header.megaMenu?.[
        activeMegaMenu
        ] || null
      );
    }, [activeMegaMenu]);

    const categories = React.useMemo(() => {
      return currentMenu?.categories || [];
    }, [currentMenu]);

    const currentCategory = React.useMemo(() => {
      return (
        categories.find(
          (category) =>
            category.id ===
            activeCategoryTab
        ) || categories[0]
      );
    }, [
      categories,
      activeCategoryTab,
    ]);

    if (!currentMenu) {
      return null;
    }

    return (
      <Dropdown
        isOpen={Boolean(activeMegaMenu)}
        onClose={onClose}
        align="full"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="w-full bg-white bordh"
      >
        <Container>
          <div className="flex items-start gap-12 py-20 w-full">
            <div className="grid-cols-1 w-20">
              {categories.map((cat) => {
                const isActive =
                  currentCategory?.id ===
                  cat.id;

                return (
                  <div
                    key={cat.id}
                    onMouseEnter={() =>
                      setActiveCategoryTab(
                        cat.id
                      )
                    }
                    onClick={() =>
                      setActiveCategoryTab(
                        cat.id
                      )
                    }
                    className="flex items-center justify-between p-12 rounded-5 cursor-pointer"
                    style={{
                      backgroundColor:
                        isActive
                          ? "var(--tertiary)"
                          : "transparent",

                      color: isActive
                        ? "var(--dark)"
                        : "#334155",
                    }}
                  >
                    <p className="mini-text font-500">
                      {cat.name}
                    </p>

                    {cat.badge && (
                      <p className="mini-text rounded-20 px-8 py-2 font-500 bg-light-success text-success">
                        {cat.badge}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="w-80">
              <div
                key={currentCategory?.id || "category-grid"}
                className="grid grid-cols-4 sm-grid-cols-2 gap-12"
              >
                {currentCategory?.items?.map(
                  (item, idx) => (
                    <NavLink
                      key={`${currentCategory?.id || "cat"}-${item.title || item.href || idx}`}
                      to={
                        item.href ||
                        "/products"
                      }
                      onClick={onClose}
                    >
                      <div className="w-full rounded-5 overflow-hidden relative">
                        <Image
                          src={item.image}
                          alt={item.title}
                          className="w-full h-150 object-cover flex"
                        />
                      </div>

                      <p className="small-text font-500 text-dark mt-6">
                        {item.title}
                      </p>
                    </NavLink>
                  )
                )}
              </div>
            </div>
          </div>
        </Container>
      </Dropdown>
    );
  }
);

const MobileMenu = React.memo(
  ({
    isMobileOpen,
    pathname,
    onClose,
    onNavigate,
  }) => {
    if (!isMobileOpen) {
      return null;
    }

    return (
      <div className="relative left-0 w-full bg-white h-600 sm-h-full sm-pb-20 overflow-auto z-99 top-0 bordh hidden md-hidden sm-grid-cols-1">
        <div className="px-18">
          <div className="grid-cols-1 w-full">
            {header.navLinks?.map(
              (item) => {
                const isActive =
                  pathname === item.href;

                return (
                  <div
                    key={item.href}
                    className="py-12 bordb"
                  >
                    <NavLink
                      to={item.href}
                      onClick={onClose}
                      className="decoration-none flex items-center justify-between"
                    >
                      <span
                        className="para-text font-500 uppercase"
                        style={{
                          color: isActive
                            ? "var(--primary)"
                            : "var(--dark)",

                          letterSpacing:
                            "0.03em",
                        }}
                      >
                        {item.label}
                      </span>

                      <Icon
                        name="ChevronRight"
                        width="22"
                        height="22"
                        stroke={
                          isActive
                            ? "var(--primary)"
                            : "var(--dark)"
                        }
                      />
                    </NavLink>

                    {item.hasMegaMenu &&
                      header.megaMenu?.[
                      item.megaMenuKey
                      ] && (
                        <div className="pl-12 pt-8 pb-4">
                          {header.megaMenu[
                            item.megaMenuKey
                          ].categories?.map(
                            (cat) => (
                              <NavLink
                                key={cat.id}
                                to={`/products?type=${cat.id}`}
                                onClick={onClose}
                                className="py-6 flex items-center justify-between text-muted small-text decoration-none"
                              >
                                <span>
                                  {cat.name}
                                </span>

                                {cat.badge && (
                                  <span className="mini-text rounded-20 px-6 py-2 font-500 bg-light-success text-success">
                                    {cat.badge}
                                  </span>
                                )}
                              </NavLink>
                            )
                          )}
                        </div>
                      )}
                  </div>
                );
              }
            )}
          </div>

          {isEcom && header.bottomBar?.menu?.length > 0 && (
            <div className="pt-16 pb-8 bordb">
              <p
                className="mini-text text-gray font-600 uppercase mb-8"
                style={{ letterSpacing: "0.05em" }}
              >
                Categories
              </p>
              {header.bottomBar.menu.map((item) => (
                <div key={item.label} className="py-6">
                  <NavLink
                    to={item.href || "/product"}
                    onClick={onClose}
                    className="decoration-none flex items-center justify-between"
                  >
                    <span className="para-text font-500 uppercase text-dark">
                      {item.label}
                    </span>
                    {item.hasMegaMenu ? (
                      <Icon
                        name="ChevronDown"
                        width="18"
                        height="18"
                        stroke="var(--dark)"
                      />
                    ) : (
                      <Icon
                        name="ChevronRight"
                        width="18"
                        height="18"
                        stroke="var(--dark)"
                      />
                    )}
                  </NavLink>
                </div>
              ))}
            </div>
          )}

          <div className="w-full mt-20">
            <Button
              onClick={() => {
                onClose();
                onNavigate("/connect");
              }}
              icon="ArrowRight"
              iconPosition="right"
              iconWidth="18"
              iconHeight="18"
              iconStroke="var(--white)"
              version="v3"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [hoveredNav, setHoveredNav] = React.useState(null);
  const [activeMegaMenu, setActiveMegaMenu] = React.useState(null);
  const [activeCategoryTab, setActiveCategoryTab] = React.useState("spc");

  const megaMenuTimerRef = React.useRef(null);

  const {
    cartItems,
    cartQty,
    subtotal,
    removeFromCart,
    updateQuantity,
    setExactQuantity = updateQuantity,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const isEcom =
    import.meta.env.VITE_ECOM === "true";

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(
        window.scrollY > 20
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  React.useEffect(() => {
    setActiveMegaMenu(null);
    setHoveredNav(null);
    setIsMobileOpen(false);
  }, [location.pathname]);

  React.useEffect(() => {
    return () => {
      if (megaMenuTimerRef.current) {
        clearTimeout(
          megaMenuTimerRef.current
        );
      }
    };
  }, []);


  const handleNavMouseEnter =
    React.useCallback((item) => {
      if (megaMenuTimerRef.current) {
        clearTimeout(
          megaMenuTimerRef.current
        );
      }

      setHoveredNav(item.label || item.href);

      const targetMegaKey =
        item.hasMegaMenu &&
          item.megaMenuKey &&
          header.megaMenu?.[
          item.megaMenuKey
          ]
          ? item.megaMenuKey
          : null;

      setActiveMegaMenu(targetMegaKey);

      if (
        targetMegaKey &&
        header.megaMenu?.[targetMegaKey]?.categories?.[0]?.id
      ) {
        setActiveCategoryTab(
          header.megaMenu[targetMegaKey].categories[0].id
        );
      }
    }, []);

  const handleNavMouseLeave =
    React.useCallback(() => {
      megaMenuTimerRef.current =
        setTimeout(() => {
          setActiveMegaMenu(null);
          setHoveredNav(null);
        }, 180);
    }, []);

  const handleMegaMenuMouseEnter =
    React.useCallback(() => {
      if (megaMenuTimerRef.current) {
        clearTimeout(
          megaMenuTimerRef.current
        );
      }
    }, []);

  const handleMegaMenuMouseLeave =
    React.useCallback(() => {
      megaMenuTimerRef.current =
        setTimeout(() => {
          setActiveMegaMenu(null);
          setHoveredNav(null);
        }, 180);
    }, []);

  const isMegaOpen =
    Boolean(activeMegaMenu);

  const isHeaderWhite =
    isScrolled ||
    isMobileOpen ||
    isMegaOpen;

  const headerBg = isHeaderWhite
    ? "var(--white)"
    : "transparent";

  const headerBorder = isHeaderWhite
    ? "1px solid var(--white)"
    : "1px solid rgba(255, 255, 255, 0.1)";

  const handleCloseMobile =
    React.useCallback(() => {
      setIsMobileOpen(false);
    }, []);

  const handleOpenCart =
    React.useCallback(() => {
      setIsCartOpen(true);
    }, [setIsCartOpen]);

  const handleCloseCart =
    React.useCallback(() => {
      setIsCartOpen(false);
    }, [setIsCartOpen]);

  const handleRemoveFromCart =
    React.useCallback(
      (id) => {
        removeFromCart(id);
      },
      [removeFromCart]
    );

  const handleSetQuantity =
    React.useCallback(
      (id, value) => {
        const setQty = setExactQuantity || updateQuantity;
        if (typeof setQty === "function") {
          setQty(id, value);
        }
      },
      [setExactQuantity, updateQuantity]
    );

  const handleNavigate =
    React.useCallback(
      (path) => {
        navigate(path);
      },
      [navigate]
    );

  const handleCloseMegaMenu =
    React.useCallback(() => {
      setActiveMegaMenu(null);
    }, []);

  return (
    <Container
      as="header"
      version="v0"
      style={{
        position: configData?.Header?.HeaderSticky ? "fixed" : "relative",
        top: 0,
        left: 0,
        zIndex: 1000,
        width: "100%",
        backgroundColor: configData?.Header?.HeaderSticky ? headerBg : "transparent",
        borderBottom: configData?.Header?.HeaderSticky ? headerBorder : "transparent",
        transition:
          "background-color 0.35s ease",
      }}
    >
      <div className="w-full relative">
        <HeaderTopBar />

        <Container>
          <div
            className="flex items-center w-full"
            style={{
              height: "70px"
            }}
          >
            <HeaderLogo
              isHeaderWhite={
                isHeaderWhite
              }
              onCloseMobile={
                handleCloseMobile
              }
            />

            <HeaderNavigation
              pathname={
                location.pathname
              }
              hoveredNav={hoveredNav}
              activeMegaMenu={
                activeMegaMenu
              }
              isHeaderWhite={
                isHeaderWhite
              }
              onNavMouseEnter={
                handleNavMouseEnter
              }
              onNavMouseLeave={
                handleNavMouseLeave
              }
            />

            <HeaderActions
              isHeaderWhite={
                isHeaderWhite
              }
              isMobileOpen={
                isMobileOpen
              }
              setIsMobileOpen={
                setIsMobileOpen
              }
              onNavigate={
                handleNavigate
              }
              cartSection={
                <CartSidebar
                  isEcom={isEcom}
                  cartItems={cartItems}
                  cartQty={cartQty}
                  subtotal={subtotal}
                  isCartOpen={
                    isCartOpen
                  }
                  isHeaderWhite={
                    isHeaderWhite
                  }
                  onOpenCart={
                    handleOpenCart
                  }
                  onCloseCart={
                    handleCloseCart
                  }
                  onRemove={
                    handleRemoveFromCart
                  }
                  onSetQuantity={
                    handleSetQuantity
                  }
                  onNavigate={
                    handleNavigate
                  }
                />
              }
            />
          </div>
        </Container>

        <HeaderBottomBar
          isEcom={isEcom}
          pathname={location.pathname}
          hoveredNav={hoveredNav}
          activeMegaMenu={activeMegaMenu}
          isHeaderWhite={isHeaderWhite}
          onNavMouseEnter={handleNavMouseEnter}
          onNavMouseLeave={handleNavMouseLeave}
        />

        <MegaMenu
          activeMegaMenu={
            activeMegaMenu
          }
          activeCategoryTab={
            activeCategoryTab
          }
          setActiveCategoryTab={
            setActiveCategoryTab
          }
          onClose={
            handleCloseMegaMenu
          }
          onMouseEnter={
            handleMegaMenuMouseEnter
          }
          onMouseLeave={
            handleMegaMenuMouseLeave
          }
        />

        <MobileMenu
          isMobileOpen={
            isMobileOpen
          }
          pathname={
            location.pathname
          }
          onClose={
            handleCloseMobile
          }
          onNavigate={
            handleNavigate
          }
        />
      </div>
    </Container>
  );
};

export default Header;