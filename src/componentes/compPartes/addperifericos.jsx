import { makeStyles ,InputLabel, List, ListItem, ListItemIcon,ListItemText, Button} from '@material-ui/core';
import React from 'react'
import keyboard from '../../img/icons/keyboard.png'
import mouse from '../../img/icons/mouse.png'
import cargador from '../../img/icons/cargador.png'
import pantalla from '../../img/icons/pantalla.png'

const styles = makeStyles(theme =>({
    div:{
        height:'70%',
        textAlign: 'ligh',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
      },
      img:{
        //height:'10%',
        width: '60px',
        align :'center',
        margin: theme.spacing(2,0,2),
    },
    divp:{
        margin: theme.spacing(2,0,0),
      },
      list:{
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
      }
}))

const Addperifericos = (props) => {

/////
//this.props.activacionvista(true);
/////
////////Comunica mis estados de lo perifericos con su contendor padre 
const petiteclado = () =>{
  props.funT('flex');
}
const petimouse = () =>{
  props.funM('flex');
}
const peticargador = () =>{
  props.funC('flex');
}
const petipantalla = () =>{
  props.funP('flex');
}

    const classes = styles();
    return (
        <div className={classes.divp}>
        <InputLabel >Agregar periferico</InputLabel>
        <div className={classes.div}>
        <List component='nav' className={classes.list}>
            <ListItem button onClick={petiteclado}> 
            <img className={classes.img} src={keyboard} />
            </ListItem>
            <ListItem button onClick={petimouse}> 
            <img className={classes.img} src={mouse}/>
            </ListItem> 
            <ListItem button onClick={peticargador}> 
            <img className={classes.img} src={cargador}/>
            </ListItem> 
            <ListItem button onClick={petipantalla}> 
            <img className={classes.img} src={pantalla}/>
            </ListItem>
        </List>
        </div>
        </div>
     );
}
 
export default Addperifericos;