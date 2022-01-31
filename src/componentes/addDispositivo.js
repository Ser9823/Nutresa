import React, { createRef, useEffect, useState } from 'react';
import { MenuItem, Paper, Select, InputLabel, TextField, Button, Grid, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Addperifericos from './compPartes/addperifericos';
import { db } from './firebase-config'
import Addteclado from './addTeclado';
import Addmouse from './addMouse';
import Addcargador from './addCargador';
import Addpantalla from './addPantalla';
import Iconmas from '../img/icons/masequipos.png'
import { useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
////Llamado de funcionalidad

const AddDispositivo = (props) => {
  const useStyles = makeStyles((theme) => ({
    txtObs: {
      margin: theme.spacing(2, 0, 2),
    },
    boton: {
      margin: theme.spacing(0, 0, 2, 1)
    },
    divboton: {
      display: 'flex',
      flexDirection: 'row',
    },
    griditem: {
      margin: theme.spacing(0, 1, 0, 1)
    },
    containerT: {
      display: perifericoT,
      margin: theme.spacing(0, 0, 1, 0),
    },
    containerM: {
      display: perifericoM,
      margin: theme.spacing(0, 0, 1, 0)
    },
    containerC: {
      display: perifericoC,
      margin: theme.spacing(0, 0, 1, 0)
    },
    containerP: {
      display: perifericoP,
      margin: theme.spacing(0, 0, 1, 0)
    },
    img: {
      margin: theme.spacing(2, 1, 1, 1),
      height: '50px'
    },
    divmas: {
      display: 'flex'
    },
    numequipos: {
      width: '10%',
      margin: theme.spacing(2, 1, 0, 1)
    },
    seriales: {
      width: '10%',
      margin: theme.spacing(2, 1, 0, 1),

    },
    txtTAG: {
      margin: theme.spacing(1, 1, 1, 3),
      width: '90%'
    },
    typogra: {
      margin: theme.spacing(0, 1, 0, 20),
    },
    datos: {
      margin: theme.spacing(1, 1, 1, 1),
    }
  }));
  //////Variales MIS ESTADOS
  //Selecciones
  ///Parametros de mi URL
  const location = useLocation();
  const query = new URLSearchParams(location.search)
  // Const regPC
  const [serial, setSerial] = useState('');
  const [marca, setMarca] = useState('');
  const [procesador, setProcesador] = useState('');
  const [tiporom, setTiporom] = useState('');
  const [capacidarom, setCapacidarom] = useState('');
  const [tipo, setTipo] = useState('');
  const [sede, setSede] = useState(query.get("regional"));
  const [contrato, setContrato] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [modelo, setModelo] = useState('');
  const [ram, setRam] = useState('');
  const [consecutivo, setConsecutivo] = useState('');
  ///////Tipo de peiferecio seleccionado desde add perifericos
  const [perifericoT, setPerifericoT] = useState('none');
  const [perifericoM, setPerifericoM] = useState('none');
  const [perifericoC, setPerifericoC] = useState('none');
  const [perifericoP, setPerifericoP] = useState('none');
  //Arrays de los select
  const [arrayAlamacen, setArrayalmacen] = useState([]);
  const [arraytequipo, setArrayTequipo] = useState([]);
  const [arraycontrato, setArrayContrato] = useState([]);
  //listas id equipos y consecutivos
  const [listidEquipos, setlistidEquipos] = useState([]);
  const [listConsecutivos, setlistConsecutivos] = useState([]);
  //Constantse de agregar
  const [numEquipos, setNumequipos] = useState(0);
  const [contadorTxt, setContadorTxt] = useState([]);
  ///Constantes id seriales

  const classes = useStyles();

  const mayus = (e) => {
    e.target.value = e.target.value.toUpperCase();
  };

  const regEquipo = () => {
    //console.log(serial,marca,procesador,tiporom,capacidarom,tipo,sede,contrato,observaciones,modelo,ram);
    addPC();
  }

  //objeto de datos
  const equipo = {
    Serial: serial,
    Marca: marca,
    Modelo: modelo,
    Ram: ram,
    Procesador: procesador,
    Tiporom: tiporom,
    Capacidadrom: capacidarom,
    Tipo: tipo,
    Sede: sede,
    Contrato: contrato,
    Observaciones: observaciones,
    NumActa: contrato + '-' + consecutivo,
    estado: 'Bodega',
    OrdenInt: props.valueordenanint(),
    CentralCosto: props.valuecentralcosto()
  };
  ///Control
  const comprovaridequipos = () => {
    var aux = 0;
    listidEquipos.map((obj) => {
      if (obj === '') {
        var descision = window.confirm('Dejo Service TAG en blanco, seguro que desea continuar? estos estacios se omitiran');
        if (descision === true) {
          aux = 0;
        }
        else { aux = 1; }
      }
      else { aux = 0; }
    });
    return aux;
  }
  const addPC = () => {
    if (comprovaridequipos() == 0) {
      try {
        var cont = -1;
        var aux = 0;
        var contaux = 0;
        listidEquipos.map((obj) => {
          cont++;
          if (obj != '') {
            if (listConsecutivos[cont] === '' || listConsecutivos[cont] == null) {
              aux++;
              contaux = cont + 1;
              alert('No se puede registrar ServiceTAg ' + contaux + ' sin Consecutivo, Proceso abortado');
            } else { }
          }
        });
        if (aux === 0) {
          var cont = -1;
          listidEquipos.map((obj) => {
            cont++;
            equipo.Serial = obj;
            equipo.NumActa = contrato + '-' + listConsecutivos[cont];
            db.collection('Equipos').doc().set(equipo);
            setlistidEquipos([]);
            setContadorTxt([]);
          });
          alert('Se registraron los equipos');
        }

      } catch (error) {
        alert('Error en el registro del equipo');
      }
    }
    else {
    }
  }

  const llenadotipoalmacen = async () => {
    db.collection('TipoAlmacenamiento').onSnapshot((objResp) => {
      const areegloResp = [];
      objResp.forEach((obj) => {
        obj = {
          nombre: obj.data().tipo,
          id: obj.data().id,
        }
        areegloResp.push(obj);
        //areegloResp.push(obj.data());
      });
      setArrayalmacen(areegloResp);
      setTiporom(areegloResp[0].nombre)
    });
  }
  const llenadotipoequipo = async () => {
    db.collection('TipoEquipo').onSnapshot((objResp) => {
      const areegloResp = [];
      objResp.forEach((obj) => {
        obj = {
          nombre: obj.data().tipo,
          id: obj.data().id,
        }
        areegloResp.push(obj);
        //areegloResp.push(obj.data());
      });
      setArrayTequipo(areegloResp);
      setTipo(areegloResp[0].nombre)
    });
  }
  const llenadocontrato = async () => {
    db.collection('Contrato').onSnapshot((objResp) => {
      const areegloResp = [];
      objResp.forEach((obj) => {
        obj = {
          nombre: obj.data().contrato,
          id: obj.data().id,
        }
        areegloResp.push(obj);
        //areegloResp.push(obj.data());
      });
      setArrayContrato(areegloResp);
      setContrato(areegloResp[0].nombre)
    });
  }
  const addlistidEquipos = (value, id) => {
    listidEquipos[id] = value;
  }
  const addlistconsecutivos = (value, id) => {
    listConsecutivos[id] = value;
  }

  useEffect(() => {
    llenadotipoalmacen();
    llenadotipoequipo();
    llenadocontrato();
  }, []);
  const cantidadtxt = () => {
    setContadorTxt([])
    const aux = [];
    for (let i = 0; i < numEquipos; i++) {
      aux.push(i);
    }
    setContadorTxt(aux);
  }
  return (
    <div>
      <form>
        <Grid container component={Paper} elevation={5} maxWidth='xl'>
          <Grid item xs={12} className={classes.griditem}>
            <div className={classes.divmas}>
              <h1>Registrar equipo nuevo</h1>
              <Button onClick={() => cantidadtxt()}><img src={Iconmas} className={classes.img} /></Button>
              <TextField
                autoFocus
                type='number'
                margin='normal'
                variant='outlined'
                label='# equipos'
                name='numequipo'
                onChange={(ev) => setNumequipos(ev.target.value)}
                className={classes.numequipos}
              />
            </div>
          </Grid>

          {
            contadorTxt.map((obj) => {
              const aux = obj + 1;
              return <Grid component={Paper} elevation={5} item xs={5} className={classes.datos}>
                <Typography className={classes.typogra} variant="h6" color="inherit">
                  Datos Equipo {aux}
                </Typography>
                <TextField
                  type='text'
                  margin='normal'
                  variant='outlined'
                  label={"ServiceTAG " + aux}
                  className={classes.txtTAG}
                  key={obj}
                  name='serial'
                  onKeyUp={mayus}
                  onBlur={(e) => addlistidEquipos(e.target.value, obj)}
                />
                <TextField
                  className={classes.txtTAG}
                  type='number'
                  color='primary'
                  margin='normal'
                  variant='outlined'
                  key={obj}
                  label='Consecutivo en inventarios'
                  name='consecutivo'
                  onBlur={(e) => addlistconsecutivos(e.target.value, obj)}
                />
              </Grid>

            })
          }
          <Grid item xs={12} className={classes.griditem}>
            <TextField
              fullWidth
              color='primary'
              margin='normal'
              variant='outlined'
              label='Marca'
              name='marca'
              onChange={(ev) => setMarca(ev.target.value)}
            /></Grid>
          <Grid item xs={4} className={classes.griditem}>
            <TextField
              fullWidth
              color='primary'
              margin='normal'
              variant='outlined'
              label='Modelo'
              name='modelo'
              onChange={(ev) => setModelo(ev.target.value)}
            /></Grid>
          <Grid item xs={4} className={classes.griditem}>
            <TextField
              fullWidth
              color='primary'
              margin='normal'
              variant='outlined'
              label='Procesador'
              name='procesador'
              onChange={(ev) => setProcesador(ev.target.value)}
            /></Grid>
          <Grid item xs={3} className={classes.griditem}>
            <InputLabel id="demo-simple-select-filled-label" >Tipo almacenamiento</InputLabel>
            <Select
              //Tipo Almacenamiento
              fullWidth
              displayEmpty
              variant='outlined'
              value={tiporom}
              onClick={(ev) => setTiporom(ev.target.value)}
            >
              {
                arrayAlamacen.map((obj) => {
                  //console.log(obj.nombre);
                  if (obj.nombre != 'undefined') {
                    return <MenuItem key={obj.id} value={obj.nombre}>{obj.nombre}</MenuItem>
                  }
                })
              }
            </Select>
          </Grid>
          <Grid item xs={6} className={classes.griditem}>
            <TextField
              fullWidth
              type='number'
              color='primary'
              margin='normal'
              variant='outlined'
              label='Capacidad almacenamiento (GB)'
              name='capacidad'
              onChange={(ev) => setCapacidarom(ev.target.value)}
            /></Grid>
          <Grid item xs={5} className={classes.griditem}>
            <TextField
              fullWidth
              type='number'
              color='primary'
              margin='normal'
              variant='outlined'
              label='RAM (GB)'
              name='ram'
              onChange={(ev) => setRam(ev.target.value)}
            /></Grid>
            {
              numEquipos<2?
          <Grid item xs={12} className={classes.griditem}>
            <Addperifericos
              funT={(tipoperi) => {
                setPerifericoT(tipoperi);
                if (perifericoT == 'none') setPerifericoT('flex')
                else setPerifericoT('none')
              }}
              funM={(tipoperi) => {
                setPerifericoM(tipoperi);
                if (perifericoM == 'none') setPerifericoM('flex')
                else setPerifericoM('none')
              }}
              funC={(tipoperi) => {
                setPerifericoC(tipoperi);
                if (perifericoC == 'none') setPerifericoC('flex')
                else setPerifericoC('none')
              }}
              funP={(tipoperi) => {
                setPerifericoP(tipoperi);
                if (perifericoP == 'none') setPerifericoP('flex')
                else setPerifericoP('none')
              }}
            ></Addperifericos>
          </Grid>
          :<h1></h1>}
          {
              numEquipos<2?
          <div className={classes.containerT}>
            <Grid item xs={5}>
              <Addteclado serial={() => { return listidEquipos[0] }}></Addteclado>
            </Grid>
          </div>
          :<h1></h1>}
          {
              numEquipos<2?
          <div className={classes.containerM}>
            <Grid item xs={5} alignContent='left'>
              <Addmouse serial={() => { return listidEquipos[0] }}></Addmouse>
            </Grid>
          </div>
          :<h1></h1>}
          {
              numEquipos<2?
          <div className={classes.containerC}>
            <Grid item xs={5}>
              <Addcargador serial={() => { return listidEquipos[0] }}></Addcargador>
            </Grid>
          </div>
          :<h1></h1>}
          {
              numEquipos<2?
          <div className={classes.containerP}>
            <Grid item xs={5}>
              <Addpantalla serial={() => { return listidEquipos[0] }}></Addpantalla>
            </Grid>
          </div>
          :<h1></h1>}
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={5} className={classes.griditem}>
            <InputLabel id="demo-simple-select-filled-label" >Tipo equipo</InputLabel>
            <Select
              //Tipo Almacenamiento
              fullWidth
              displayEmpty
              variant='outlined'
              value={tipo}
              onChange={(ev) => setTipo(ev.target.value)}
            >
              {
                arraytequipo.map((obj) => {
                  //console.log(obj.nombre);
                  if (obj.nombre != 'undefined') {
                    return <MenuItem key={obj.id} value={obj.nombre}>{obj.nombre}</MenuItem>
                  }
                })
              }
            </Select>
          </Grid>
          <Grid item xs={6} className={classes.griditem}>
            <InputLabel id="demo-simple-select-filled-label" >Sede</InputLabel>
            <TextField
              fullWidth
              type='number'
              color='primary'
              //margin='normal'
              variant='outlined'
              label={sede}
              name='capacidad'
              value={sede}
              onChange={(ev) => setSede(ev.target.value)}
              disabled
            />
          </Grid>
          <Grid item xs={5} className={classes.griditem}>
            <InputLabel id="demo-simple-select-filled-label" >Contrato</InputLabel>
            <Select
              fullWidth
              displayEmpty
              variant='outlined'
              value={contrato}
              onChange={(ev) => setContrato(ev.target.value)}
            >
              {
                arraycontrato.map((obj) => {
                  //console.log(obj.nombre);
                  if (obj.nombre != 'undefined') {
                    return <MenuItem key={obj.id} value={obj.nombre}>{obj.nombre}</MenuItem>
                  }
                })
              }
            </Select>
          </Grid>
          <Grid item xs={6} className={classes.griditem}>
            <TextField className={classes.txtObs}
              id="outlined-multiline-static"
              label="Observaciones"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              onChange={(ev) => setObservaciones(ev.target.value)}
            /></Grid>
          <Grid item xs={12} className={classes.griditem}>
            <div className={classes.divboton}>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                className={classes.boton}
                onClick={regEquipo}
              >Registrar</Button>
              <Button
                type='reset'
                fullWidth
                variant='contained'
                className={classes.boton}
              >Lipiar</Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );

}
export default AddDispositivo;