import React from "react";
import { FormControl, InputAdornment, TextField } from "@mui/material";

import { SvgIconProps } from "@mui/material/SvgIcon";
import { css } from "@emotion/css";

interface Props {
  label: string;
  value: string;
  changeEvent: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  // hidden?: boolean;
  loading?: boolean;
  placeholder?: string;
  fullWidth?: boolean;
  Icon?: React.ElementType<SvgIconProps>;
}

const TextInput: React.FC<Props> = (props) => {
  return (
    <div>
      <FormControl
        variant="outlined"
        className={css`
          background-color: white;
        `}
        fullWidth={props.fullWidth}
      >
        <TextField
          sx={{ marginBottom: 2 }}
          placeholder={props.placeholder}
          id={props.label}
          value={props.value}
          onChange={props.changeEvent}
          label={props.label}
          slotProps={{
            input: {
              endAdornment: props.Icon && (
                <InputAdornment position="end" sx={{ padding: 0 }}>
                  <props.Icon color="primary" />
                </InputAdornment>
              ),
            },
          }}
        />
      </FormControl>
    </div>
  );
};

export default TextInput;
