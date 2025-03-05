import {  Box, InputLabel, MenuItem, FormControl, Select, SelectChangeEvent } from '@mui/material';
import { VisitType, HealthCheckRating, Diagnosis } from "../../types";

interface SelectRatingProps {
    label: string;
    items: HealthCheckRating[];
    value: HealthCheckRating;
    changeValue: React.Dispatch<React.SetStateAction<HealthCheckRating>>;
}

interface SelectTypeProps {
    label: string;
    items: VisitType[];
    value: VisitType;
    changeValue: React.Dispatch<React.SetStateAction<VisitType>>;
}

interface SelectCodeProps {
    label: string;
    items: Array<Diagnosis['code']>;
    value: Array<Diagnosis['code']>;
    changeValue: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SelectRating = ({ label, items, value, changeValue }: SelectRatingProps) => {

    const handleChange = (event: SelectChangeEvent) => {
      changeValue(event.target.value as unknown as HealthCheckRating);
    };

    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="simple-select-label">{label}</InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            value={value.toString()}
            label={label}
            onChange={handleChange}
          > {items.map((item: HealthCheckRating) => (
            <MenuItem key={item} value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
};

export const SelectType = ({ label, items, value, changeValue }: SelectTypeProps) => {

    const handleChange = (event: SelectChangeEvent) => {
      changeValue(event.target.value as unknown as VisitType);
    };

    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="simple-select-label">{label}</InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            value={value.toString()}
            label={label}
            onChange={handleChange}
          > {items.map((item: VisitType) => (
            <MenuItem key={item} value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
};

export const SelectCode = ({ label, items, value, changeValue }: SelectCodeProps) => {

    const handleChange = (event: SelectChangeEvent<typeof value>) => {
        const { target: { value }, } = event;
        changeValue(
          typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="multiple-label">{label}</InputLabel>
          <Select
            labelId="multiple-label"
            id="multiple-select"
            multiple
            value={value}
            label={label}
            onChange={handleChange}
          > {items.map((item: string) => (
                <MenuItem 
                    key={item} 
                    value={item}
                >
                    {item}
                </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
};
