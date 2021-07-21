import React from "react";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { DateTime } from "luxon";
import L from "leaflet";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "275",
    width: "70vw",
    textAlign: "center"
  },
  
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(90deg)"
  }
}));
const dt = DateTime.now();
var local = DateTime.local();
var rezoned = local.setZone("America/Los_Angeles");
console.log(rezoned)
export default function MyCard({ details }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [countryDetails, setcountryDetails] = useState();
  const [isCardLoading, setisCardLoading] = useState(true);
  const position = [details.location.lat, details.location.lng];

  
  useEffect(() => {
    fetch(`https://restcountries.eu/rest/v2/alpha/${details.location.country}`)
      .then((res) => res.json())
      .then((data) => {
        setcountryDetails(data);
        setisCardLoading(false);
      });
  }, []);

  const markerIcon = new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png",
    iconSize: [22, 41]
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return isCardLoading ? (
    <h2>{details.ip}</h2>
  ) : (
    <div
      style={{ display: "flex", justifyContent: "center", Width: "70vw" }}
    >
      <Card className={classes.root} width="1280px">
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={countryDetails.flag}
            >
              {details.location.country}
            </Avatar>
          }
          title={
             <Typography variant="h5" component="h2"> 
           {details.location.city + ", " + details.location.region}  
             </Typography>
          }
          subheader={
             <Typography className={classes.pos} color="textSecondary">{dt.toLocaleString(DateTime.DATETIME_MED)+ ", " + dt.zoneName }
             <br />
             {rezoned.toLocaleString(DateTime.DATETIME_MED)+ ", " + rezoned.zoneName   }
             </Typography>
          }
            
      

          
        />

        <CardContent>
          {/* className={classes.subheader} */}
          
           <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker icon={markerIcon} position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
          
          
          <Typography variant="body2" color="textSecondary" >
            <h2>Your IP:{details.ip}</h2>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" orientation={'horizontal'} unmountOnExit>
          <CardContent>
            <Typography paragraph><b>Continent:</b> {countryDetails.region}</Typography>
            <Typography paragraph><b>Capital City:</b> {countryDetails.capital}</Typography>
            <Typography paragraph><b>Numeric code:</b> {countryDetails.numericCode}</Typography>
            <Typography paragraph><b>Borders with:</b></Typography>
            {countryDetails.borders.map((item) => <Typography paragraph>{item} </Typography>)}
            <Typography paragraph><b>Spoken languages:</b></Typography>
            {countryDetails.languages.map((item) => <Typography paragraph>{item.name} </Typography>)}    
            <Typography paragraph><b>Time Zones:</b></Typography>
            {countryDetails.timezones.map((item) => <Typography paragraph>{item} </Typography>)}
            <Typography paragraph><b>Currency:</b></Typography>
            {countryDetails.currencies.map((item) => <Typography paragraph>{item.name}</Typography>)}
          </CardContent>
        </Collapse>
      </Card>
     </div>
  );
}
