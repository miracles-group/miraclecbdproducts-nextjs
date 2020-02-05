import React from "react";
import "../styles/wapper.scss";
import { Button } from "@material-ui/core";
import { Menu, LocalMall, Settings, Dashboard, Sync } from "@material-ui/icons";
import CircularProgress from "@material-ui/core/CircularProgress";
import Router from "next/router";

function openSidebar() {
  document.getElementById("sideMenu").style.display = "block";
}
function closeSidebar() {
  document.getElementById("sideMenu").style.display = "none";
}

function getProfile() {
  const params = localStorage.getItem("shopUrl");
  Router.push({
    pathname: "/setting",
    query: { shopUrl: params }
  });
}

const Layout = props => {
  return (
    <div>
      <div className="header">
        <div className="headerContent">
          <Button className="btnColor" onClick={openSidebar}>
            <Menu />
          </Button>
        </div>
        {props.btnSync && (
          <Button className="btnSync" onClick={props.autoSync}>
            {props.loading ? (
              <CircularProgress size={24} className="circularColor" />
            ) : (
              <Sync className="icon" />
            )}
          </Button>
        )}
      </div>
      <div className="sidebar">
        <div className="itemMenu">
          <div className="sidebarTitle">
            <img
              className="logo"
              src="https://miraclecbdproducts.com/images/cbd-logo.png"
              width="120"
              alt="logo"
            />
          </div>
          <div className="item" onClick={() => Router.push("/dashboard")}>
            <div className="itemIcon">
              <Dashboard />
            </div>
            <div className="itemText">Dashboard</div>
          </div>
          <div className="item" onClick={() => Router.push("/")}>
            <div className="itemIcon">
              <LocalMall />
            </div>
            <div className="itemText">Product</div>
          </div>
          <div className="item" onClick={getProfile}>
            <div className="itemIcon">
              <Settings />
            </div>
            <div className="itemText">Settings</div>
          </div>
        </div>
      </div>
      <div className="main">{props.children}</div>
      <div id="sideMenu" className="modalMenu" style={{ display: "none" }}>
        <div className="modalMenuContent" onClick={closeSidebar}>
          <div className="modalSidebar">
            <div className="itemMenu">
              <div className="sidebarTitle">
                <img
                  className="logo"
                  src="https://miraclecbdproducts.com/images/cbd-logo.png"
                  width="120"
                  alt="logo"
                />
              </div>
              <div className="item" onClick={() => Router.push("/dashboard")}>
                <div className="itemIcon">
                  <Dashboard />
                </div>
                <div className="itemText">Dashboard</div>
              </div>
              <div className="item" onClick={() => Router.push("/")}>
                <div className="itemIcon">
                  <LocalMall />
                </div>
                <div className="itemText">Product</div>
              </div>
              <div className="item" onClick={getProfile}>
                <div className="itemIcon">
                  <Settings />
                </div>
                <div className="itemText">Setting</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
      :global(body) {
        margin: 0;
        font-size: 1rem;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        font-weight: 400;
        line-height: 1.5;
        letter-spacing: 0.00938em;
        color: rgba(0, 0, 0, 0.87);
    `}</style>
    </div>
  );
};

export default Layout;
