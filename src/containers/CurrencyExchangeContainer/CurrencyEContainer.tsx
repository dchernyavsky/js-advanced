import React from 'react';
import CurrencyExchange from '../../components/CurrencyExchange/CurrencyExchange';
import {CurrencyState, CurrencyType} from '../../redux/currencyReducer';

import {
  ChangeActionAC,
  ChangeCurrencyFieldAC,
  ChangeCurrentCurrencyAC,
  useDispatch,
} from '../../redux/actions';
import {useSelector} from 'react-redux';
import {
  selectAll,
  selectAmountOfBYN, selectAmountOfCurrency,
  selectCurrencies,
  selectCurrentCurrency,
  selectIsBuying
} from "./CurrencyEContainerSelectors";
import {IGlobalState} from "../../redux/state";

//const CurrencyEContainer: React.FC<TProps> = props => {
const CurrencyEContainer: React.FC = () => {

  // const {
  //   currencies,
  //   currentCurrency,
  //   isBuying,
  //   amountOfBYN,
  //   amountOfCurrency,
  //   setCurrencyAmount,
  //   setAction,
  //   changeCurrency,
  // } = props;

  // const {
  //   currencies,
  //   currentCurrency,
  //   isBuying,
  //   amountOfBYN,
  //   amountOfCurrency,
  // } = useSelector<IGlobalState, CurrencyState>(state=>state.currency);

  const currencies = useSelector(selectCurrencies);
  const currentCurrency = useSelector(selectCurrentCurrency);
  const isBuying = useSelector(selectIsBuying);
  const amountOfBYN = useSelector(selectAmountOfBYN);
  const amountOfCurrency = useSelector(selectAmountOfCurrency);

  const dispatch = useDispatch()

  let currencyRate: number = 0;
  const currenciesName = currencies.map((currency: CurrencyType) => {
    if (currency.currencyName === currentCurrency) {
      currencyRate = isBuying ? currency.buyRate : currency.sellRate;
    }
    return currency.currencyName;
  });

  const changeCurrencyField = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    if (!isFinite(+value)) return;
    if (e.currentTarget.dataset.currency) {
      const trigger: string = e.currentTarget.dataset.currency;
      if (trigger === 'byn') {
        if (value === '') {
          // setCurrencyAmount(value, value);
          dispatch(ChangeCurrencyFieldAC(value, value));
        } else {
          dispatch(ChangeCurrencyFieldAC(value, (+Number(value).toFixed(2) / currencyRate).toFixed(2)));
        }
      } else {
        if (value === '') {
          // setCurrencyAmount(value, value);
          dispatch(ChangeCurrencyFieldAC(value, value));
        } else {
          // setCurrencyAmount((+Number(value).toFixed(2) * currencyRate).toFixed(2), value);
          dispatch(ChangeCurrencyFieldAC((+Number(value).toFixed(2) * currencyRate).toFixed(2), value));
        }
      }
    }
  };
  const changeAction = (e: React.MouseEvent<HTMLSpanElement>) => {
    // e.currentTarget.dataset.action === 'buy' ? setAction(true) : setAction(false);
    e.currentTarget.dataset.action === 'buy' ? dispatch(ChangeActionAC(true)) : dispatch(ChangeActionAC(false));
  };

  const changeCurrentCurrency = (e: React.MouseEvent<HTMLLIElement>) => {
    // e.currentTarget.dataset.currency && changeCurrency(e.currentTarget.dataset.currency);
    e.currentTarget.dataset.currency && dispatch(ChangeCurrentCurrencyAC(e.currentTarget.dataset.currency));
  };

  return (
    <React.Fragment>
      <CurrencyExchange
        currenciesName={currenciesName}
        currentCurrency={currentCurrency}
        currencyRate={currencyRate}
        isBuying={isBuying}
        amountOfBYN={amountOfBYN}
        amountOfCurrency={amountOfCurrency}
        changeCurrencyField={changeCurrencyField}
        changeAction={changeAction}
        changeCurrentCurrency={changeCurrentCurrency}
      />
    </React.Fragment>
  );
};

// const mapStateToProps = ({currency}: { currency: CurrencyState }): CurrencyState => {
//   return {
//     currencies: currency.currencies,
//     currentCurrency: currency.currentCurrency,
//     isBuying: currency.isBuying,
//     amountOfBYN: currency.amountOfBYN,
//     amountOfCurrency: currency.amountOfCurrency,
//   };
// };
//
// const mapDispatchToProps = (dispatch: Dispatch<CurrencyReducersTypes>) => {
//   return {
//     setCurrencyAmount(amountOfBYN: string, amountOfCurrency: string) {
//       dispatch(ChangeCurrencyFieldAC(amountOfBYN, amountOfCurrency));
//     },
//     setAction(isBuying: boolean) {
//       dispatch(ChangeActionAC(isBuying));
//     },
//     changeCurrency(currency: string) {
//       dispatch(ChangeCurrentCurrencyAC(currency));
//     },
//   };
// };
//
// const connector = connect(mapStateToProps, mapDispatchToProps);
//
// type TProps = ConnectedProps<typeof connector>;
//
// export default connector(CurrencyEContainer);
export default CurrencyEContainer;

