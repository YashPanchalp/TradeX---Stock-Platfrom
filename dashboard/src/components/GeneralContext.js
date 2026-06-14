import React, { useState, useMemo, useCallback } from "react";

import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid, price, actionType) => {},
  closeBuyWindow: () => {},
  updateCurrentPrice: (uid, price) => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [actionType, setActionType] = useState("BUY");

  const handleOpenBuyWindow = useCallback((uid, price = 0, nextActionType = "BUY") => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
    setCurrentPrice(price);
    setActionType(nextActionType);
  }, []);

  const handleCloseBuyWindow = useCallback(() => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
    setActionType("BUY");
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
  }), [handleOpenBuyWindow, handleCloseBuyWindow, updateCurrentPrice]);

  return (
    <GeneralContext.Provider value={contextValue}>
      {props.children}
      {isBuyWindowOpen && (
        <BuyActionWindow
          uid={selectedStockUID}
          currentPrice={currentPrice}
          actionType={actionType}
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
