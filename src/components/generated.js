
import '../assets/css/App.scss';
import '../assets/css/generated.scss';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import React, { useRef, useState, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom'; import { confirmAlert } from 'react-confirm-alert';
import moment from "moment";
import logo from './header.png';
import logoprime from './foot.png';
import MyImage from './zaiter.png';
import MyImage1 from './login.jpg';
var QRCode = require('qrcode.react');
function Gen() {
  const history = useHistory();
  const location = useLocation();
  const pdfExportComponent = useRef(null);
  const contentArea = useRef(null);
  const [size, setsize] = useState(2);
  const [checker, setchecker] = useState(true)

  useEffect(() => {
    if (checker == false) {
      handleExportWithComponent();

      setchecker(true)
    }
  });



  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  }

  const text = {
    time: moment().format("DD-MM-YYYY hh:mm:ss"),
    last_name: location.state.name,
    first_name: location.state.fname,
    cin: location.state.cin,
    birth_date: location.state.bdate,
    Doctor: location.state.data.name,
    test_antigénique_sars_cov_2_result: location.state.result
  }
  const submit = (event) => {
    confirmAlert({
      title: "Print",
      message: "Choisir le format PDF",
      buttons: [
        {
          label: 'A4',
          onClick: () => { setsize(1); console.log(size); if (size !== 1) { setsize(1) }; setchecker(false) },
        },
        {
          label: 'A5',
          onClick: () => { setsize(2); console.log(size); if (size !== 2) { setsize(2) }; setchecker(false) },
        }

      ]
    });
  };

  const handleExportWithFunction = (event, size) => {
    console.log(text);
    savePDF(contentArea.current, { paperSize: size, fileName: `${location.state.name.toUpperCase() + " " + location.state.fname.toUpperCase()}.pdf` });
  }

  function navigate() {
    console.log(location.state.data)
    history.push({ pathname: '/add', state: { data: location.state.data } });
  }
  return (
    <div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6 login-section-wrapper">
            <div class="brand-wrapper">
              <img src={MyImage} alt="ZAITER" class="logo" />
            </div>

            <div class="card">
              <button type="button" class="btn btn-outline-secondary float-right" onClick={submit}>Print</button>
              <button type="button" class="btn btn-outline-info float-left" onClick={navigate}>Back</button>
            </div>

            <PDFExport ref={pdfExportComponent} paperSize={size === 1 ? "A4" : "A5"} fileName={`${location.state.name.toUpperCase() + " " + location.state.fname.toUpperCase()}.pdf`}>
              <div class="card" ref={contentArea}>
                <div class="card-body">
                  <div class="card-img-top photooo" >


                    <div class="container-sm">
                      <p class="text-weight-bold text-center text-info"><strong>Cabinet Dr. Zaiter</strong>
                      <p class="text-italic text-center text-secondary"><small>Généraliste</small>
                      <p class="text-weight-light text-center text-muted"><small>MF: 2133214</small></p></p></p>
                      <hr />
                    </div>


                  </div>


                  <br />
                  <h6 class="text-center">TEST RAPIDE ANTI-GENIQUE</h6>
                  <h6 class="text-center">SARS COV-2</h6>   <br />
                  <hr />
                  <p class="card-text">

                    <table class="table delta">
                      <thead>
                        <tr>
                          <th scope="col">CIN</th>
                          <th scope="col">NOM</th>
                          <th scope="col">PRENOM</th>
                          <th scope="col">DATE DE NAISSANCE</th>
                          <th scope="col">TECHNIQUE</th>
                          <th scope="col">RESULTAT</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">{`${location.state.cin.toUpperCase()}`}</th>
                          <td>{`${location.state.name.toUpperCase()}`}</td>
                          <td>{`${location.state.fname.toUpperCase()}`}</td>
                          <td>{`${location.state.bdate.toUpperCase()}`}</td>

                          <td>IMMUNO CHROMATOGRAPHIE BIOSYNEX</td>
                          <th><p class="font-weight-bold">{`${location.state.result.toUpperCase()}`}</p></th>
                        </tr>

                      </tbody>
                    </table>    </p>
                  <div class="d-flex justify-content-around">
                    <div class="p-2">
                      <p class="delta"> {`El ALIA LE: ${moment().format("DD-MM-YYYY hh:mm:ss")}`}</p>
                      <p class="delta">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`SINGNATURE: `}</p></div>
                    <div class="p-2">{`               `}</div>
                    <div class="p-2"><p><QRCode size={80} value={JSON.stringify(text)} /></p></div>
                  </div>


                  <hr />

                </div>
<div class="photoo delta">
<p class="text-center"><small>Avenue Medina Mounaoura,El Alia, 7016, Bizerte, Tunisie</small><p>
  <small>Tél: 72 440 444 _ E-mail: docrzaiter@yahoo.fr</small>
  </p></p>
</div>
              
              </div>

            </PDFExport>

          </div>
          <div class="col-sm-6 px-0 d-none d-sm-block">
            <img src={MyImage1} alt="login image" class="login-img1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gen;
