
import '../assets/css/App.scss';
import '../assets/css/react-confirm-alert.scss';
import { CSVLink, CSVDownload } from "react-csv";
import React, { useState, useEffect} from 'react';
import { useHistory, RouteComponentProps, useLocation, Link } from 'react-router-dom';
import MyImage from './zaiter.png';
import MyImage1 from './login.jpg';
import { confirmAlert } from 'react-confirm-alert'; // Import
import moment from "moment";
function List() {
    const [checker, setchecker] = useState(false)
    const [name, setname] = useState("");
    const [csvData, setcsvdata] = useState([]);
    const [fname, setfname] = useState("");
    const [result, setresult] = useState("");
    const [cin, setcin] = useState("");
    const [bdate, setbdate] = useState("");
    const [sym, setsym] = useState("");
    const [loc, setloc] = useState("");
    const [del, setdel] = useState("");
    const [tel, settel] = useState("");
    const [sex, setsex] = useState("");
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (checker == false) {
            var text = window.ipcRenderer.sendSync('read');
            if (text != null) {

                var t = format(text)
                console.log(t)
                setcsvdata(t)
            }

            setchecker(true)
        }
    });
    function handlechange_result(event) {
        setresult(event.target.value)
    }
    function handlechange_name(event) {
        setname(event.target.value)
    }
    function handlechange_loc(event) {
        setloc(event.target.value)
    }
    function handlechange_del(event) {
        setdel(event.target.value)
    }
    function handlechange_tel(event) {
        settel(event.target.value)
    }
    function handlechange_fname(event) {
        setfname(event.target.value)
    }
    function handlechange_bdate(event) {
        setbdate(event.target.value)
    }
    function handlechange_cin(event) {
        setcin(event.target.value)
    }
    function handlechange_sym(event) {
        setsym(event.target.value)
    }
    function handlechange_sex(event) {
        setsex(event.target.value)
    }
    function csv() {
        var text = window.ipcRenderer.send('read');
        console.log(text);
    }
    function format(x) {
        var tmp = []
        console.log(x[0])
        for (const i in x) {
            console.log(i)
            var t = {
                "ID": x[i].id,
                "NOM": x[i].name,
                "PRENOM": x[i].fname,  
                "SEXE": x[i].sex,   
                "CIN": x[i].cin,
                "DATE DE NAISSANCE": x[i].bdate,
                "TELEPHONE": x[i].tel,
                "LOCALITE": x[i].loc,
                "DELEGATION":x[i].del, 
                "SYMPTOMATIQUE": x[i].sym,
                "RESULTAT": x[i].result,  
               
            }
            tmp.push(t);
        }
        return tmp;
    }
   
  function submit() {
            confirmAlert({
              title: 'La base de donnée va s"effacer',
              message: 'Are you sure to do this.',
              buttons: [
                {
                  label: 'Yes',
                  onClick: () => {
                  var t=window.ipcRenderer.sendSync('clear');}
                },
                {
                  label: 'No',
                  onClick: () => alert('Click No')
                }
              ]
            });
          }; 

     
  function submit2() {
    confirmAlert({
      title: 'Check the CIN',
      message: 'The CIN must have 8 numbers ',
      buttons: [
        {
          label: 'OK',
          onClick: () => {
          console.log("the CIN must have 8 numbers")
        }}
      ]
    });
  }; 

    function onChangeValue(event) {
        setresult(event.target.value);
    }

    return (
        <div >
            <div class="alert alert-info" role="alert">
                <Link onClick={() => {
                    submit()
                }}>Effacer base de donnée</Link>
            </div>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-6 login-section-wrapper">
                        <div class="brand-wrapper">
                            <img src={MyImage} alt="ZAITER" class="logo" />
                        </div>
                        <div class="login-wrapper my-auto">
                            <h1 class="login-title">FICHE PATIENT</h1>
                            <form action="#!">
                                <div class="form-group">
                                    <label >NOM</label>
                                    <input type="text" class="form-control" onChange={handlechange_name} placeholder="NOM" />
                                </div>
                                <div class="form-group">
                                    <label >PRENOM</label>
                                    <input type="text" class="form-control" onChange={handlechange_fname} placeholder="PRENOM" />
                                </div>     
                                <div class="form-group">
                                    <label >SEXE</label>
                                    <input type="text" class="form-control" onChange={handlechange_sex} placeholder="M/F" />
                                </div>                             
                                <div class="form-group">
                                    <label >CIN</label>
                                    <input type="text" class="form-control" onChange={handlechange_cin} placeholder=" CIN" />
                                </div>
                                <div class="form-group">
                                    <label >DATE DE NAISSANCE</label>
                                    <input type="text" class="form-control" onChange={handlechange_bdate} placeholder="DDN" />
                                </div>
                                <div class="form-group">
                                    <label >TELEPHONE</label>
                                    <input type="text" class="form-control" onChange={handlechange_tel} placeholder="TELEPHONE" />
                                </div>
                            
                                <div class="form-group">
                                    <label >LOCALITE</label>
                                    <input type="text" class="form-control" onChange={handlechange_loc} placeholder="LOCALITE" />
                                </div>
                                <div class="form-group">
                                    <label >DELEGATION</label>
                                    <input type="text" class="form-control" onChange={handlechange_del} placeholder="DELEGATION" />
                                </div>
                                <div class="form-group">
                                    <label >SYMPTOMATIQUE</label>
                                    <input type="text" class="form-control" onChange={handlechange_sym} placeholder="SYMPTOMATIQUE" />
                                </div>
                                <div class="form-group mb-4">
                                    <label>RESULTAT DU TEST</label>
                                    <input id="result"  class="form-control"  onChange={handlechange_result} placeholder={result} disabled = {true} />
                                </div>
                                <div class="form-group mb-4" onChange={onChangeValue}>
                                    <input type="radio" value="positif" name="test" /> POSITIF<br />
                                    <input type="radio" value="negatif" name="test" /> NEGATIF<br />
                                    <input type="radio" value="Non-interpretable" name="test" /> NON-INTERPRETABLE
                                </div>
                                <input name="login" id="login" class="btn btn-block login-btn" type="button" onClick={() => {
                                    if (cin.length == 8) {
                                        var text = {
                                            name: name,
                                            fname: fname,
                                            result: result,
                                            cin: cin,
                                            bdate: bdate,
                                            sym: sym,
                                            loc: loc,
                                            del: del,
                                            tel: tel,
                                            sex: sex
                                                                           }
                                      
                                        window.ipcRenderer.sendSync('create', text)
                                        var text = window.ipcRenderer.sendSync('read');
                                        console.log(text)
                                        var t = format(text);
                                        console.log(t)
                                        setcsvdata(t);
                                      
                                        history.push({ pathname: '/generate', state: { data: location.state.data, name: name, fname: fname, result: result, cin: cin, bdate: bdate } });
                                    } else {
                                    submit2()
                                    }
                                   
                                }
                                } value="Enregistrer" />
                            </form>

                            <CSVLink filename={`${moment().format("DD-MM-YYYY hh:mm:ss")}.csv`} data={csvData} separator={";"}>Export to Excel</CSVLink>

                            <br />
                        </div>
                    </div>
                    <div class="col-sm-6 px-0 d-none d-sm-block">
                        <img src={MyImage1} alt="login image" class="login-img1" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default List;
