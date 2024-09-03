import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Button, ButtonBottom, ButtonsPanel, LayerButtons, SectionButtons, ToggledRemove } from "../../components/LayerButtons.js";
import { ViewStyle, Title, Text, Title2CrossHair, Title4, CenteredText, BlackText } from "../../styles/general.js";
import { getPartInventories } from "../../redux/thunks/antThunks.js";
import { selectAntErrMsg, selectAntStatus, selectDiscountInfo, updateCoinInfo } from "../../redux/slices/antSlice.js";
import { AntCanvas } from "../../components/canvas/AntCanvas.js";
import { staticLayerInfo } from "../../utils/ant-utils/staticAntInfo.js";

import styled from "styled-components";
import { selectCoinErr, selectCoins, selectCoinStatus } from "../../redux/slices/coinSlice.js";
import { loadCoinsForAntBuilder } from "../../redux/thunks/coinThunk.js";
import { selectAccount, selectNetId, selectStatus } from "../../redux/slices/connectSlice.js";
import { getViewLevel } from "../../utils/deviceType.js";
import { ProfilePanel } from "./ToolsPage.js";
import { urls } from "../../utils/json-constants/urls.js";

export const Editor = styled.div`
  display: flex;
  flex-flow: row;
  width: 93%;
  gap: 1rem;
  align-items: normal;
  @media ${getViewLevel(3)} {
    flex-flow: column;
    align-items: center;
    gap: .6rem;
  }
`

export const CenteredColumn4Mbl = styled.div`
  display: flex;
  flex-flow: column;
  align-items: normal;
  @media ${getViewLevel(3)} {
    align-items: center;
  }
`

const BlackTitle = styled(Title4)`
  color: black;
  font-weight: bold;
  font-size: 1.1rem;
  @media ${getViewLevel(2)} {
    font-size: .9rem;
  }
`

export const AntBuilder = ({ versionId = 1 }) => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus)
  const address = useSelector(selectAccount)
  const antStatus = useSelector(selectAntStatus);
  const errorMsg = useSelector(selectAntErrMsg);
  const coinStatus = useSelector(selectCoinStatus);
  const coins = useSelector(selectCoins, shallowEqual);
  const coinErr = useSelector(selectCoinErr);
  const selectedCoinInfo = useSelector(selectDiscountInfo, shallowEqual);
  const netId = useSelector(selectNetId);
  const [isCoinPanelOpen, toggleCoinPanel] = useState(true);
  const [areAllCoinsSpent, setAreCoinsSpent] = useState(null)

  // This code will get you arrays of all part rarities in console log for use in contracts
  //
  // const [isLogged, setIsLogged] = useState(false)
  // useEffect(() => {
  //   if (isLogged === false) {
  //     setIsLogged(true)
  //     for (let i = 0; i < 18; i++) {
  //       let arr = []
  //       for (let j = 0; j < staticLayerInfo[i].elements.length; j++) {
  //         if (staticLayerInfo[i].elements[j].name !== 'empty') arr.push(staticLayerInfo[i].elements[j].rarity)
  //         else arr.push(0)
  //       }
  //       console.log('level ' + i + ' arr: ' + arr)
  //       console.log('level ' + i + ' count: ' + staticLayerInfo[i].elements.length)
  //     }
  //   }
  // }, [isLogged])

  const coinClick = (coinId, coinColor) => {
    if (antStatus !== "Buying ant...") {
      if (selectedCoinInfo[1] === coinId) {
        dispatch(updateCoinInfo({ discountIndex: 0, coinId: null }));
      } else {
        dispatch(
          updateCoinInfo({ discountIndex: coinColor + 1, coinId: coinId })
        );
      }
    }
  };

  useEffect(() => {
    if (antStatus === 'idle' && coinStatus === 'succeeded' && address !== null && netId !== 0 && netId !== 1 && netId !== null) {
      dispatch(getPartInventories())
    }
  }, [antStatus, dispatch, netId, address, coinStatus])

  useEffect(() => {
    if (antStatus === 'idle' && coinStatus === 'idle' && address !== null && netId !== 0 && netId !== 1 && netId !== null) {
      dispatch(loadCoinsForAntBuilder())
    }
  }, [antStatus, coinStatus, dispatch, netId, address])

  return (
    <ViewStyle>
      <Title>Ant Builder</Title>
      {antStatus === "failed" ? (
        <ProfilePanel><CenteredText>{errorMsg}</CenteredText></ProfilePanel>
      ) : (
        <Editor>
          <AntCanvas />
          <CenteredColumn4Mbl>
            <ButtonsPanel>
              <Title2CrossHair
                onClick={() => toggleCoinPanel(!isCoinPanelOpen)}
              >
                Coin Discount
                {isCoinPanelOpen ? <BlackText>∨</BlackText> : <BlackText>∧</BlackText>}
              </Title2CrossHair>
              <SectionButtons isOpen={isCoinPanelOpen}>
                {coinStatus === "succeeded" && coins.length > 0 ? (
                  coins.map((coin, index) => {
                    const srcFile = urls.web2BackEnd + 'coins/' + netId + '/' + versionId + '/images/' + coin.id;
                    const isSelected = selectedCoinInfo[1] === coin.id;


                    //!!!!!!! THIS NEEDS TO CHANGE !!!!!!!!
                    if (coin.isDiscountUsed) {
                      if (index === coins.length - 1 && areAllCoinsSpent === null) setAreCoinsSpent(true)
                      return null
                    }
                    if (areAllCoinsSpent === null) setAreCoinsSpent(false)
                    return (
                      <Button
                        key={index}
                        onClick={() =>
                          coinClick(coin.id, coin.color)
                        }
                        srcFile={srcFile}
                        isSelected={isSelected}
                      >
                        <BlackTitle>
                          {coin.color === 0
                            ? "10% Discount"
                            : coin.color === 1
                            ? "20% Discount"
                            : coin.color === 2
                            ? "30% Discount"
                            : coin.color === 3
                            ? "40% Discount"
                            : "80% Discount"}
                        </BlackTitle>
                        <ButtonBottom>
                          <ToggledRemove isDisabled={isSelected}>
                            <BlackTitle>Remove</BlackTitle>
                          </ToggledRemove>
                        </ButtonBottom>
                      </Button>
                    );
                  })
                ) : coinStatus === "failed" ? (
                  <Text>{coinErr}</Text>
                ) : (coinStatus === 'Loading coins...') || (coinStatus === 'idle' && status !== 'offline' && address !== null) ? <Text>Loading coins...</Text> : (
                  <Text>
                    Buy a coin to get up to a 40% discount on an ant as well as discounts on
                    any future collections! Gold and diamond coins also get extra Trait Points to spend.
                  </Text>
                )}
                {areAllCoinsSpent === true ? <Text>All coin discounts used! Mint another from the coin builder.</Text> : null}
              </SectionButtons>
            </ButtonsPanel>
            {staticLayerInfo.map((_, index) => {
              return <LayerButtons key={index} layerIndex={index} />;
            })}
          </CenteredColumn4Mbl>
        </Editor>
      )}
    </ViewStyle>
  );
};
