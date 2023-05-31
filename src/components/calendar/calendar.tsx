import { FC } from 'react';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

type Props = {
  value: Range;
  disabledDates?: Date[];
  onChange: (value: RangeKeyDict) => void;
}

const Calendar: FC<Props> = ({ value, disabledDates, onChange }) => {
  return (
    <DateRange
      date={new Date()}
      minDate={new Date()}
      ranges={[value]}
      rangeColors={['#fd5a5f']}
      direction="vertical"
      showDateDisplay={false}
      disabledDates={disabledDates}
      onChange={onChange}
    />
  );
};

export { Calendar };