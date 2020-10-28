import React, {useEffect, useState} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
// import {getHistoricalData} from '../../../redux/actions';
import { teal } from '@material-ui/core/colors';
import { Box } from '@material-ui/core';
import GridContainer from '../../../@crema/core/GridContainer';
import Grid from '@material-ui/core/Grid';
import LinePlot from '../../../shared/components/LinePlot';
import {Reading} from '../../../types/models/Power';
// import {AppState} from '../../../redux/store';
import { DateTimePicker } from "@material-ui/pickers";
import moment from 'moment';
import ValueCard from 'shared/components/ValueCard';
import { averageNumber } from 'utils';

const initialRange = moment.duration("00:01:00");
const initialFrom = moment();
initialFrom.subtract(initialRange);

function Historical() {
  const [from, handleFromChange] = useState(initialFrom);
  const [to, handleToChange] = useState(moment());

  const dispatch = useDispatch();

  useEffect(() => {
    const unix = (date: moment.Moment) => Math.floor(date.valueOf() / 1000);
    console.log(unix(from), unix(to));
    console.log(1602129460, 1602129469)
    // dispatch(getHistoricalData(unix(from), unix(to)));
    // dispatch(getHistoricalData(1602129460, 1602129469));
  }, [dispatch, from, to]);

  // const { historicalData } = useSelector<AppState, AppState['dashboard']>(
  //   ({dashboard}) => dashboard,
  // );

  let historicalData;
  if (!historicalData) return (
    <>
      <Box pt={{ xl: 4 }}>
          <DateTimePicker
            label="From"
            inputVariant="outlined"
            value={from}
            onChange={date => date && handleFromChange(date)}
          />
          <DateTimePicker
            label="To"
            inputVariant="outlined"
            value={to}
            onChange={date => date && handleToChange(date)}
          />
      </Box>
    </>
  )

  const { voltAmpData, powerData, raw } = historicalData;

  // @ts-ignore
  const avgSolarV = averageNumber(raw.map((reading: Reading) => {
    return reading.solar_voltage
  }));

  return (
    <>
      <Box pt={{ xl: 4 }}>
          <DateTimePicker
            label="From"
            inputVariant="outlined"
            value={from}
            onChange={date => date && handleFromChange(date)}
          />
          <DateTimePicker
            label="To"
            inputVariant="outlined"
            value={to}
            onChange={date => date && handleToChange(date)}
          />
          <h1>Averages over the period</h1>
          <GridContainer>
            <Grid item xs={12} md={3}>
              <ValueCard value={avgSolarV} title="Solar Voltage" color={teal[500]} />
            </Grid>
          </GridContainer>
          <GridContainer>
            <Grid item xs={12}>
              <LinePlot title="Voltage and Amperage" data={voltAmpData} primaryKey="solar_voltage" secondaryKey="battery_voltage" tertiaryKey="load_amperage" primaryColor="#8884d8" secondaryColor="#82ca9d" tertiaryColor="#0698ec" />
            </Grid>
            <Grid item xs={12}>
              <LinePlot title="Average Power" data={powerData} primaryKey="avg_battery_power" secondaryKey="avg_load_power" primaryColor="#f44d50" secondaryColor="#0698ec" /> 
            </Grid>
          </GridContainer>
      </Box>
    </>
  );
}

export default Historical;