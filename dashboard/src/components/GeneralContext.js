import React, { useState, useMemo, useCallback } from "react";

import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid, price, actionType, defaultQty, isDown, percent) => {},
  closeBuyWindow: () => {},
  updateCurrentPrice: (uid, price) => {},
  refreshTrigger: 0,
  triggerRefresh: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [actionType, setActionType] = useState("BUY");
  const [defaultQty, setDefaultQty] = useState(1);
  const [isDown, setIsDown] = useState(false);
  const [percent, setPercent] = useState("0.00%");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const handleOpenBuyWindow = useCallback((uid, price = 0, nextActionType = "BUY", initialQty = 1, isDown = false, percent = "0.00%") => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
    setCurrentPrice(price);
    setActionType(nextActionType);
    setDefaultQty(initialQty);
    setIsDown(isDown);
    setPercent(percent);
  }, []);

  const handleCloseBuyWindow = useCallback(() => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
    setActionType("BUY");
    setDefaultQty(1);
    setIsDown(false);
    setPercent("0.00%");
  }, []);

  const updateCurrentPrice = useCallback((uid, price) => {
    if (selectedStockUID === uid) {
      setCurrentPrice(price);
    }
  }, [selectedStockUID]);

  const contextValue = useMemo(() => ({
    openBuyWindow: handleOpenBuyWindow,
    closeBuyWindow: handleCloseBuyWindow,
    updateCurrentPrice,
    refreshTrigger,
    triggerRefresh,
  }), [handleOpenBuyWindow, handleCloseBuyWindow, updateCurrentPrice, refreshTrigger, triggerRefresh]);

  return (
    <GeneralContext.Provider value={contextValue}>
      {props.children}
      {isBuyWindowOpen && (
        <BuyActionWindow
          uid={selectedStockUID}
          currentPrice={currentPrice}
          actionType={actionType}
          initialQty={defaultQty}
          isDown={isDown}
          percent={percent}
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
