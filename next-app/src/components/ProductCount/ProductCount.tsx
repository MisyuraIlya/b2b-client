"use client"
import { FC, Fragment } from 'react';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { Button, ButtonGroup } from '@mui/material';
import NumericInput from '@/components/NumericInput';
import { numberFormat } from '@/utils/numberFormat';
import { ProductCountProps } from './types';
import { styles } from './ProductCount.styles';


const ProductCount: FC<ProductCountProps> = ({ step, max, count, setCount, disabled }) => {
  const changeValue = (value: string | number) => setCount(`${value}`);
  const incrementValue = () =>
    setCount(numberFormat.format(Number(count) + step > max ? max : Number(count) + step))
  const decrementValue = () =>
    setCount(numberFormat.format(Number(count) - step < step ? step : Number(count) - step))
  return (
    <Fragment>
      <ButtonGroup
        disableElevation
        variant="contained"
        aria-label="Buttons to increase and decrease amount of items"
      >
        <Button disabled={disabled} variant="text" onClick={decrementValue} sx={styles.minusBtn}>
          <RemoveIcon />
        </Button>

        <NumericInput
          min={step}
          max={max}
          value={count}
          onChange={changeValue}
          disabled={disabled}
        />

        <Button disabled={disabled} variant="text" onClick={incrementValue} sx={styles.plusBtn}>
          <AddIcon />
        </Button>
      </ButtonGroup>
    </Fragment>
  )
}

export default ProductCount
