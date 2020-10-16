import React, {FormEvent} from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet';
import { FiPlus } from "react-icons/fi";  

import '../styles/pages/create-orphanage.css';
import SideBar from "../components/SideBar";
import mapIcon from "../utils/mapIcon";


export default function CreateOrphanage() {

  const [position, setPosition] = React.useState({latitude: 0, longitude: 0});

  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');
  const [opening_hours, setOpeningHours] = React.useState('');
  const [open_on_weekends, setOpenOnWeekends] = React.useState(true);
  const [instructions, setInstructions] = React.useState('');




function handleMapClick(event: LeafletMouseEvent){
    const {lat, lng} =  event.latlng;

  setPosition({latitude: lat, longitude: lng})
}

function handleSelectImages(event: any){

}


function handleSumbmit(event : FormEvent){
  event.preventDefault();
  
  const {latitude, longitude} = position;


}

  return (
    <div id="page-create-orphanage">
      <SideBar/>      

      <main>
        <form className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-18.4136461,-40.2203551]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 && (
                <Marker 
                interactive={false} 
                icon={mapIcon} 
                position={[position.latitude, position.longitude]} />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name}  onChange={event=> setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" maxLength={300} value={about}  onChange={event=> setAbout(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

              </div>
                <input type="file" name="" id="image[]"/>

             
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions}  onChange={event=> setInstructions(event.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours" value={opening_hours}  onChange={event=> setOpeningHours(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className={open_on_weekends ? 'active': ''} onClick={()=>{setOpenOnWeekends(true)}}>Sim</button>
                <button type="button" className={!open_on_weekends ? 'active': ''} onClick={()=>{setOpenOnWeekends(false)}} >Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
