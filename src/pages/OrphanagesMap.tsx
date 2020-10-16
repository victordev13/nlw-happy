import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';
import mapMarkerImg from '../images/map-marker.svg';
import '../styles/pages/orphanages-map.css';

interface Orphanage{
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap(){
    
    const [orphanages, setOrphanages] = React.useState<Orphanage[]>([]);

    useEffect(()=>{
        api.get('orfanatos').then(response => {
            setOrphanages(response.data);
            console.log(response.data);
        })
    }, [])

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Pinheiros</strong>
                    <span>Espírito Santo</span>
                </footer>
            </aside>

            <Map center={[-18.4144052,-40.2247982,]} zoom={15} style={{width: '100%', height: '100%'}}>
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}

                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>

                {orphanages.map(orphanage => {
                    const {latitude, longitude, name, id } = orphanage;
                    
                    return (                    
                        <Marker key={id} position={[latitude, longitude]} 
                        icon={mapIcon}>
        
                            <Popup closeButton={false} minWidth={240} maxWidh={240} className="map-popup">
                                {name}
                                <Link to={`/orfanatos/${id}`}>
                                    <FiArrowRight size={20} color="#fff"/>
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}
            </Map>


            <Link to="/orfanatos/criar" className="create-orphanage">
                <FiPlus size={32} color="#fff"/>
            </Link>
        </div>
    );

}

export default OrphanagesMap;