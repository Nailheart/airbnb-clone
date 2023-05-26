import { FC } from 'react';
import { Range } from 'react-date-range';
import { Button } from '../../button/button';
import { Calendar } from '../../calendar/calendar';

type Props = {
  price: number;
  dateRange: Range;
  totalPrice: number;
  disabledDates: Date[];
  disabled?: boolean;
  onSubmit: () => void;
  onChangeDate: (value: Range) => void;
}

const ListingReservation: FC<Props> = ({
  price,
  dateRange,
  totalPrice,
  disabledDates,
  disabled,
  onSubmit,
  onChangeDate,
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200">
      <div className="p-4">
        <span className="text-2xl font-semibold">$ {price}&nbsp;</span>
        <span className="font-light text-neutral-600">night</span>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button 
          label="Reserve"
          disabled={disabled}
          onClick={onSubmit}
        />
      </div>
      <hr />
      <div className="flex justify-between gap-4 text-lg font-semibold p-4">
        <span>Total</span>
        <span>$ {totalPrice}</span>
      </div>
    </div>
  );
};

export { ListingReservation };