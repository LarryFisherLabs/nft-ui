import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  ButtonBottom,
  ButtonsPanel,
  LayerButtons,
  SectionButtons,
  ToggledRemove,
} from "../components/LayerButtons.js";
import {
  ViewStyle,
  Title,
  Text,
  Title2CrossHair,
  Title4,
} from "../styles/general.js";
import { getAntPrices, getPartInventories } from "../redux/thunks/antThunks.js";
import {
  selectAntErrMsg,
  selectAntStatus,
  selectDiscountInfo,
  updateCoinInfo,
} from "../redux/slices/antSlice.js";
import { AntCanvas } from "../components/canvas/AntCanvas.js";
import { staticLayerInfo } from "../utils/ant-utils/staticAntInfo.js";

import styled from "styled-components";
import {
  selectCoinErr,
  selectCoins,
  selectCoinStatus,
  selectIsCoinAdmin,
} from "../redux/slices/coinSlice.js";
import { loadCoinsForAntBuilder } from "../redux/thunks/coinThunk.js";
import { selectNetId } from "../redux/slices/connectSlice.js";
import { getViewLevel } from "../utils/deviceType.js";

export const Editor = styled.div`
  display: flex;
  flex-flow: row;
  width: 90%;
  gap: 1rem;
  align-items: normal;
  @media ${getViewLevel(3)} {
    flex-flow: column;
    align-items: center;
    gap: .6rem;
  }
`;

export const CenteredColumn4Mbl = styled.div`
  display: flex;
  flex-flow: column;
  align-items: normal;
  @media ${getViewLevel(3)} {
    align-items: center;
  }
`

export const AntBuilder = () => {
  const dispatch = useDispatch();
  const antStatus = useSelector(selectAntStatus);
  const isAdmin = useSelector(selectIsCoinAdmin);
  const err = useSelector(selectAntErrMsg);
  const coinStatus = useSelector(selectCoinStatus);
  const coins = useSelector(selectCoins);
  const coinErr = useSelector(selectCoinErr);
  const selectedCoinInfo = useSelector(selectDiscountInfo);
  const netId = useSelector(selectNetId);
  const [isCoinPanelOpen, toggleCoinPanel] = useState(true);
  const [isFirstCoin, updateIsFirstCoin] = useState(true);
  const [isFirstAnt, updateIsFirstAnt] = useState(true);

  const coinClick = (isDisabled, coinId, coinColor) => {
    if (!isDisabled && antStatus !== "Buying ant...") {
      if (selectedCoinInfo[1] === coinId) {
        dispatch(updateCoinInfo({ discountIndex: 0, coinId: null }));
        dispatch(getAntPrices({ discountIndex: 0 }));
      } else {
        dispatch(
          updateCoinInfo({ discountIndex: coinColor + 1, coinId: coinId })
        );
        if (selectedCoinInfo[0] !== coinColor + 1) {
          dispatch(getAntPrices({ discountIndex: coinColor + 1 }));
        }
      }
    }
  };

  useEffect(() => {
    if (antStatus === "idle" && isAdmin !== null && isFirstAnt) {
      dispatch(getPartInventories());
      updateIsFirstAnt(false);
    }
  }, [antStatus, isAdmin, dispatch, isFirstAnt]);

  useEffect(() => {
    if (coinStatus === "idle" && isAdmin !== null && isFirstCoin) {
      dispatch(loadCoinsForAntBuilder());
      updateIsFirstCoin(false);
    }
  }, [isAdmin, dispatch, coinStatus, isFirstCoin]);

  return (
    <ViewStyle>
      <Title>Ant Builder</Title>
      {antStatus === "failed" ? (
        <Text>{err}</Text>
      ) : (
        <Editor>
          <AntCanvas />
          <CenteredColumn4Mbl>
            <ButtonsPanel>
              <Title2CrossHair
                onClick={() => toggleCoinPanel(!isCoinPanelOpen)}
              >
                {isCoinPanelOpen ? "Coin Discount ∨" : "Coin Discount ∧"}
              </Title2CrossHair>
              <SectionButtons isOpen={isCoinPanelOpen}>
                {coinStatus === "succeeded" && coins.length > 0 ? (
                  coins.map((coin, index) => {
                    const srcFile =
                      "https://nft-api-bphk.onrender.com/" +
                      netId +
                      "/coins/images/" +
                      coin.id;
                    const isSelected = selectedCoinInfo[1] === coin.id;

                    return (
                      <Button
                        key={index}
                        onClick={() =>
                          coinClick(coin.isDiscountUsed, coin.id, coin.color)
                        }
                        srcFile={srcFile}
                        isSelected={isSelected}
                        isDisabled={coin.isDiscountUsed}
                      >
                        <Title4>
                          {coin.color === 0
                            ? "10% Discount"
                            : coin.color === 1
                            ? "20% Discount"
                            : coin.color === 2
                            ? "30% Discount"
                            : coin.color === 3
                            ? "40% Discount"
                            : "50% Discount"}
                        </Title4>
                        <ButtonBottom>
                          <ToggledRemove isDisabled={isSelected}>
                            <Text>Remove</Text>
                          </ToggledRemove>
                        </ButtonBottom>
                      </Button>
                    );
                  })
                ) : coinStatus === "failed" ? (
                  <Text>{coinErr}</Text>
                ) : (
                  <Text>
                    Buy a coin to get up to a 40% discount on an ant as well as
                    all future collections!
                  </Text>
                )}
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
