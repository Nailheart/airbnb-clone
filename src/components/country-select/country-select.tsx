import { FC } from 'react';
import Select from 'react-select';

import { CountrySelectValue } from '@/common/types/types';
import { useCountries } from '@/hooks/hooks';

type Props = {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: FC<Props> = ({ value, onChange }) => {
  const { getAll } = useCountries();

  return ( 
    <Select
      value={value}
      options={getAll()}
      placeholder="Anywhere"
      isClearable
      onChange={(value) => onChange(value as CountrySelectValue)}
      formatOptionLabel={(option) => (
        <div className="flex items-center gap-3">
          <div>{option.flag}</div>
          <div>
            <span>{option.label},&nbsp;</span>
            <span className="text-neutral-500">
              {option.region}
            </span>
          </div>
        </div>
      )}
      classNames={{
        control: () => 'p-3 border-2',
        input: () => 'text-lg',
        option: () => 'text-lg'
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: 'black',
          primary25: '#ffe4e6'
        }
      })}
    />
  );
};

export { CountrySelect };