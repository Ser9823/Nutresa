import { TextField } from "@material-ui/core";
import React from "react";

const cajatxt = (props) => {
    return ( 
        <div>
            <TextField 
              fullWidth
              autoFocus
              type={props.type}
              color ={props.color}
              margin ='normal'
              variant={props.variant}
              label ={props.label}
              name={props.name}
              placeholder = {props.placeholder}
            />
        </div>
     );
}
 
export default cajatxt;